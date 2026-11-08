import { useState, useMemo, useRef } from 'react';
import {
  Search,
  Layers,
  Scale,
  BarChart3,
  MapPin,
  Sparkles,
  Train,
  Crown,
  Globe2,
  Utensils,
  ExternalLink,
  Map as MapIcon,
  Compass,
} from 'lucide-react';
import JapanMap from './components/JapanMap';
import PrefectureDetail from './components/PrefectureDetail';
import OverviewPanel from './components/OverviewPanel';
import HierarchyModal from './components/HierarchyModal';
import CompareModal from './components/CompareModal';
import StatsModal from './components/StatsModal';
import {
  ALL_PREFECTURES,
  PREFECTURE_MAP,
  REGION_MAP,
} from './data/prefecturesData';
import { REGIONS, HISTORICAL_ERAS } from './data/regionsAndEras';
import { RegionId, Lens, HistoricalEra } from './types/atlas';

export default function App() {
  const [selectedPrefId, setSelectedPrefId] = useState<string | null>('tokyo');
  const [regionFilter, setRegionFilter] = useState<RegionId | 'all'>('all');
  const [lens, setLens] = useState<Lens>('none');
  const [selectedEra, setSelectedEra] = useState<HistoricalEra | null>(HISTORICAL_ERAS[4]); // 기본 에도 시대
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>(['tokyo', 'osaka', 'aichi']);

  // 모달 제어 상태
  const [isHierarchyOpen, setIsHierarchyOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const mapSectionRef = useRef<HTMLDivElement>(null);
  const detailSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDetail = () => {
    detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 도도부현 선택 핸들러
  const handleSelectPrefecture = (id: string) => {
    setSelectedPrefId(id);
  };

  // 검색 결과
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_PREFECTURES.filter((p) => {
      return (
        p.nameKo.toLowerCase().includes(q) ||
        p.shortNameKo.toLowerCase().includes(q) ||
        p.nameHanja.includes(q) ||
        p.romaji.toLowerCase().includes(q) ||
        p.capitalKo.toLowerCase().includes(q) ||
        p.oldProvinces.includes(q) ||
        p.majorCities.some((c) => c.nameKo.includes(q) || c.nameHanja.includes(q)) ||
        p.famousPeople.some((fp) => fp.name.includes(q) || fp.hanja.includes(q)) ||
        p.landmarks.some((l) => l.includes(q)) ||
        p.onsenAndSpecialty.specialties.some((s) => s.includes(q))
      );
    }).slice(0, 8);
  }, [searchQuery]);

  // 비교함 토글
  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedPref = selectedPrefId ? PREFECTURE_MAP[selectedPrefId] : null;

  // 렌즈 변경 시
  const handleLensChange = (nextLens: Lens) => {
    setLens(nextLens);
    if (nextLens === 'era' && !selectedEra) {
      setSelectedEra(HISTORICAL_ERAS[4]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans">
      {/* =================================================================== */}
      {/* 1. 글로벌 헤더 네비게이션 */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* 로고 & 타이틀 */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center font-black text-xl shadow-sm">
              🗾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                  일본 인터랙티브 아틀라스
                </h1>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 hidden sm:inline-block">
                  47 도도부현
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                8대 지방 · 율령국(令制国)과 천년 황도 · 조선통신사 사행로 · 3대 메트로폴리스
              </p>
            </div>
          </div>

          {/* 통합 검색바 */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="도도부현, 도시, 율령국(사쓰마·조슈 등), 인물, 특산품 검색..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 transition"
              />
            </div>

            {/* 검색 드롭다운 결과 */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {searchResults.map((p) => {
                  const reg = REGION_MAP[p.regionId];
                  return (
                    <button
                      key={p.id}
                      onMouseDown={() => {
                        handleSelectPrefecture(p.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          {p.nameKo} <span className="text-slate-400 font-normal text-xs">{p.nameHanja}</span>
                          {p.powerBadge && <span className="text-xs">👑</span>}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {p.capitalKo} · 율령국: {p.oldProvinces} · {p.nickname}
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${reg.badgeBg} ${reg.badgeText}`}>
                        {reg.nameKo}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3대 모달 액션 버튼 */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsHierarchyOpen(true)}
              className="text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <Layers size={15} className="text-indigo-600" />
              <span className="hidden sm:inline">행정 계층 & 율령국</span>
            </button>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <Scale size={15} className="text-amber-600" />
              <span className="hidden sm:inline">비교함</span>
              {compareIds.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                  {compareIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsStatsOpen(true)}
              className="text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <BarChart3 size={15} className="text-emerald-600" />
              <span className="hidden sm:inline">통계 랭킹</span>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. 서브 컨트롤 바: 8개 지방 필터 칩 & 5대 렌즈 스위처 */}
      {/* =================================================================== */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-[1440px] mx-auto space-y-2.5">
          {/* Row 1: 8대 지방 필터 칩 */}
          <div className="flex items-center gap-2 overflow-x-auto scroll-thin pb-0.5">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <MapPin size={14} /> 지방 필터:
            </span>
            <button
              onClick={() => setRegionFilter('all')}
              className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition shrink-0 ${
                regionFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              전체 (47)
            </button>
            {REGIONS.map((r) => {
              const count = ALL_PREFECTURES.filter((p) => p.regionId === r.id).length;
              const isSelected = regionFilter === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRegionFilter(r.id)}
                  className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition shrink-0 flex items-center gap-1 ${
                    isSelected
                      ? `${r.badgeBg} ${r.badgeText} ring-2 ring-slate-900/20 shadow-2xs`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{r.nameKo}</span>
                  <span className="text-xs opacity-65">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: 5대 인터랙티브 렌즈 스위처 */}
          <div className="flex items-center gap-2 overflow-x-auto scroll-thin pt-0.5">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles size={14} /> 테마 렌즈:
            </span>

            {[
              { id: 'none', label: '기본 지도', icon: MapIcon, cls: 'border-slate-300' },
              { id: 'era', label: '시대별 권력·타임라인', icon: Crown, cls: 'text-amber-800 bg-amber-50 border-amber-300' },
              { id: 'korea', label: '조선통신사 & 한국사 교류', icon: Globe2, cls: 'text-rose-800 bg-rose-50 border-rose-300' },
              { id: 'shinkansen', label: '신칸센 & 대도시권 벨트', icon: Train, cls: 'text-sky-800 bg-sky-50 border-sky-300' },
              { id: 'heritage', label: '세계유산 & 온천·특산품', icon: Utensils, cls: 'text-emerald-800 bg-emerald-50 border-emerald-300' },
            ].map(({ id, label, icon: Icon, cls }) => {
              const active = lens === id;
              return (
                <button
                  key={id}
                  onClick={() => handleLensChange(id as Lens)}
                  className={`text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl border transition shrink-0 flex items-center gap-1.5 ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : `bg-white text-slate-700 hover:bg-slate-100 ${cls}`
                  }`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3 (조건부): 시대 렌즈 활성화 시 6대 역사 시대 선택 서브바 */}
          {lens === 'era' && (
            <div className="flex items-center gap-2 overflow-x-auto scroll-thin pt-2 border-t border-amber-100">
              <span className="text-xs font-bold text-amber-800 shrink-0 flex items-center gap-1">
                👑 시대 선택:
              </span>
              {HISTORICAL_ERAS.map((e) => {
                const active = selectedEra?.id === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEra(e)}
                    className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-xl transition shrink-0 whitespace-nowrap ${
                      active
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100 border border-amber-200/70'
                    }`}
                  >
                    {e.name} ({e.period})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. 메인 콘텐츠: 상하 와이드 분할 (상단 100% 대지도 + 하단 3단 와이드 대시보드) */}
      {/* =================================================================== */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* [상단] 100% 전체 폭 와이드 지도 영역 */}
        <div ref={mapSectionRef} className="space-y-3 scroll-mt-24">
          <div className="w-full h-[520px] sm:h-[600px] lg:h-[660px] rounded-2xl overflow-hidden shadow-sm">
            <JapanMap
              selectedPrefId={selectedPrefId}
              regionFilter={regionFilter}
              lens={lens}
              era={selectedEra}
              inCompare={selectedPrefId ? compareIds.includes(selectedPrefId) : false}
              compareFull={compareIds.length >= 3}
              onSelectPrefecture={handleSelectPrefecture}
              onClearSelection={() => setSelectedPrefId(null)}
              onToggleCompare={() => selectedPrefId && toggleCompare(selectedPrefId)}
              onScrollToDetail={scrollToDetail}
            />
          </div>

          {/* 지도 직하단: 빠른 도도부현 선택 바 & 전체 가이드 토글 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin flex-1">
              <span className="text-xs font-extrabold text-slate-500 shrink-0 mr-1">
                빠른 도도부현 선택:
              </span>
              {(regionFilter === 'all'
                ? ALL_PREFECTURES
                : ALL_PREFECTURES.filter((p) => p.regionId === regionFilter)
              ).map((p) => {
                const isSelected = selectedPrefId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPrefecture(p.id)}
                    className={`text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-lg transition shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'bg-slate-900 text-white font-extrabold shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.shortNameKo}
                  </button>
                );
              })}
            </div>

            {selectedPref && (
              <button
                onClick={() => setSelectedPrefId(null)}
                className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 transition shrink-0 flex items-center gap-1.5"
              >
                <Compass size={14} /> 8대 지방 전체 가이드 보기
              </button>
            )}
          </div>
        </div>

        {/* [하단] 전체 폭 상세 대시보드 & 8대 지방·렌즈 오버뷰 */}
        <div ref={detailSectionRef} className="space-y-8 scroll-mt-20">
          {selectedPref ? (
            <>
              <PrefectureDetail
                prefecture={selectedPref}
                inCompare={compareIds.includes(selectedPref.id)}
                compareFull={compareIds.length >= 3}
                onToggleCompare={() => toggleCompare(selectedPref.id)}
                onSelectPrefecture={(id) => {
                  handleSelectPrefecture(id);
                  scrollToDetail();
                }}
                onClose={() => setSelectedPrefId(null)}
                onScrollToMap={scrollToMap}
              />

              {/* 렌즈가 켜져 있거나 지방 전체 둘러보기가 필요할 때 함께 보여주는 하단 종합 가이드 */}
              <OverviewPanel
                lens={lens}
                era={selectedEra}
                regionFilter={regionFilter}
                onSelectPrefecture={(id) => {
                  handleSelectPrefecture(id);
                  scrollToDetail();
                }}
                onSelectRegion={(r) => {
                  setRegionFilter(r);
                  scrollToMap();
                }}
                onSelectEra={(e) => {
                  setSelectedEra(e);
                  setLens('era');
                  scrollToMap();
                }}
              />
            </>
          ) : (
            <OverviewPanel
              lens={lens}
              era={selectedEra}
              regionFilter={regionFilter}
              onSelectPrefecture={(id) => {
                handleSelectPrefecture(id);
                scrollToDetail();
              }}
              onSelectRegion={(r) => {
                setRegionFilter(r);
                scrollToMap();
              }}
              onSelectEra={(e) => {
                setSelectedEra(e);
                setLens('era');
                scrollToMap();
              }}
            />
          )}
        </div>
      </main>

      {/* =================================================================== */}
      {/* 4. 심층 모달 다이얼로그 3종 */}
      {/* =================================================================== */}
      <HierarchyModal
        isOpen={isHierarchyOpen}
        onClose={() => setIsHierarchyOpen(false)}
        onSelectPrefecture={(id) => {
          handleSelectPrefecture(id);
          scrollToDetail();
        }}
      />

      <CompareModal
        isOpen={isCompareOpen}
        selectedIds={compareIds}
        onClose={() => setIsCompareOpen(false)}
        onRemoveId={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        onAddId={(id) => {
          if (compareIds.length < 3 && !compareIds.includes(id)) {
            setCompareIds((prev) => [...prev, id]);
          }
        }}
        onClearAll={() => setCompareIds([])}
        onSelectPrefecture={(id) => {
          handleSelectPrefecture(id);
          scrollToDetail();
        }}
        onApplyPreset={(ids) => setCompareIds(ids)}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        onSelectPrefecture={(id) => {
          handleSelectPrefecture(id);
          scrollToDetail();
        }}
      />

      {/* 푸터 */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-sm text-slate-500 mt-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-medium">
            일본 8대 지방 · 47개 도도부현 인터랙티브 아틀라스 (Japan Atlas App)
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <a
              href="https://github.com/nalm/japan-atlas-app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition flex items-center gap-1"
            >
              GitHub nalm/japan-atlas-app <ExternalLink size={13} />
            </a>
            <span>·</span>
            <a
              href="https://china.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition flex items-center gap-1"
            >
              중국 아틀라스 (china.nalm.info) <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
