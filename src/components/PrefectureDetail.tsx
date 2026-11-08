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
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* 상단 헤더 배너 */}
      <div
        className="p-5 border-b border-slate-100"
        style={{
          background: `linear-gradient(135deg, ${region.fillColor}77, #ffffff 85%)`,
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${region.badgeBg} ${region.badgeText}`}>
              제{region.number}지방 · {region.nameKo}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
              {prefecture.type} · {prefecture.island}
            </span>
            {prefecture.powerBadge && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                👑 {prefecture.powerBadge}
              </span>
            )}
            {prefecture.metroBelt && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-white">
                🚄 {prefecture.metroBelt}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white/80 transition"
            title="상세 닫기"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-2.5 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-2">
          {prefecture.nameKo}
          <span className="text-xl font-bold text-slate-400">{prefecture.nameHanja}</span>
        </h2>
        <div className="text-xs text-slate-500 font-medium tracking-wide">{prefecture.romaji}</div>

        <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800">
          <Sparkles size={14} className="text-amber-500 shrink-0" />
          <span>{prefecture.nickname}</span>
        </div>

        {/* 3대 지표 카드 (인구 · 면적 · 인구밀도) */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 bg-white/90 backdrop-blur rounded-xl border border-slate-200 p-2.5 shadow-xs">
          <div>
            <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
              <Users size={11} /> 인구
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900">{formatPop(prefecture.populationMan)}</div>
            <div className="text-[10px] text-slate-500">47개 중 {popRank}위</div>
          </div>
          <div className="border-l border-slate-100 pl-2">
            <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
              <Compass size={11} /> 면적
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900">{formatArea(prefecture.areaKm2)}</div>
            <div className="text-[10px] text-slate-500">47개 중 {areaRank}위</div>
          </div>
          <div className="border-l border-slate-100 pl-2">
            <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
              <MapPin size={11} /> 밀도
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900">{formatDensity(prefecture.densityPerKm2)}</div>
            <div className="text-[10px] text-slate-500">47개 중 {densityRank}위</div>
          </div>
        </div>

        {/* 인구 규모 바 */}
        <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
          className={`mt-3 w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold rounded-xl py-2 transition shadow-xs ${
            inCompare
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : compareFull
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white'
          }`}
        >
          {inCompare ? (
            <>
              <Check size={14} /> 비교함에 담김 (클릭 시 제거)
            </>
          ) : compareFull ? (
            '비교함이 가득 찼습니다 (최대 3개)'
          ) : (
            <>
              <Plus size={14} /> 도도부현 비교함에 담기
            </>
          )}
        </button>
      </div>

      {/* 본문 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-thin">
        {/* 현청소재지 & 주요 도시 */}
        <section>
          <div className="section-title">
            <Landmark size={15} /> 행정 중심 및 주요 도시
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3 text-xs">
            <span className="font-bold text-slate-700">현청소재지: </span>
            <span className="text-slate-900 font-extrabold">{prefecture.capitalKo}</span>
            <span className="text-slate-400 font-medium ml-1">({prefecture.capitalHanja})</span>
            {prefecture.oldProvinces && (
              <div className="mt-1 text-amber-800 font-semibold">
                옛 율령국(令制国): {prefecture.oldProvinces}
              </div>
            )}
          </div>
          <div className="space-y-2">
            {prefecture.majorCities.map((city, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-sm text-slate-900">
                    {city.nameKo} <span className="text-slate-400 text-xs font-medium">{city.nameHanja}</span>
                  </div>
                  {city.status && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                      {city.status}
                    </span>
                  )}
                </div>
                {city.populationText && (
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{city.populationText}</div>
                )}
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">{city.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 역대 권력 중심 & 막부·웅번 기록 */}
        {prefecture.powerCenters.length > 0 && (
          <section>
            <div className="section-title">
              <Crown size={15} /> 역사적 권력 중심 (황도 · 막부 · 웅번)
            </div>
            <div className="space-y-2.5">
              {prefecture.powerCenters.map((pc, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-gradient-to-r from-slate-50 to-white shadow-xs">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryBadge[pc.category] ?? 'bg-slate-800 text-white'}`}>
                      {pc.category}
                    </span>
                    {pc.period && <span className="text-[10px] text-slate-500 font-medium">{pc.period}</span>}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">{pc.title}</div>
                  {pc.oldName && (
                    <div className="text-[11px] text-amber-700 font-semibold mt-0.5">당시 명칭: {pc.oldName}</div>
                  )}
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{pc.note}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 일본 역사에서의 역할 & 주요 연표 */}
        <section>
          <div className="section-title">
            <ScrollText size={15} /> 일본 역사에서의 역할과 발자취
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-200/70">
            {prefecture.historicalRoleSummary}
          </p>
          <ol className="mt-3.5 relative border-l-2 border-slate-200 ml-2 space-y-3.5">
            {prefecture.historicalEvents.map((e, i) => (
              <li key={i} className="ml-4">
                <span
                  className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full border-2 border-white shadow-xs"
                  style={{ background: region.themeColor }}
                />
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{e.era}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{e.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed mt-0.5">{e.detail}</div>
              </li>
            ))}
          </ol>
        </section>

        {/* 주요 역사 인물 */}
        {prefecture.famousPeople.length > 0 && (
          <section>
            <div className="section-title">
              <Award size={15} /> 관련 주요 역사 인물
            </div>
            <div className="space-y-2.5">
              {prefecture.famousPeople.map((person, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-white hover:border-slate-300 transition shadow-xs">
                  <div className="flex items-center justify-between gap-1">
                    <div className="font-bold text-sm text-slate-900">
                      {person.name} <span className="text-xs text-slate-400 font-medium">{person.hanja}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${connColor[person.connectionType] ?? 'bg-slate-100 text-slate-800'}`}>
                      {person.connectionType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {person.era} · {person.role}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{person.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 한국사 연계 기록 및 교류사 */}
        {prefecture.koreanHistory && prefecture.koreanHistory.length > 0 && (
          <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-rose-900 font-black text-sm mb-3">
              <Globe2 size={16} className="text-rose-600" />
              <span>한국사 연계 기록 및 한일 교류사</span>
            </div>
            <div className="space-y-3">
              {prefecture.koreanHistory.map((item, idx) => (
                <div key={idx} className="bg-white border border-rose-100 rounded-xl p-3 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-800">{item.year}</span>
                  </div>
                  {item.tongsinsaStep && (
                    <div className="text-[11px] font-extrabold text-rose-700 mb-1">
                      🚩 조선통신사 제{item.tongsinsaStep}단계 공식 기착지
                    </div>
                  )}
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 산업 및 랜드마크 */}
        <section>
          <div className="section-title">
            <Factory size={15} /> 핵심 산업 및 인프라
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {prefecture.keyIndustries.map((ind, idx) => (
              <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                {ind}
              </span>
            ))}
          </div>

          <div className="section-title mt-4">
            <Landmark size={15} /> 대표 랜드마크 & 명승지
          </div>
          <div className="flex flex-wrap gap-1.5">
            {prefecture.landmarks.map((land, idx) => (
              <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80">
                📍 {land}
              </span>
            ))}
          </div>

          {/* 세계문화유산 */}
          {prefecture.worldHeritage && prefecture.worldHeritage.length > 0 && (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1 mb-1.5">
                🏛️ 유네스코 세계유산 등재
              </div>
              <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                {prefecture.worldHeritage.map((w, idx) => (
                  <li key={idx} className="font-medium">{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 신칸센 노선 */}
          {prefecture.shinkansenLines.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-700 bg-sky-50 border border-sky-200 rounded-xl p-2.5">
              <Train size={15} className="text-sky-700 shrink-0" />
              <div>
                <span className="font-bold text-sky-900">통과 신칸센: </span>
                <span>{prefecture.shinkansenLines.join(', ')}</span>
              </div>
            </div>
          )}
        </section>

        {/* 온천 & 특산품 */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
          <div className="section-title mb-2">
            <Utensils size={15} /> 온천 및 대표 미식·특산물
          </div>
          {prefecture.onsenAndSpecialty.onsen && (
            <div className="text-xs text-slate-800 mb-2">
              <span className="font-bold text-amber-800">♨️ 대표 온천: </span>
              <span className="font-medium">{prefecture.onsenAndSpecialty.onsen}</span>
            </div>
          )}
          <div className="text-xs text-slate-800">
            <div className="font-bold text-slate-700 mb-1">🍱 대표 특산품·향토 미식:</div>
            <div className="flex flex-wrap gap-1.5">
              {prefecture.onsenAndSpecialty.specialties.map((spec, idx) => (
                <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 같은 지방 내 다른 현 바로가기 */}
        {siblings.length > 0 && (
          <section className="pt-2">
            <div className="text-xs font-bold text-slate-500 mb-2">
              {region.nameKo} 지방의 다른 도도부현 ({siblings.length}개)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {siblings.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectPrefecture(s.id)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition shadow-2xs"
                >
                  {s.shortNameKo}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
