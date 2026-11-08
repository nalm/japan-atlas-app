import {
  Crown,
  Users,
  Landmark,
  Factory,
  ScrollText,
  Plus,
  Check,
  MapPin,
  Sparkles,
  X,
  Compass,
  Train,
  Utensils,
  Award,
  Globe2,
  ArrowUp,
} from 'lucide-react';
import { PrefectureInfo } from '../types/atlas';
import {
  REGION_MAP,
  POPULATION_RANK,
  AREA_RANK,
  DENSITY_RANK,
  ALL_PREFECTURES,
  formatPop,
  formatArea,
  formatDensity,
} from '../data/prefecturesData';

interface Props {
  prefecture: PrefectureInfo;
  inCompare: boolean;
  compareFull: boolean;
  onToggleCompare: () => void;
  onSelectPrefecture: (id: string) => void;
  onClose: () => void;
  onScrollToMap?: () => void;
}

const connColor: Record<string, string> = {
  출생: 'bg-sky-100 text-sky-800 border-sky-200',
  '거병·번주': 'bg-amber-100 text-amber-800 border-amber-200',
  '활동·통치': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  '유배·순국·개항': 'bg-rose-100 text-rose-800 border-rose-200',
};

const categoryBadge: Record<string, string> = {
  '황도·수도': 'bg-amber-500 text-white',
  '막부(무가정권)': 'bg-slate-900 text-white',
  '센고쿠·유력 번(藩)': 'bg-purple-600 text-white',
  '개항·근대화 거점': 'bg-blue-600 text-white',
  '메이지 유신 4대 웅번': 'bg-rose-600 text-white',
};

