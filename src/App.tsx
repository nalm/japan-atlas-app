import { useState, useMemo, useEffect } from 'react';
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
  ChevronRight,
  ExternalLink,
  Map as MapIcon,
  Info,
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
  COMPARE_PRESETS,
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

  // 모바일 탭 상태 ('map' | 'detail')
  const [mobileTab, setMobileTab] = useState<'map' | 'detail'>('map');

  // 도도부현 선택 핸들러
  const handleSelectPrefecture = (id: string) => {
    setSelectedPrefId(id);
    setMobileTab('detail');
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
      setSelectedEra(HISTORICAL_ERAS[4]); // 기본 에도 시대
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* 1. 글로벌 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* 로고 & 타이틀 */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
              🗾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                  일본 인터랙티브 아틀라스
                </h1>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 hidden sm:inline-block">
                  47 도도부현
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                8대 지방 · 율령국(令制国)과 천년 황도 · 조선통신사 사행로 · 3대 메트로폴리스
              </p>
            </div>
          </div>

          {/* 통합 검색바 */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="도도부현, 도시, 율령국(사쓰마·조슈 등), 인물, 특산품 검색..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 transition"
              />
            </div>

            {/* 검색 드롭다운 결과 */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {searchResults.map((p) => {
                  const reg = REGION_MAP[p.regionId];
                  return (
                    <button
                      key={p.id}
                      onMouseDown={() => {
                        handleSelectPrefecture(p.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          {p.nameKo} <span className="text-slate-400 font-normal">{p.nameHanja}</span>
                          {p.powerBadge && <span className="text-[10px]">👑</span>}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {p.capitalKo} · 율령국: {p.oldProvinces} · {p.nickname}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${reg.badgeBg} ${reg.badgeText}`}>
                        {reg.nameKo}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3대 모달 액션 버튼 & 링크 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsHierarchyOpen(true)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <Layers size={14} className="text-indigo-600" />
              <span className="hidden sm:inline">행정 계층 & 율령국</span>
            </button>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <Scale size={14} className="text-amber-600" />
              <span className="hidden sm:inline">비교함</span>
              {compareIds.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-black flex items-center justify-center">
                  {compareIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsStatsOpen(true)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <BarChart3 size={14} className="text-emerald-600" />
              <span className="hidden sm:inline">통계 랭킹</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. 서브 컨트롤 바: 8개 지방 필터 칩 & 5대 렌즈 스위처 */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Row 1: 8대 지방 필터 칩 */}
          <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin pb-0.5">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <MapPin size={12} /> 지방:
            </span>
            <button
              onClick={() => setRegionFilter('all')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition shrink-0 ${
                regionFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition shrink-0 flex items-center gap-1 ${
                    isSelected
                      ? `${r.badgeBg} ${r.badgeText} ring-2 ring-slate-900/20 shadow-2xs`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{r.nameKo}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: 5대 인터랙티브 렌즈 스위처 */}
          <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin pt-0.5">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles size={12} /> 테마 렌즈:
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
                  className={`text-xs font-bold px-3 py-1 rounded-xl border transition shrink-0 flex items-center gap-1.5 ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : `bg-white text-slate-700 hover:bg-slate-100 ${cls}`
                  }`}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3 (조건부): 시대 렌즈 활성화 시 6대 역사 시대 선택 서브바 */}
          {lens === 'era' && (
            <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin pt-1 border-t border-amber-100">
              <span className="text-[11px] font-bold text-amber-800 shrink-0 flex items-center gap-1">
                👑 시대 선택:
              </span>
              {HISTORICAL_ERAS.map((e) => {
                const active = selectedEra?.id === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEra(e)}
                    className={`text-[11px] font-bold px-2.5 py-0.8 rounded-lg transition shrink-0 whitespace-nowrap ${
                      active
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100 border border-amber-200/70'
                    }`}
                  >
                    {e.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 모바일 탭 바 (지도 vs 상세) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-1.5 flex gap-2">
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            mobileTab === 'map' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <MapIcon size={14} /> 지도 보기
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            mobileTab === 'detail' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Info size={14} /> {selectedPref ? `${selectedPref.nameKo} 상세` : '지방 둘러보기'}
        </button>
      </div>

      {/* 3. 메인 콘텐츠: 지도(왼쪽 7-8열) & 상세/오버뷰(오른쪽 4-5열) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col min-h-0">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[580px] lg:min-h-[640px]">
          {/* 왼쪽: SVG 벡터 지도 영역 (7 cols) */}
          <div
            className={`lg:col-span-7 xl:col-span-8 flex flex-col gap-2 min-h-[460px] lg:min-h-full ${
              mobileTab === 'detail' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm">
              <JapanMap
                selectedPrefId={selectedPrefId}
                regionFilter={regionFilter}
                lens={lens}
                era={selectedEra}
                onSelectPrefecture={handleSelectPrefecture}
              />
            </div>

            {/* 지도 하단 빠른 도도부현 선택 퀵바 */}
            <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-1.5 overflow-x-auto scroll-thin shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-1">
                빠른 선택:
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
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'bg-slate-900 text-white font-extrabold'
                        : 'bg-slate-50 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.shortNameKo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 오른쪽: 도도부현 상세 정보 or 오버뷰 패널 (5 cols) */}
          <div
            className={`lg:col-span-5 xl:col-span-4 h-full min-h-[500px] lg:min-h-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${
              mobileTab === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            {selectedPref ? (
              <PrefectureDetail
                prefecture={selectedPref}
                inCompare={compareIds.includes(selectedPref.id)}
                compareFull={compareIds.length >= 3}
                onToggleCompare={() => toggleCompare(selectedPref.id)}
                onSelectPrefecture={handleSelectPrefecture}
                onClose={() => setSelectedPrefId(null)}
              />
            ) : (
              <OverviewPanel
                lens={lens}
                era={selectedEra}
                regionFilter={regionFilter}
                onSelectPrefecture={handleSelectPrefecture}
                onSelectRegion={(r) => setRegionFilter(r)}
                onSelectEra={(e) => {
                  setSelectedEra(e);
                  setLens('era');
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* 4. 모달들 */}
      <HierarchyModal
        isOpen={isHierarchyOpen}
        onClose={() => setIsHierarchyOpen(false)}
        onSelectPrefecture={handleSelectPrefecture}
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
        onSelectPrefecture={handleSelectPrefecture}
        onApplyPreset={(ids) => setCompareIds(ids)}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        onSelectPrefecture={handleSelectPrefecture}
      />

      {/* 푸터 */}
      <footer className="border-t border-slate-200 bg-white py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            일본 8대 지방 · 47개 도도부현 인터랙티브 아틀라스 (Japan Atlas App)
          </div>
          <div className="flex items-center gap-3 text-slate-600 font-semibold">
            <a
              href="https://github.com/nalm/japan-map"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition flex items-center gap-1"
            >
              GitHub nalm/japan-map <ExternalLink size={11} />
            </a>
            <span>·</span>
            <a
              href="https://china.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition flex items-center gap-1"
            >
              중국 아틀라스 (china.nalm.info) <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
