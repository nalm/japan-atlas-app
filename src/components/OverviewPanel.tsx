import {
  Compass,
  MapPin,
  Train,
  Crown,
  Globe2,
  Sparkles,
  TrendingUp,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { RegionId, Lens, HistoricalEra } from '../types/atlas';
import { REGIONS, HISTORICAL_ERAS, TONGSINSA_ROUTE, SHINKANSEN_ROUTES } from '../data/regionsAndEras';
import { ALL_PREFECTURES, PREFECTURE_MAP, formatPop, formatArea } from '../data/prefecturesData';

interface Props {
  lens: Lens;
  era: HistoricalEra | null;
  regionFilter: RegionId | 'all';
  onSelectPrefecture: (id: string) => void;
  onSelectRegion: (id: RegionId | 'all') => void;
  onSelectEra: (era: HistoricalEra) => void;
}

export default function OverviewPanel({
  lens,
  era,
  regionFilter,
  onSelectPrefecture,
  onSelectRegion,
  onSelectEra,
}: Props) {
  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto p-5 space-y-6 scroll-thin">
      {/* 상단 소개 배너 */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} /> 일본 8대 지방 · 47개 도도부현
        </div>
        <h2 className="mt-1.5 text-2xl font-black tracking-tight">
          인터랙티브 역사 · 지리 아틀라스
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          <span className="font-extrabold text-white">1都(도쿄) · 1道(홋카이도) · 2府(교토·오사카) · 43県</span>의 
          지리적 실체, 옛 율령국(令制国)과 천년 황도·막부 역사, 조선통신사 사행로와 한일 교류사, 
          그리고 3대 메트로폴리스 산업 벨트를 탐색하세요.
        </p>

        {/* 종합 지표 칩 */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-700/80 pt-3 text-center">
          <div>
            <div className="text-[10px] text-slate-400">광역자치단체</div>
            <div className="text-sm font-black text-white">47개 도도부현</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">총 인구</div>
            <div className="text-sm font-black text-emerald-400">약 1억 2,380만</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">국토 면적</div>
            <div className="text-sm font-black text-sky-400">377,975 km²</div>
          </div>
        </div>
      </div>

      {/* 렌즈 모드별 맞춤 가이드 패널 */}
      {lens === 'korea' && (
        <section className="bg-rose-50 border border-rose-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-900 font-black text-sm mb-2">
            <Globe2 size={17} className="text-rose-600" />
            <span>조선통신사 사행로 (10단계 기착지) & 한일 교류사</span>
          </div>
          <p className="text-xs text-rose-800 leading-relaxed mb-3">
            조선 후기(1607~1811년) 12회에 걸쳐 왕복 약 3,000km를 항해했던 평화사절단의 실제 이동 경로입니다. 
            부산 왜관을 출발하여 쓰시마·세토내해를 거쳐 쇼군의 에도성까지 10대 핵심 기착지를 지도 위에 붉은 점선으로 연결했습니다.
          </p>

          <div className="space-y-2">
            {TONGSINSA_ROUTE.map((step) => {
              const pref = step.prefId ? PREFECTURE_MAP[step.prefId] : null;
              return (
                <div
                  key={step.step}
                  onClick={() => step.prefId && onSelectPrefecture(step.prefId)}
                  className={`flex items-start gap-2.5 p-2 rounded-xl border bg-white text-xs transition ${
                    step.prefId
                      ? 'border-rose-200 hover:border-rose-400 hover:shadow-xs cursor-pointer'
                      : 'border-slate-200'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                    {step.step}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{step.name}</span>
                      {pref && (
                        <span className="text-[10px] text-rose-700 font-semibold underline">
                          {pref.nameKo}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{step.periodOrRole}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {lens === 'shinkansen' && (
        <section className="bg-sky-50 border border-sky-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-sky-950 font-black text-sm mb-2">
            <Train size={17} className="text-sky-700" />
            <span>5대 신칸센 간선축 & 3대 대도시권(태평양 벨트)</span>
          </div>
          <p className="text-xs text-sky-900 leading-relaxed mb-3">
            1964년 도쿄 올림픽에 맞춰 개통된 세계 최초의 고속철도 도카이도 신칸센을 시작으로, 
            일본 인구와 산업의 70%가 집중된 태평양 벨트(도쿄·나고야·오사카·후쿠오카)를 연결하는 대동맥입니다.
          </p>

          <div className="space-y-2.5">
            {SHINKANSEN_ROUTES.map((line) => (
              <div key={line.id} className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: line.color }}
                    />
                    <span className="font-extrabold text-xs text-slate-900">{line.name}</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">{line.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {lens === 'era' && (
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm mb-2">
            <Crown size={17} className="text-amber-700" />
            <span>시대별 권력 이동 타임라인 (황도 · 막부 · 웅번)</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed mb-3">
            일본의 통치 중심은 고대 아스카·나라(헤이조쿄) → 헤이안(교토 황도) → 가마쿠라 막부 → 무로마치(교토) → 
            센고쿠 통일(아즈치·오사카) → 에도 막부(도쿄) → 메이지 유신으로 이어지며 동일본과 서일본 사이를 오갔습니다.
          </p>

          <div className="space-y-2.5">
            {HISTORICAL_ERAS.map((e) => {
              const isActive = era?.id === e.id;
              return (
                <div
                  key={e.id}
                  onClick={() => onSelectEra(e)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                      : 'bg-white border-amber-200/70 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-slate-900">{e.name}</span>
                    <span className="text-[10px] font-semibold text-amber-800">{e.period}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 leading-snug">{e.description}</div>
                  <div className="mt-2 text-[10px] text-amber-900 font-semibold">{e.highlightNote}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {e.primaryPrefIds.map((pid) => {
                      const pref = PREFECTURE_MAP[pid];
                      if (!pref) return null;
                      return (
                        <button
                          key={pid}
                          onClick={(ev) => {
                            ev.stopPropagation();
                            onSelectPrefecture(pid);
                          }}
                          className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-white shadow-2xs hover:bg-amber-600 transition"
                        >
                          👑 {pref.shortNameKo}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {lens === 'heritage' && (
        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-sm mb-2">
            <Sparkles size={17} className="text-emerald-700" />
            <span>유네스코 세계유산 & 대표 온천·미식 탐방</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed mb-3">
            고도 교토·나라의 사찰부터 히메지성, 닛코 도쇼구, 원폭 돔, 시라카와고, 야쿠시마, 시레토코 등 
            일본이 자랑하는 세계문화·자연유산 및 유서 깊은 온천지를 둘러보세요.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ALL_PREFECTURES.filter((p) => p.worldHeritage && p.worldHeritage.length > 0).map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPrefecture(p.id)}
                className="text-left p-2.5 bg-white border border-emerald-200 rounded-xl hover:border-emerald-400 hover:shadow-xs transition"
              >
                <div className="font-extrabold text-slate-900">{p.nameKo}</div>
                <div className="text-[10px] text-emerald-700 font-medium line-clamp-1 mt-0.5">
                  {p.worldHeritage![0]}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 8대 지방(Region) 둘러보기 그리드 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="section-title mb-0">
            <Compass size={16} /> 일본 8대 지방 (지방별 탐색)
          </div>
          {regionFilter !== 'all' && (
            <button
              onClick={() => onSelectRegion('all')}
              className="text-xs font-bold text-sky-600 hover:underline"
            >
              전체 보기
            </button>
          )}
        </div>

        <div className="space-y-3">
          {REGIONS.map((r) => {
            const isSelected = regionFilter === r.id;
            const prefs = ALL_PREFECTURES.filter((p) => p.regionId === r.id);
            const totalPop = prefs.reduce((sum, p) => sum + p.populationMan, 0);

            return (
              <div
                key={r.id}
                className={`border rounded-2xl p-3.5 transition ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/90 ring-1 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${r.badgeBg} ${r.badgeText}`}>
                        제{r.number}지방
                      </span>
                      <span className="font-black text-sm sm:text-base text-slate-900">
                        {r.nameKo} <span className="text-slate-400 text-xs font-semibold">{r.nameHanja}</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {r.islandSummary} · 인구 합계 {formatPop(totalPop)} ({prefs.length}개 도도부현)
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectRegion(isSelected ? 'all' : r.id)}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition shrink-0"
                  >
                    {isSelected ? '선택 해제' : '지방 집중'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
                  {r.description}
                </p>

                {/* 해당 지방 내 도도부현 칩 */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {prefs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectPrefecture(p.id)}
                      className="text-xs font-semibold px-2 py-0.8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition flex items-center gap-1"
                    >
                      <span>{p.shortNameKo}</span>
                      {p.powerBadge && <span className="text-[9px]">👑</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 최상위·최하위 지리 통계 상식 */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
        <div className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
          <TrendingUp size={15} /> 일본 도도부현 지리 주요 지표
        </div>
        <div>
          • <span className="font-semibold text-slate-800">인구 1위:</span> 도쿄도(1,409만) vs{' '}
          <span className="font-semibold text-slate-800">최하위:</span> 돗토리현(54만) — 약 26배 차이
        </div>
        <div>
          • <span className="font-semibold text-slate-800">면적 1위:</span> 홋카이도(83,424 km²) vs{' '}
          <span className="font-semibold text-slate-800">최하위:</span> 가가와현(1,877 km²) — 약 44배 차이
        </div>
        <div>
          • <span className="font-semibold text-slate-800">행정 계층:</span> 1도(都) · 1도(道) · 2부(府) · 43현(県) 아래 20개 정령지정도시와 62개 중핵시 운영
        </div>
      </section>
    </div>
  );
}