export default function PrefectureDetail({
  prefecture,
  inCompare,
  compareFull,
  onToggleCompare,
  onSelectPrefecture,
  onClose,
  onScrollToMap,
}: Props) {
  const region = REGION_MAP[prefecture.regionId];
  const popRank = POPULATION_RANK[prefecture.id];
  const areaRank = AREA_RANK[prefecture.id];
  const densityRank = DENSITY_RANK[prefecture.id];
  const maxPop = Math.max(...ALL_PREFECTURES.map((p) => p.populationMan));

  // 같은 지방 내 다른 도도부현
  const siblings = ALL_PREFECTURES.filter(
    (p) => p.regionId === prefecture.regionId && p.id !== prefecture.id
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* =================================================================== */}
      {/* 1. 상단 와이드 헤더 배너 */}
      {/* =================================================================== */}
      <div
        className="p-6 sm:p-8 border-b border-slate-200"
        style={{
          background: `linear-gradient(135deg, ${region.fillColor}70, #ffffff 80%)`,
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* 좌측: 타이틀 & 지리·문화 총평 */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${region.badgeBg} ${region.badgeText}`}>
                제{region.number}지방 · {region.nameKo} ({region.nameHanja})
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                {prefecture.type} · {prefecture.island}
              </span>
              {prefecture.powerBadge && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-2xs">
                  👑 {prefecture.powerBadge}
                </span>
              )}
              {prefecture.metroBelt && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-white">
                  🚄 {prefecture.metroBelt}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {prefecture.nameKo}
              </h2>
              <span className="text-2xl font-bold text-slate-400">{prefecture.nameHanja}</span>
              <span className="text-sm text-slate-500 font-medium">{prefecture.romaji}</span>
            </div>

            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800">
              <Sparkles size={18} className="text-amber-500 shrink-0" />
              <span>{prefecture.nickname}</span>
            </div>

            {/* 지역 특성 요약 */}
            <p className="text-sm leading-relaxed text-slate-700 bg-white/90 backdrop-blur rounded-xl p-4 border border-slate-200/80 shadow-2xs">
              {prefecture.characteristicsSummary}
            </p>
          </div>

          {/* 우측: 3대 핵심 지표 카드 & 비교함 컨트롤 */}
          <div className="lg:w-[420px] shrink-0 space-y-3">
            <div className="flex items-center justify-end gap-2">
              {onScrollToMap && (
                <button
                  onClick={onScrollToMap}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition flex items-center gap-1"
                >
                  <ArrowUp size={14} /> 지도로 올라가기
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1"
                title="전체 지방 가이드로 전환"
              >
                <X size={14} /> 선택 해제
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-white/95 backdrop-blur rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div>
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Users size={13} /> 인구
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {formatPop(prefecture.populationMan)}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">47개 중 {popRank}위</div>
              </div>
              <div className="border-l border-slate-100 pl-3">
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Compass size={13} /> 면적
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {formatArea(prefecture.areaKm2)}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">47개 중 {areaRank}위</div>
              </div>
              <div className="border-l border-slate-100 pl-3">
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin size={13} /> 밀도
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {formatDensity(prefecture.densityPerKm2)}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">47개 중 {densityRank}위</div>
              </div>
            </div>

            {/* 인구 비례 게이지 바 */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.max(4, (prefecture.populationMan / maxPop) * 100)}%`,
                  background: region.themeColor,
                }}
              />
            </div>

            {/* 비교함 담기 버튼 */}
            <button
              onClick={onToggleCompare}
              disabled={!inCompare && compareFull}
              className={`w-full flex items-center justify-center gap-2 text-sm font-bold rounded-xl py-2.5 transition shadow-xs ${
                inCompare
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : compareFull
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {inCompare ? (
                <>
                  <Check size={16} /> 비교함에 담김 (클릭 시 제거)
                </>
              ) : compareFull ? (
                '비교함이 가득 찼습니다 (최대 3개)'
              ) : (
                <>
                  <Plus size={16} /> 도도부현 비교함에 담기
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. 본문 3단 와이드 대시보드 그리드 */}
      {/* =================================================================== */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ----------------------------------------------------------------- */}
        {/* [1열: 좌측 4칼럼] 행정 중심·주요 도시 & 역사적 권력 중심 */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-8">
          {/* 현청소재지 & 주요 도시 */}
          <section>
            <h3 className="section-title">
              <Landmark size={18} className="text-slate-700" /> 행정 중심 및 주요 도시
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-4 text-sm space-y-1">
              <div>
                <span className="font-bold text-slate-700">현청소재지: </span>
                <span className="text-slate-900 font-extrabold">{prefecture.capitalKo}</span>
                <span className="text-slate-500 font-medium ml-1">({prefecture.capitalHanja})</span>
              </div>
              {prefecture.oldProvinces && (
                <div className="text-amber-800 font-semibold">
                  <span className="font-bold">옛 율령국(令制国): </span>
                  {prefecture.oldProvinces}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {prefecture.majorCities.map((city, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-base text-slate-900">
                      {city.nameKo}{' '}
                      <span className="text-slate-400 text-sm font-medium">{city.nameHanja}</span>
                    </div>
                    {city.status && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                        {city.status}
                      </span>
                    )}
                  </div>
                  {city.populationText && (
                    <div className="text-xs text-slate-500 font-semibold mt-1">{city.populationText}</div>
                  )}
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{city.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 역대 권력 중심 & 막부·웅번 기록 */}
          {prefecture.powerCenters.length > 0 && (
            <section>
              <h3 className="section-title">
                <Crown size={18} className="text-amber-600" /> 역사적 권력 중심 (황도 · 막부 · 웅번)
              </h3>
              <div className="space-y-3">
                {prefecture.powerCenters.map((pc, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 bg-gradient-to-r from-slate-50 to-white shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          categoryBadge[pc.category] ?? 'bg-slate-800 text-white'
                        }`}
                      >
                        {pc.category}
                      </span>
                      {pc.period && <span className="text-xs text-slate-500 font-semibold">{pc.period}</span>}
                    </div>
                    <div className="font-extrabold text-base text-slate-900">{pc.title}</div>
                    {pc.oldName && (
                      <div className="text-xs text-amber-700 font-semibold mt-1">당시 명칭: {pc.oldName}</div>
                    )}
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{pc.note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* [2열: 중앙 4칼럼] 일본 역사에서의 역할 & 시대별 연표 */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-8">
          <section>
            <h3 className="section-title">
              <ScrollText size={18} className="text-indigo-600" /> 일본 역사에서의 역할과 발자취
            </h3>
            <div className="text-sm leading-relaxed text-slate-700 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              {prefecture.historicalRoleSummary}
            </div>

            <ol className="mt-5 relative border-l-2 border-slate-200 ml-2.5 space-y-5">
              {prefecture.historicalEvents.map((e, i) => (
                <li key={i} className="ml-5">
                  <span
                    className="absolute -left-[7px] mt-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                    style={{ background: region.themeColor }}
                  />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{e.era}</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{e.title}</div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">{e.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* [3열: 우측 4칼럼] 주요 역사 인물 · 한국사 연계 · 산업·랜드마크·온천 */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 space-y-8">
          {/* 주요 역사 인물 */}
          {prefecture.famousPeople.length > 0 && (
            <section>
              <h3 className="section-title">
                <Award size={18} className="text-amber-600" /> 관련 주요 역사 인물
              </h3>
              <div className="space-y-3">
                {prefecture.famousPeople.map((person, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-base text-slate-900">
                        {person.name}{' '}
                        <span className="text-sm text-slate-400 font-medium">{person.hanja}</span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                          connColor[person.connectionType] ?? 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {person.connectionType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mt-1">
                      {person.era} · {person.role}
                    </div>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{person.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 한국사 연계 기록 및 교류사 */}
          {prefecture.koreanHistory && prefecture.koreanHistory.length > 0 && (
            <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base mb-3.5">
                <Globe2 size={18} className="text-rose-600" />
                <span>한국사 연계 기록 및 한일 교류사</span>
              </div>
              <div className="space-y-3.5">
                {prefecture.koreanHistory.map((item, idx) => (
                  <div key={idx} className="bg-white border border-rose-100 rounded-xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white">
                        {item.category}
                      </span>
                      <span className="text-xs font-semibold text-rose-800">{item.year}</span>
                    </div>
                    {item.tongsinsaStep && (
                      <div className="text-xs font-extrabold text-rose-700 mb-1">
                        🚩 조선통신사 제{item.tongsinsaStep}단계 공식 기착지
                      </div>
                    )}
                    <div className="font-bold text-base text-slate-900">{item.title}</div>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 핵심 산업 & 대표 랜드마크 */}
          <section className="space-y-5">
            <div>
              <h3 className="section-title">
                <Factory size={18} className="text-slate-700" /> 핵심 산업 및 인프라
              </h3>
              <div className="flex flex-wrap gap-2">
                {prefecture.keyIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="section-title">
                <Landmark size={18} className="text-amber-600" /> 대표 랜드마크 & 명승지
              </h3>
              <div className="flex flex-wrap gap-2">
                {prefecture.landmarks.map((land, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80"
                  >
                    📍 {land}
                  </span>
                ))}
              </div>
            </div>

            {/* 세계문화유산 */}
            {prefecture.worldHeritage && prefecture.worldHeritage.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="text-sm font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                  🏛️ 유네스코 세계유산 등재
                </div>
                <ul className="text-sm text-emerald-800 space-y-1.5 list-disc list-inside">
                  {prefecture.worldHeritage.map((w, idx) => (
                    <li key={idx} className="font-medium leading-snug">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 신칸센 노선 */}
            {prefecture.shinkansenLines.length > 0 && (
              <div className="flex items-center gap-2.5 text-sm text-slate-700 bg-sky-50 border border-sky-200 rounded-xl p-3.5">
                <Train size={18} className="text-sky-700 shrink-0" />
                <div>
                  <span className="font-bold text-sky-900">통과 신칸센: </span>
                  <span className="font-medium">{prefecture.shinkansenLines.join(', ')}</span>
                </div>
              </div>
            )}
          </section>

          {/* 온천 & 특산품 */}
          <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
            <h3 className="section-title mb-3">
              <Utensils size={18} className="text-amber-700" /> 온천 및 대표 미식·특산물
            </h3>
            {prefecture.onsenAndSpecialty.onsen && (
              <div className="text-sm text-slate-800 mb-3">
                <span className="font-bold text-amber-800">♨️ 대표 온천: </span>
                <span className="font-medium">{prefecture.onsenAndSpecialty.onsen}</span>
              </div>
            )}
            <div className="text-sm text-slate-800">
              <div className="font-bold text-slate-700 mb-2">🍱 대표 특산품·향토 미식:</div>
              <div className="flex flex-wrap gap-2">
                {prefecture.onsenAndSpecialty.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-medium px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. 하단 같은 지방 내 다른 도도부현 바로가기 바 */}
      {/* =================================================================== */}
      {siblings.length > 0 && (
        <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold text-slate-600 mr-1">
              {region.nameKo} 지방의 다른 도도부현 ({siblings.length}개):
            </span>
            {siblings.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectPrefecture(s.id)}
                className="text-sm font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shadow-2xs"
              >
                {s.nameKo}
              </button>
            ))}
          </div>

          {onScrollToMap && (
            <button
              onClick={onScrollToMap}
              className="text-sm font-bold px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition flex items-center gap-1.5 shrink-0"
            >
              <ArrowUp size={15} /> 지도로 올라가기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
