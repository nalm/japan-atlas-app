import { useMemo, useRef, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { JAPAN_PREF_PATHS, OKINAWA_INSET_PATH, projectCoord } from '../data/japanMapPaths';
import { REGIONS, TONGSINSA_ROUTE, SHINKANSEN_ROUTES } from '../data/regionsAndEras';
import {
  ALL_PREFECTURES,
  PREFECTURE_MAP,
  REGION_MAP,
  DENSE_PREF_IDS,
  LABEL_POS,
  formatPop,
} from '../data/prefecturesData';
import { RegionId, Lens, HistoricalEra } from '../types/atlas';

interface Props {
  selectedPrefId: string | null;
  regionFilter: RegionId | 'all';
  lens: Lens;
  era: HistoricalEra | null;
  onSelectPrefecture: (id: string) => void;
}

const BASE_VIEW = { x: 30, y: 20, w: 940, h: 710 };

export default function JapanMap({
  selectedPrefId,
  regionFilter,
  lens,
  era,
  onSelectPrefecture,
}: Props) {
  const [view, setView] = useState(BASE_VIEW);
  const [hoverPrefId, setHoverPrefId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null);

  const scale = BASE_VIEW.w / view.w;

  // 지리구(Region) 필터 변경 시 해당 영역으로 카메라 포커스
  useEffect(() => {
    if (regionFilter === 'all') {
      setView(BASE_VIEW);
      return;
    }
    const targetPrefs = ALL_PREFECTURES.filter((p) => p.regionId === regionFilter);
    if (!targetPrefs.length) return;

    const pts = targetPrefs.map((p) => projectCoord(p.coord));
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const pad = 65;
    let x0 = Math.min(...xs) - pad;
    let x1 = Math.max(...xs) + pad;
    let y0 = Math.min(...ys) - pad;
    let y1 = Math.max(...ys) + pad;
    let w = x1 - x0;
    let h = y1 - y0;

    const ratio = BASE_VIEW.w / BASE_VIEW.h;
    if (w / h > ratio) {
      const nh = w / ratio;
      y0 -= (nh - h) / 2;
      h = nh;
    } else {
      const nw = h * ratio;
      x0 -= (nw - w) / 2;
      w = nw;
    }
    setView({ x: x0, y: y0, w, h });
  }, [regionFilter]);

  const zoom = (factor: number) => {
    setView((v) => {
      const nw = Math.min(BASE_VIEW.w * 1.2, Math.max(BASE_VIEW.w / 8.5, v.w / factor));
      const nh = nw * (BASE_VIEW.h / BASE_VIEW.w);
      const cx = v.x + v.w / 2;
      const cy = v.y + v.h / 2;
      return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const k = view.w / rect.width;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
    if (drag.current.moved) {
      const d = drag.current;
      setView((v) => ({ ...v, x: d.vx - dx * k, y: d.vy - dy * k }));
    }
  };

  const endDrag = () => {
    setTimeout(() => {
      if (drag.current) drag.current = null;
    }, 0);
  };

  const clickGuard = (fn: () => void) => () => {
    if (!drag.current?.moved) fn();
  };

  // 렌즈별 강조 대상
  const eraPrimarySet = useMemo(
    () => new Set(lens === 'era' && era ? era.primaryPrefIds : []),
    [lens, era]
  );
  const eraHubSet = useMemo(
    () => new Set(lens === 'era' && era ? era.majorHubPrefIds : []),
    [lens, era]
  );
  const shinkansenPrefSet = useMemo(
    () => new Set(ALL_PREFECTURES.filter((p) => p.shinkansenLines.length > 0).map((p) => p.id)),
    []
  );

  const getPrefState = (p: (typeof ALL_PREFECTURES)[0]) => {
    if (regionFilter !== 'all' && p.regionId !== regionFilter) return 'dim';
    if (lens === 'korea') {
      return p.koreanHistory && p.koreanHistory.length > 0 ? 'korea' : 'dim';
    }
    if (lens === 'shinkansen') {
      return p.shinkansenLines.length > 0 ? 'shinkansen' : 'dim';
    }
    if (lens === 'heritage') {
      return p.worldHeritage && p.worldHeritage.length > 0 ? 'heritage' : 'dim';
    }
    if (lens === 'era' && era) {
      if (eraPrimarySet.has(p.id)) return 'capital';
      if (eraHubSet.has(p.id)) return 'hub';
      return 'dim';
    }
    return 'normal';
  };

  const fs = 10.5 / scale;
  const tongsinsaCoords = TONGSINSA_ROUTE.map((r) => projectCoord(r.coord));

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-sky-50/70 via-slate-50 to-blue-50/80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none">
      <svg
        ref={svgRef}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className="w-full h-full select-none cursor-grab active:cursor-grabbing touch-none"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <defs>
          <filter id="pref-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 바다 그리드 장식선 */}
        <g stroke="#E2E8F0" strokeWidth={0.6 / scale} strokeDasharray={`${3 / scale} ${6 / scale}`} opacity={0.65}>
          <line x1={0} y1={250} x2={1000} y2={250} />
          <line x1={0} y1={450} x2={1000} y2={450} />
          <line x1={300} y1={0} x2={300} y2={750} />
          <line x1={600} y1={0} x2={600} y2={750} />
        </g>

        {/* 47개 도도부현 폴리곤 */}
        {ALL_PREFECTURES.map((p) => {
          const region = REGION_MAP[p.regionId];
          const path = JAPAN_PREF_PATHS[p.id];
          if (!path) return null;
          const active = selectedPrefId === p.id;
          const hovered = hoverPrefId === p.id;
          const st = getPrefState(p);
          const dimmed = st === 'dim';

          let fill = active ? region.activeFillColor : region.fillColor;
          if (st === 'korea') fill = '#FECACA'; // 로즈
          else if (st === 'capital') fill = '#FDE68A'; // 앰버
          else if (st === 'shinkansen') fill = '#BAE6FD'; // 블루

          return (
            <path
              key={p.id}
              d={path}
              fill={fill}
              fillOpacity={dimmed ? 0.22 : hovered ? 0.95 : lens !== 'none' ? 0.6 : 0.82}
              stroke={active ? '#0F172A' : hovered ? region.strokeColor : '#FFFFFF'}
              strokeWidth={(active ? 2.2 : hovered ? 1.5 : 0.85) / scale}
              strokeLinejoin="round"
              className="transition-[fill-opacity,stroke] duration-150 cursor-pointer"
              onMouseEnter={() => setHoverPrefId(p.id)}
              onMouseLeave={() => setHoverPrefId(null)}
              onClick={clickGuard(() => onSelectPrefecture(p.id))}
            />
          );
        })}

        {/* 신칸센 노선 오버레이 (신칸센 렌즈 활성화 시) */}
        {lens === 'shinkansen' && (
          <g className="shinkansen-routes-layer pointer-events-none">
            {SHINKANSEN_ROUTES.map((route) => {
              const pts = route.coords.map((c) => projectCoord(c)).map((p) => p.join(',')).join(' ');
              return (
                <g key={route.id}>
                  {/* 외곽 발광선 */}
                  <polyline
                    points={pts}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={4.5 / scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />
                  {/* 본선 */}
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={route.color}
                    strokeWidth={2.4 / scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 주요 정차역 마커 */}
                  {route.coords.map((c, i) => {
                    const [sx, sy] = projectCoord(c);
                    return (
                      <circle
                        key={i}
                        cx={sx}
                        cy={sy}
                        r={2.8 / scale}
                        fill="#ffffff"
                        stroke={route.color}
                        strokeWidth={1.4 / scale}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>
        )}

        {/* 조선통신사 경로 오버레이 (한국사 렌즈 활성화 시) */}
        {lens === 'korea' && (
          <g className="tongsinsa-layer pointer-events-none">
            <polyline
              points={tongsinsaCoords.map((p) => p.join(',')).join(' ')}
              fill="none"
              stroke="#DC2626"
              strokeWidth={2.8 / scale}
              strokeDasharray={`${7 / scale} ${5 / scale}`}
              strokeLinecap="round"
              className="kpg-route"
            />
            {TONGSINSA_ROUTE.map((r, i) => {
              const [x, y] = tongsinsaCoords[i];
              return (
                <g key={r.step}>
                  <circle cx={x} cy={y} r={8.5 / scale} fill="#DC2626" stroke="#ffffff" strokeWidth={1.6 / scale} />
                  <text
                    x={x}
                    y={y + 3.4 / scale}
                    fontSize={9.2 / scale}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontWeight={800}
                  >
                    {r.step}
                  </text>
                  <text
                    x={x + 11 / scale}
                    y={y + 3.2 / scale}
                    fontSize={fs * 0.9}
                    textAnchor="start"
                    fill="#991B1B"
                    fontWeight={700}
                    style={{ paintOrder: 'stroke' }}
                    stroke="#ffffff"
                    strokeWidth={3 / scale}
                  >
                    {r.name}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* 도도부현 대표 마커 & 라벨 */}
        {ALL_PREFECTURES.map((p) => {
          const [x, y] = projectCoord(p.coord);
          const st = getPrefState(p);
          const region = REGION_MAP[p.regionId];
          const selected = selectedPrefId === p.id;
          const hovered = hoverPrefId === p.id;

          const baseR = (3 + Math.sqrt(p.populationMan) / 10) / scale;
          const r = selected ? baseR * 1.4 : baseR;
          const isCapital = p.powerBadge === '역대 황도(皇都)' || p.powerBadge === '역대 막부 소재지';

          const showLabel =
            selected ||
            hovered ||
            st === 'capital' ||
            st === 'korea' ||
            st === 'heritage' ||
            !DENSE_PREF_IDS.has(p.id) ||
            scale > 1.65;

          const pos = LABEL_POS[p.id] ?? 'right';
          const off = r + 3 / scale;
          const lx = pos === 'left' ? x - off : pos === 'right' ? x + off : x;
          const ly = pos === 'top' ? y - off - 1 / scale : pos === 'bottom' ? y + off + fs * 0.8 : y + fs * 0.35;
          const anchor = pos === 'left' ? 'end' : pos === 'right' ? 'start' : 'middle';

          let markerColor = region.strokeColor;
          if (st === 'korea') markerColor = '#DC2626';
          else if (st === 'capital') markerColor = '#B45309';
          else if (st === 'heritage') markerColor = '#059669';

          return (
            <g
              key={p.id}
              className="cursor-pointer"
              opacity={st === 'dim' ? 0.28 : 1}
              onMouseEnter={() => setHoverPrefId(p.id)}
              onMouseLeave={() => setHoverPrefId(null)}
              onClick={clickGuard(() => onSelectPrefecture(p.id))}
            >
              {/* 강조 펄스 링 */}
              {(selected || st === 'capital' || st === 'korea') && (
                <circle cx={x} cy={y} r={r + 5.5 / scale} fill={markerColor} fillOpacity={0.2} className="pulse-ring" />
              )}
              {st === 'hub' && (
                <circle
                  cx={x}
                  cy={y}
                  r={r + 3.5 / scale}
                  fill="none"
                  stroke="#B45309"
                  strokeWidth={1.3 / scale}
                  strokeDasharray={`${2.5 / scale} ${2.5 / scale}`}
                />
              )}

              {/* 중심 원형 마커 */}
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={p.type === '도(都)' || p.type === '부(府)' ? markerColor : '#ffffff'}
                stroke={markerColor}
                strokeWidth={(selected ? 2.5 : 1.6) / scale}
                filter={selected ? 'url(#pref-glow)' : undefined}
              />

              {/* 황도·막부 왕관 아이콘 */}
              {isCapital && (
                <text x={x} y={y - r - 2 / scale} fontSize={fs * 1.15} textAnchor="middle" className="pointer-events-none">
                  👑
                </text>
              )}

              {/* 도도부현 라벨 */}
              {showLabel && (
                <text
                  x={lx}
                  y={isCapital && pos === 'top' ? ly - fs * 0.8 : ly}
                  fontSize={selected ? fs * 1.25 : fs}
                  textAnchor={anchor}
                  fontWeight={selected || isCapital ? 800 : 600}
                  fill={selected ? '#0F172A' : '#1E293B'}
                  style={{ paintOrder: 'stroke' }}
                  stroke="#ffffff"
                  strokeWidth={3 / scale}
                  strokeLinejoin="round"
                  className="pointer-events-none"
                >
                  {p.shortNameKo}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* 호버 툴팁 */}
      {hoverPrefId && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 px-3.5 py-2 text-xs pointer-events-none animate-in fade-in duration-100">
          {(() => {
            const p = PREFECTURE_MAP[hoverPrefId];
            if (!p) return null;
            const region = REGION_MAP[p.regionId];
            return (
              <>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${region.badgeBg} ${region.badgeText}`}>
                    {region.nameKo}
                  </span>
                  <div className="font-bold text-sm text-slate-900">
                    {p.nameKo} <span className="text-slate-400 font-medium">{p.nameHanja}</span>
                  </div>
                </div>
                <div className="text-slate-600 mt-0.5">
                  현청: {p.capitalKo} · 인구 {formatPop(p.populationMan)} ({p.type})
                </div>
                <div className="text-slate-500 italic text-[11px] mt-0.5">{p.nickname}</div>
                {p.oldProvinces && (
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">율령국: {p.oldProvinces}</div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* 지도 제어 버튼 (확대 / 축소 / 초기화) */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        {[
          { icon: ZoomIn, fn: () => zoom(1.4), t: '확대' },
          { icon: ZoomOut, fn: () => zoom(1 / 1.4), t: '축소' },
          { icon: RotateCcw, fn: () => setView(BASE_VIEW), t: '전체 보기' },
        ].map(({ icon: Icon, fn, t }) => (
          <button
            key={t}
            title={t}
            onClick={fn}
            className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition active:scale-95"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* 오키나와(류큐제도) 확대 인셋 카드 */}
      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 p-2.5 max-w-[210px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-slate-700">오키나와현 (류큐제도)</span>
          <span className="text-[10px] text-slate-400 font-medium">확대도</span>
        </div>
        {(() => {
          const okinawa = PREFECTURE_MAP['okinawa'];
          const selected = selectedPrefId === 'okinawa';
          return (
            <button
              onClick={() => onSelectPrefecture('okinawa')}
              className={`w-full rounded-lg border p-1.5 text-left transition ${
                selected
                  ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-400/30'
                  : 'border-slate-200 hover:border-rose-400 hover:bg-slate-50'
              }`}
            >
              <svg viewBox="10 15 175 105" className="w-full h-18">
                <path d={OKINAWA_INSET_PATH} fill="#FED7AA" stroke="#EA580C" strokeWidth={0.9} />
                <circle cx={154} cy={43} r={selected ? 5.5 : 4} fill="#C2410C" stroke="#ffffff" strokeWidth={1.5} />
              </svg>
              <div className="flex justify-between items-center text-[10px] text-slate-600 font-semibold mt-1">
                <span>나하시 (那覇市)</span>
                <span>{formatPop(okinawa?.populationMan ?? 147)}</span>
              </div>
            </button>
          );
        })()}
      </div>

      {/* 조작 안내 가이드 */}
      <div className="absolute bottom-3 left-3 text-[10px] text-slate-500 bg-white/85 backdrop-blur rounded-md px-2.5 py-1 border border-slate-200/60 shadow-sm pointer-events-none hidden sm:block">
        휠: 확대/축소 · 드래그: 지도 이동 · 원형 크기: 인구 비례 · 👑: 황도/막부
      </div>
    </div>
  );
}
