import { useMemo, useRef, useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Users,
  Compass,
  MapPin,
  Plus,
  Check,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { JAPAN_PREF_PATHS, OKINAWA_INSET_PATH, projectCoord } from '../data/japanMapPaths';
import { TONGSINSA_ROUTE, SHINKANSEN_ROUTES } from '../data/regionsAndEras';
import {
  ALL_PREFECTURES,
  PREFECTURE_MAP,
  REGION_MAP,
  POPULATION_RANK,
  AREA_RANK,
  DENSITY_RANK,
  DENSE_PREF_IDS,
  LABEL_POS,
  formatPop,
  formatArea,
  formatDensity,
} from '../data/prefecturesData';
import { RegionId, Lens, HistoricalEra } from '../types/atlas';

interface Props {
  selectedPrefId: string | null;
  regionFilter: RegionId | 'all';
  lens: Lens;
  era: HistoricalEra | null;
  inCompare: boolean;
  compareFull: boolean;
  onSelectPrefecture: (id: string) => void;
  onClearSelection: () => void;
  onToggleCompare: () => void;
  onScrollToDetail: () => void;
}

const BASE_VIEW = { x: 40, y: 20, w: 920, h: 695 };

export default function JapanMap({
  selectedPrefId,
  regionFilter,
  lens,
  era,
  inCompare,
  compareFull,
  onSelectPrefecture,
  onClearSelection,
  onToggleCompare,
  onScrollToDetail,
}: Props) {
  const [view, setView] = useState(BASE_VIEW);
  const [hoverPrefId, setHoverPrefId] = useState<string | null>(null);
  const [hudMinimized, setHudMinimized] = useState(false);
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

  const fs = 11.2 / scale;
  const tongsinsaCoords = TONGSINSA_ROUTE.map((r) => projectCoord(r.coord));
  const selectedPref = selectedPrefId ? PREFECTURE_MAP[selectedPrefId] : null;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-sky-50/80 via-slate-50 to-blue-50/90 rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none">
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
          if (st === 'korea') fill = '#FECACA';
          else if (st === 'capital') fill = '#FDE68A';
          else if (st === 'shinkansen') fill = '#BAE6FD';

          return (
            <path
              key={p.id}
              d={path}
              fill={fill}
              fillOpacity={dimmed ? 0.22 : hovered ? 0.96 : lens !== 'none' ? 0.65 : 0.85}
              stroke={active ? '#0F172A' : hovered ? region.strokeColor : '#FFFFFF'}
              strokeWidth={(active ? 2.4 : hovered ? 1.6 : 0.9) / scale}
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
                  <polyline
                    points={pts}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={4.5 / scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={route.color}
                    strokeWidth={2.5 / scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {route.coords.map((c, i) => {
                    const [sx, sy] = projectCoord(c);
                    return (
                      <circle
                        key={i}
                        cx={sx}
                        cy={sy}
                        r={3 / scale}
                        fill="#ffffff"
                        stroke={route.color}
                        strokeWidth={1.5 / scale}
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
                    fontSize={fs * 0.92}
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

          const baseR = (3.2 + Math.sqrt(p.populationMan) / 9.5) / scale;
          const r = selected ? baseR * 1.45 : baseR;
          const isCapital = p.powerBadge === '역대 황도(皇都)' || p.powerBadge === '역대 막부 소재지';

          const showLabel =
            selected ||
            hovered ||
            st === 'capital' ||
            st === 'korea' ||
            st === 'heritage' ||
            !DENSE_PREF_IDS.has(p.id) ||
            scale > 1.45;

          const pos = LABEL_POS[p.id] ?? 'right';
          const off = r + 3.2 / scale;
          const lx = pos === 'left' ? x - off : pos === 'right' ? x + off : x;
          const ly = pos === 'top' ? y - off - 1 / scale : pos === 'bottom' ? y + off + fs * 0.85 : y + fs * 0.35;
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
              {(selected || st === 'capital' || st === 'korea') && (
                <circle cx={x} cy={y} r={r + 5.5 / scale} fill={markerColor} fillOpacity={0.22} className="pulse-ring" />
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

              <circle
                cx={x}
                cy={y}
                r={r}
                fill={p.type === '도(都)' || p.type === '부(府)' ? markerColor : '#ffffff'}
                stroke={markerColor}
                strokeWidth={(selected ? 2.5 : 1.6) / scale}
                filter={selected ? 'url(#pref-glow)' : undefined}
              />

              {isCapital && (
                <text x={x} y={y - r - 2 / scale} fontSize={fs * 1.15} textAnchor="middle" className="pointer-events-none">
                  👑
                </text>
              )}

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
                  strokeWidth={3.2 / scale}
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

      {/* ===================================================================== */}
      {/* 좌상단(동해 빈 여백) 선택 도도부현 핵심 요약 HUD 오버레이 카드 */}
      {/* ===================================================================== */}
      <div className="absolute top-3.5 left-3.5 z-10 w-[320px] sm:w-[390px] max-w-[calc(100%-64px)] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transition-all">
        {selectedPref ? (
          (() => {
            const region = REGION_MAP[selectedPref.regionId];
            const popRank = POPULATION_RANK[selectedPref.id];
            const areaRank = AREA_RANK[selectedPref.id];
            const densityRank = DENSITY_RANK[selectedPref.id];

            return (
              <div>
                {/* HUD 상단 헤더 */}
                <div
                  className="px-4 py-3 border-b border-slate-100"
                  style={{ background: `linear-gradient(135deg, ${region.fillColor}70, #ffffff 85%)` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${region.badgeBg} ${region.badgeText}`}>
                        제{region.number}지방 · {region.nameKo}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        {selectedPref.type}
                      </span>
                      {selectedPref.powerBadge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                          👑 {selectedPref.powerBadge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setHudMinimized((m) => !m)}
                        className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white/80 transition"
                        title={hudMinimized ? '요약 카드 펼치기' : '요약 카드 접기'}
                      >
                        {hudMinimized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      <button
                        onClick={onClearSelection}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white/80 transition"
                        title="선택 해제"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-baseline justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {selectedPref.nameKo}{' '}
                      <span className="text-base font-bold text-slate-400">{selectedPref.nameHanja}</span>
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">{selectedPref.romaji}</span>
                  </div>
                </div>

                {/* HUD 본문 (접혀있지 않을 때 표시) */}
                {!hudMinimized && (
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-1.5 text-sm font-bold text-slate-800 leading-snug">
                      <Sparkles size={15} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{selectedPref.nickname}</span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-600 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200/70 space-y-0.5">
                      <div>
                        <span className="font-bold text-slate-800">현청소재지: </span>
                        <span>{selectedPref.capitalKo} ({selectedPref.capitalHanja})</span>
                      </div>
                      {selectedPref.oldProvinces && (
                        <div className="text-amber-800 font-semibold">
                          <span className="font-bold">옛 율령국: </span>
                          {selectedPref.oldProvinces}
                        </div>
                      )}
                    </div>

                    {/* 3대 지표 요약 */}
                    <div className="grid grid-cols-3 gap-2 bg-white rounded-xl border border-slate-200 p-2.5 text-center">
                      <div>
                        <div className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1">
                          <Users size={12} /> 인구
                        </div>
                        <div className="text-sm font-black text-slate-900 mt-0.5">
                          {formatPop(selectedPref.populationMan)}
                        </div>
                        <div className="text-xs text-slate-500">전국 {popRank}위</div>
                      </div>
                      <div className="border-l border-slate-100">
                        <div className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1">
                          <Compass size={12} /> 면적
                        </div>
                        <div className="text-sm font-black text-slate-900 mt-0.5">
                          {formatArea(selectedPref.areaKm2)}
                        </div>
                        <div className="text-xs text-slate-500">전국 {areaRank}위</div>
                      </div>
                      <div className="border-l border-slate-100">
                        <div className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1">
                          <MapPin size={12} /> 밀도
                        </div>
                        <div className="text-sm font-black text-slate-900 mt-0.5">
                          {formatDensity(selectedPref.densityPerKm2)}
                        </div>
                        <div className="text-xs text-slate-500">전국 {densityRank}위</div>
                      </div>
                    </div>

                    {/* 액션 버튼 2종 */}
                    <div className="flex gap-2 pt-0.5">
                      <button
                        onClick={onScrollToDetail}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold rounded-xl py-2 px-3 bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs"
                      >
                        <span>상세 해설 보기</span>
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={onToggleCompare}
                        disabled={!inCompare && compareFull}
                        className={`flex items-center justify-center gap-1 text-xs sm:text-sm font-bold rounded-xl py-2 px-3 transition border ${
                          inCompare
                            ? 'bg-amber-500 text-white border-amber-500'
                            : compareFull
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                        title="비교함에 담기/제거"
                      >
                        {inCompare ? <Check size={14} /> : <Plus size={14} />}
                        <span>{inCompare ? '비교함 담김' : '비교함'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={13} /> 일본 47개 도도부현 아틀라스
              </span>
              <button
                onClick={() => setHudMinimized((m) => !m)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                {hudMinimized ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
              </button>
            </div>
            {!hudMinimized && (
              <>
                <p className="mt-1.5 text-sm font-bold text-slate-800 leading-snug">
                  지도에서 도도부현을 클릭하면 이곳에 핵심 요약이 즉시 표시됩니다.
                </p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  1都 · 1道 · 2府 · 43県 (총인구 약 1억 2,380만 명). 아래로 스크롤하면 8대 지방 전체 가이드와 테마별 해설을 큰 글씨로 읽을 수 있습니다.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* 상단 중앙 호버 툴팁 (좌상단 HUD와 겹치지 않도록 중앙 상단에 배치) */}
      {hoverPrefId && hoverPrefId !== selectedPrefId && (
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 text-white backdrop-blur-md rounded-xl shadow-lg px-4 py-2.5 text-xs sm:text-sm pointer-events-none hidden md:block">
          {(() => {
            const p = PREFECTURE_MAP[hoverPrefId];
            if (!p) return null;
            const region = REGION_MAP[p.regionId];
            return (
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${region.badgeBg} ${region.badgeText}`}>
                  {region.nameKo}
                </span>
                <div>
                  <span className="font-extrabold text-white">{p.nameKo}</span>{' '}
                  <span className="text-slate-300 text-xs">{p.nameHanja}</span>
                  <span className="mx-2 text-slate-500">|</span>
                  <span className="text-slate-200 text-xs">
                    현청: {p.capitalKo} · 인구 {formatPop(p.populationMan)}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 지도 제어 버튼 (확대 / 축소 / 초기화) */}
      <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 z-10">
        {[
          { icon: ZoomIn, fn: () => zoom(1.4), t: '확대' },
          { icon: ZoomOut, fn: () => zoom(1 / 1.4), t: '축소' },
          { icon: RotateCcw, fn: () => setView(BASE_VIEW), t: '전체 보기' },
        ].map(({ icon: Icon, fn, t }) => (
          <button
            key={t}
            title={t}
            onClick={fn}
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition active:scale-95"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* 오키나와(류큐제도) 확대 인셋 카드 */}
      <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-3 w-[210px] sm:w-[230px] z-10">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-extrabold text-slate-800">오키나와현 (류큐제도)</span>
          <span className="text-xs text-slate-400 font-semibold">확대도</span>
        </div>
        {(() => {
          const okinawa = PREFECTURE_MAP['okinawa'];
          const selected = selectedPrefId === 'okinawa';
          return (
            <button
              onClick={() => onSelectPrefecture('okinawa')}
              className={`w-full rounded-xl border p-2 text-left transition ${
                selected
                  ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-400/30'
                  : 'border-slate-200 hover:border-rose-400 hover:bg-slate-50'
              }`}
            >
              <svg viewBox="10 15 175 105" className="w-full h-20">
                <path d={OKINAWA_INSET_PATH} fill="#FED7AA" stroke="#EA580C" strokeWidth={0.9} />
                <circle cx={154} cy={43} r={selected ? 5.5 : 4} fill="#C2410C" stroke="#ffffff" strokeWidth={1.5} />
              </svg>
              <div className="flex justify-between items-center text-xs text-slate-700 font-semibold mt-1">
                <span>현청: 나하시(那覇市)</span>
                <span>{formatPop(okinawa?.populationMan ?? 147)}</span>
              </div>
            </button>
          );
        })()}
      </div>

      {/* 조작 안내 가이드 */}
      <div className="absolute bottom-3.5 left-3.5 text-xs text-slate-600 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 border border-slate-200/80 shadow-xs pointer-events-none hidden sm:block">
        마우스 휠: 확대/축소 · 드래그: 이동 · 원형 크기: 인구 비례 · 👑: 역대 황도/막부
      </div>
    </div>
  );
}
