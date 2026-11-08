import { useState, useMemo } from 'react';
import { X, BarChart3, ArrowUpDown, Search, Filter } from 'lucide-react';
import { ALL_PREFECTURES, REGION_MAP, formatPop, formatArea, formatDensity } from '../data/prefecturesData';
import { REGIONS } from '../data/regionsAndEras';
import { RegionId, PrefType } from '../types/atlas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrefecture: (id: string) => void;
}

type SortField = 'pop' | 'area' | 'density' | 'code';
type SortOrder = 'asc' | 'desc';

export default function StatsModal({ isOpen, onClose, onSelectPrefecture }: Props) {
  const [sortField, setSortField] = useState<SortField>('pop');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PrefType | 'all'>('all');
  const [regionFilter, setRegionFilter] = useState<RegionId | 'all'>('all');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return ALL_PREFECTURES.filter((p) => {
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (regionFilter !== 'all' && p.regionId !== regionFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName =
          p.nameKo.toLowerCase().includes(q) ||
          p.shortNameKo.toLowerCase().includes(q) ||
          p.nameHanja.includes(q) ||
          p.capitalKo.toLowerCase().includes(q) ||
          p.oldProvinces.includes(q);
        if (!matchName) return false;
      }
      return true;
    }).sort((a, b) => {
      let diff = 0;
      if (sortField === 'pop') diff = b.populationMan - a.populationMan;
      else if (sortField === 'area') diff = b.areaKm2 - a.areaKm2;
      else if (sortField === 'density') diff = b.densityPerKm2 - a.densityPerKm2;
      else if (sortField === 'code') diff = a.code - b.code;

      return sortOrder === 'asc' ? -diff : diff;
    });
  }, [sortField, sortOrder, searchQuery, typeFilter, regionFilter]);

  const totalPop = useMemo(() => ALL_PREFECTURES.reduce((s, p) => s + p.populationMan, 0), []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                일본 8대 지방 및 47개 도도부현 통계 랭킹
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                인구, 면적, 밀도 순위 정렬 및 지방별 통계 데이터 비교
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* 8대 지방 통계 서머리 카드 */}
        <div className="bg-slate-100/70 p-4 border-b border-slate-200 overflow-x-auto scroll-thin">
          <div className="flex items-center gap-3 min-w-max">
            {REGIONS.map((r) => {
              const prefs = ALL_PREFECTURES.filter((p) => p.regionId === r.id);
              const rPop = prefs.reduce((sum, p) => sum + p.populationMan, 0);
              const rShare = ((rPop / totalPop) * 100).toFixed(1);
              const isSelected = regionFilter === r.id;

              return (
                <button
                  key={r.id}
                  onClick={() => setRegionFilter(isSelected ? 'all' : r.id)}
                  className={`text-left p-3 rounded-xl border transition shadow-2xs ${
                    isSelected
                      ? 'bg-white border-slate-900 ring-2 ring-slate-900/20'
                      : 'bg-white/85 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${r.badgeBg} ${r.badgeText}`}>
                      {r.nameKo}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{prefs.length}개현</span>
                  </div>
                  <div className="font-black text-sm text-slate-900">{formatPop(rPop)}</div>
                  <div className="text-xs text-slate-500 font-medium">전국 점유율 {rShare}%</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 검색 및 필터 툴바 */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="도도부현, 현청, 율령국 검색..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
              <Filter size={13} /> 구분:
            </span>
            {(['all', '도(都)', '도(道)', '부(府)', '현(県)'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  typeFilter === t
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t === 'all' ? '전체' : t}
              </button>
            ))}
          </div>
        </div>

        {/* 통계 테이블 본문 */}
        <div className="flex-1 overflow-y-auto p-5 scroll-thin">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 select-none">
                <tr>
                  <th className="p-3.5 w-12 text-center">#</th>
                  <th className="p-3.5">도도부현</th>
                  <th className="p-3.5">지방</th>
                  <th className="p-3.5">현청소재지</th>
                  <th
                    className="p-3.5 cursor-pointer hover:bg-slate-200/60 transition"
                    onClick={() => toggleSort('pop')}
                  >
                    <div className="flex items-center gap-1">
                      인구 {sortField === 'pop' && <ArrowUpDown size={14} />}
                    </div>
                  </th>
                  <th
                    className="p-3.5 cursor-pointer hover:bg-slate-200/60 transition"
                    onClick={() => toggleSort('area')}
                  >
                    <div className="flex items-center gap-1">
                      면적 {sortField === 'area' && <ArrowUpDown size={14} />}
                    </div>
                  </th>
                  <th
                    className="p-3.5 cursor-pointer hover:bg-slate-200/60 transition"
                    onClick={() => toggleSort('density')}
                  >
                    <div className="flex items-center gap-1">
                      인구밀도 {sortField === 'density' && <ArrowUpDown size={14} />}
                    </div>
                  </th>
                  <th className="p-3.5">옛 율령국 / 권력 지위</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSorted.map((p, idx) => {
                  const reg = REGION_MAP[p.regionId];
                  return (
                    <tr
                      key={p.id}
                      onClick={() => {
                        onSelectPrefecture(p.id);
                        onClose();
                      }}
                      className="hover:bg-slate-50 transition cursor-pointer"
                    >
                      <td className="p-3.5 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          {p.nameKo}
                          <span className="text-xs font-medium text-slate-400">{p.nameHanja}</span>
                          {p.powerBadge && <span className="text-xs">👑</span>}
                        </div>
                        <div className="text-xs text-slate-500">{p.type}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${reg.badgeBg} ${reg.badgeText}`}>
                          {reg.nameKo}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap font-medium text-slate-700">{p.capitalKo}</td>
                      <td className="p-3.5 whitespace-nowrap font-black text-slate-900">
                        {formatPop(p.populationMan)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap font-semibold text-slate-700">
                        {formatArea(p.areaKm2)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap font-semibold text-slate-700">
                        {formatDensity(p.densityPerKm2)}
                      </td>
                      <td className="p-3.5 text-xs sm:text-sm text-slate-600 leading-snug">
                        {p.powerBadge ? (
                          <span className="font-bold text-amber-800 mr-1.5">[{p.powerBadge}]</span>
                        ) : null}
                        <span>{p.oldProvinces}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
