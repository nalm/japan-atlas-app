import {
  Compass,
  Train,
  Crown,
  Globe2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { RegionId, Lens, HistoricalEra } from '../types/atlas';
import { REGIONS, HISTORICAL_ERAS, TONGSINSA_ROUTE, SHINKANSEN_ROUTES } from '../data/regionsAndEras';
import { ALL_PREFECTURES, PREFECTURE_MAP, formatPop } from '../data/prefecturesData';

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
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
      {/* 상단 소개 배너 */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles size={16} /> 일본 8대 지방 · 47개 도도부현 종합 가이드
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            인터랙티브 역사 · 지리 아틀라스
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            <span className="font-extrabold text-white">1都(도쿄) · 1道(홋카이도) · 2府(교토·오사카) · 43県</span>의 
            지리적 실체, 옛 율령국(令制国)과 천년 황도·막부 역사, 조선통신사 사행로와 한일 교류사, 
            그리고 3대 메트로폴리스 산업 벨트를 한눈에 탐색하세요.
          </p>
        </div>

        {/* 종합 지표 칩 */}
        <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur rounded-2xl p-4 text-center shrink-0 border border-white/10">
          <div className="px-2">
            <div className="text-xs text-slate-300 font-medium">광역자치단체</div>
            <div className="text-base sm:text-lg font-black text-white mt-0.5">47개 도도부현</div>
          </div>
          <div className="px-2 border-l border-white/15">
            <div className="text-xs text-slate-300 font-medium">총 인구</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">약 1억 2,380만</div>
          </div>
          <div className="px-2 border-l border-white/15">
            <div className="text-xs text-slate-300 font-medium">국토 면적</div>
            <div className="text-base sm:text-lg font-black text-sky-400 mt-0.5">377,975 km²</div>
          </div>
        </div>
      </div>

      {/* 렌즈 모드별 맞춤 와이드 가이드 패널 */}
      {lens === 'korea' && (
        <section className="bg-rose-50/80 border border-rose-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-900 font-black text-lg mb-2">
            <Globe2 size={20} className="text-rose-600" />
            <span>조선통신사 사행로 (10단계 기착지) & 한일 교류사</span>
          </div>
          <p className="text-sm text-rose-800 leading-relaxed mb-5 max-w-4xl">
            조선 후기(1607~1811년) 12회에 걸쳐 왕복 약 3,000km를 항해했던 평화사절단의 실제 이동 경로입니다. 
            부산 왜관을 출발하여 쓰시마·세토내해를 거쳐 쇼군의 에도성까지 10대 핵심 기착지를 지도 위에 붉은 점선으로 연결했습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {TONGSINSA_ROUTE.map((step) => {
              const pref = step.prefId ? PREFECTURE_MAP[step.prefId] : null;
              return (
                <div
                  key={step.step}
                  onClick={() => step.prefId && onSelectPrefecture(step.prefId)}
                  className={`flex flex-col justify-between p-4 rounded-xl border bg-white transition ${
                    step.prefId
                      ? 'border-rose-200 hover:border-rose-400 hover:shadow-sm cursor-pointer'
                      : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center shrink-0 text-xs">
                        {step.step}
                      </span>
                      {pref && (
                        <span className="text-xs text-rose-700 font-bold underline">
                          {pref.nameKo}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-base text-slate-900">{step.name}</div>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{step.periodOrRole}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {lens === 'shinkansen' && (
        <section className="bg-sky-50/80 border border-sky-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-sky-950 font-black text-lg mb-2">
            <Train size={20} className="text-sky-700" />
            <span>5대 신칸센 간선축 & 3대 대도시권(태평양 벨트)</span>
          </div>
          <p className="text-sm text-sky-900 leading-relaxed mb-5 max-w-4xl">
            1964년 도쿄 올림픽에 맞춰 개통된 세계 최초의 고속철도 도카이도 신칸센을 시작으로, 
            일본 인구와 산업의 70%가 집중된 태평양 벨트(도쿄·나고야·오사카·후쿠오카)를 연결하는 대동맥입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHINKANSEN_ROUTES.map((line) => (
              <div key={line.id} className="p-5 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ background: line.color }}
                  />
                  <span className="font-extrabold text-base text-slate-900">{line.name}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{line.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {lens === 'era' && (
        <section className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-950 font-black text-lg mb-2">
            <Crown size={20} className="text-amber-700" />
            <span>시대별 권력 이동 타임라인 (황도 · 막부 · 웅번)</span>
          </div>
          <p className="text-sm text-amber-900 leading-relaxed mb-5 max-w-4xl">
            일본의 통치 중심은 고대 아스카·나라(헤이조쿄) → 헤이안(교토 황도) → 가마쿠라 막부 → 무로마치(교토) → 
            센고쿠 통일(아즈치·오사카) → 에도 막부(도쿄) → 메이지 유신으로 이어지며 동일본과 서일본 사이를 오갔습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HISTORICAL_ERAS.map((e) => {
              const isActive = era?.id === e.id;
              return (
                <div
                  key={e.id}
                  onClick={() => onSelectEra(e)}
                  className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                      : 'bg-white border-amber-200/70 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-extrabold text-base text-slate-900">{e.name}</span>
                      <span className="text-xs font-bold text-amber-800">{e.period}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{e.description}</p>
                    <div className="mt-2.5 text-xs text-amber-900 font-semibold leading-relaxed">
                      💡 {e.highlightNote}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200/50 flex flex-wrap gap-1.5">
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
                          className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-500 text-white shadow-2xs hover:bg-amber-600 transition"
                        >
                          👑 {pref.nameKo}
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
        <section className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-lg mb-2">
            <Sparkles size={20} className="text-emerald-700" />
            <span>유네스코 세계유산 & 대표 온천·미식 탐방</span>
          </div>
          <p className="text-sm text-emerald-900 leading-relaxed mb-5 max-w-4xl">
            고도 교토·나라의 사찰부터 히메지성, 닛코 도쇼구, 원폭 돔, 시라카와고, 야쿠시마, 시레토코 등 
            일본이 자랑하는 세계문화·자연유산 및 유서 깊은 온천지를 둘러보세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {ALL_PREFECTURES.filter((p) => p.worldHeritage && p.worldHeritage.length > 0).map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPrefecture(p.id)}
                className="text-left p-4 bg-white border border-emerald-200 rounded-xl hover:border-emerald-400 hover:shadow-xs transition"
              >
                <div className="font-extrabold text-base text-slate-900">{p.nameKo}</div>
                <div className="text-sm text-emerald-800 font-medium mt-1 leading-snug">
                  🏛️ {p.worldHeritage![0]}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 8대 지방(Region) 둘러보기 와이드 2열 그리드 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0 text-lg">
            <Compass size={20} className="text-slate-700" /> 일본 8대 지방 (지방별 심층 탐색)
          </h3>
          {regionFilter !== 'all' && (
            <button
              onClick={() => onSelectRegion('all')}
              className="text-sm font-bold text-sky-600 hover:underline"
            >
              전체 지방 보기
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REGIONS.map((r) => {
            const isSelected = regionFilter === r.id;
            const prefs = ALL_PREFECTURES.filter((p) => p.regionId === r.id);
            const totalPop = prefs.reduce((sum, p) => sum + p.populationMan, 0);

            return (
              <div
                key={r.id}
                className={`border rounded-2xl p-5 transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/90 ring-2 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${r.badgeBg} ${r.badgeText}`}>
                          제{r.number}지방
                        </span>
                        <span className="font-black text-lg text-slate-900">
                          {r.nameKo} <span className="text-slate-400 text-sm font-semibold">{r.nameHanja}</span>
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        {r.islandSummary} · 인구 합계 {formatPop(totalPop)} ({prefs.length}개 도도부현)
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectRegion(isSelected ? 'all' : r.id)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition shrink-0"
                    >
                      {isSelected ? '선택 해제' : '지도 포커스'}
                    </button>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed mt-3">
                    {r.description}
                  </p>
                </div>

                {/* 해당 지방 내 도도부현 칩 */}
                <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                  {prefs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectPrefecture(p.id)}
                      className="text-sm font-semibold px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition flex items-center gap-1"
                    >
                      <span>{p.shortNameKo}</span>
                      {p.powerBadge && <span className="text-xs">👑</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 최상위·최하위 지리 통계 상식 */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm text-slate-700 space-y-2">
        <div className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-600" /> 일본 도도부현 핵심 지리 상식
        </div>
        <div>
          • <span className="font-bold text-slate-900">인구 1위:</span> 도쿄도(1,409만 명) vs{' '}
          <span className="font-bold text-slate-900">최하위:</span> 돗토리현(54만 명) — 약 26배 격차
        </div>
        <div>
          • <span className="font-bold text-slate-900">면적 1위:</span> 홋카이도(83,424 km²) vs{' '}
          <span className="font-bold text-slate-900">최하위:</span> 가가와현(1,877 km²) — 약 44배 격차
        </div>
        <div>
          • <span className="font-bold text-slate-900">광역·특례 행정:</span> 1도(都) · 1도(道) · 2부(府) · 43현(県) 산하에 20개 정령지정도시와 62개 중핵시, 도쿄 23개 특별구 운영
        </div>
      </section>
    </div>
  );
}
