import { X, Trash2, Plus, Sparkles, Scale, ExternalLink } from 'lucide-react';
import {
  ALL_PREFECTURES,
  PREFECTURE_MAP,
  REGION_MAP,
  POPULATION_RANK,
  AREA_RANK,
  DENSITY_RANK,
  COMPARE_PRESETS,
  formatPop,
  formatArea,
  formatDensity,
} from '../data/prefecturesData';

interface Props {
  isOpen: boolean;
  selectedIds: string[];
  onClose: () => void;
  onRemoveId: (id: string) => void;
  onAddId: (id: string) => void;
  onClearAll: () => void;
  onSelectPrefecture: (id: string) => void;
  onApplyPreset: (ids: string[]) => void;
}

export default function CompareModal({
  isOpen,
  selectedIds,
  onClose,
  onRemoveId,
  onAddId,
  onClearAll,
  onSelectPrefecture,
  onApplyPreset,
}: Props) {
  if (!isOpen) return null;

  const comparePrefs = selectedIds.map((id) => PREFECTURE_MAP[id]).filter(Boolean);
  const unselectedPrefs = ALL_PREFECTURES.filter((p) => !selectedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Scale size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                도도부현 1:1:1 지표 비교함
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                최대 3개 자치단체의 지리, 인구, 역사적 권력, 한국사 연계, 주요 산업 비교
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs sm:text-sm font-semibold px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition flex items-center gap-1"
              >
                <Trash2 size={14} /> 전체 비우기
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 큐레이션 프리셋 바 */}
        <div className="bg-slate-100/80 px-6 py-3 border-b border-slate-200 flex items-center gap-2.5 overflow-x-auto scroll-thin">
          <span className="text-xs font-bold text-slate-600 shrink-0 flex items-center gap-1">
            <Sparkles size={14} className="text-amber-500" /> 추천 프리셋:
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {COMPARE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onApplyPreset(preset.prefIds)}
                title={preset.description}
                className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition shadow-2xs whitespace-nowrap"
              >
                {preset.title.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 본문 비교 테이블 영역 */}
        <div className="flex-1 overflow-y-auto p-6 scroll-thin">
          {comparePrefs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Scale size={44} className="mx-auto mb-3 opacity-40" />
              <p className="text-base font-bold text-slate-700">비교함이 비어 있습니다.</p>
              <p className="text-sm text-slate-500 mt-1">
                상단의 추천 프리셋을 누르거나 아래 셀렉터에서 도도부현을 추가하세요.
              </p>
              {unselectedPrefs.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <select
                    onChange={(e) => {
                      if (e.target.value) onAddId(e.target.value);
                      e.target.value = '';
                    }}
                    className="text-sm font-semibold px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs"
                  >
                    <option value="">+ 도도부현 추가하기</option>
                    {unselectedPrefs.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{REGION_MAP[p.regionId].nameKo}] {p.nameKo}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {/* 상단 도도부현 카드 헤더 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparePrefs.map((pref) => {
                  const reg = REGION_MAP[pref.regionId];
                  return (
                    <div
                      key={pref.id}
                      className="border rounded-2xl p-4 bg-slate-50/70 border-slate-200 relative shadow-2xs"
                    >
                      <button
                        onClick={() => onRemoveId(pref.id)}
                        className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition"
                        title="제거"
                      >
                        <X size={16} />
                      </button>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${reg.badgeBg} ${reg.badgeText}`}>
                        {reg.nameKo}
                      </span>
                      <h4 className="mt-1.5 font-black text-xl text-slate-900 flex items-center gap-1.5">
                        {pref.nameKo}
                        <span className="text-slate-400 font-medium text-sm">{pref.nameHanja}</span>
                      </h4>
                      <p className="text-sm text-slate-600 italic mt-1 line-clamp-1">{pref.nickname}</p>
                      <button
                        onClick={() => {
                          onSelectPrefecture(pref.id);
                          onClose();
                        }}
                        className="mt-2.5 text-xs font-bold text-sky-700 hover:underline flex items-center gap-1"
                      >
                        지도에서 보기 <ExternalLink size={12} />
                      </button>
                    </div>
                  );
                })}

                {comparePrefs.length < 3 && (
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-slate-50/40 min-h-[130px]">
                    <Plus size={22} className="text-slate-400 mb-1" />
                    <span className="text-sm font-bold text-slate-600 mb-2">도도부현 추가 ({comparePrefs.length}/3)</span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) onAddId(e.target.value);
                        e.target.value = '';
                      }}
                      className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 shadow-2xs max-w-[200px]"
                    >
                      <option value="">선택하여 추가...</option>
                      {unselectedPrefs.map((p) => (
                        <option key={p.id} value={p.id}>
                          [{REGION_MAP[p.regionId].nameKo}] {p.nameKo}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* 상세 지표 비교 테이블 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs mt-4">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 w-32 whitespace-nowrap">구분 & 본섬</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5 font-semibold text-slate-800">
                          {p.type} · {p.island}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">현청 & 율령국</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <div className="font-bold text-slate-900">{p.capitalKo} ({p.capitalHanja})</div>
                          <div className="text-xs text-amber-700 font-semibold mt-0.5">{p.oldProvinces}</div>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">인구 (순위)</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <span className="font-black text-base text-slate-900">{formatPop(p.populationMan)}</span>
                          <span className="text-xs text-slate-500 font-semibold ml-1.5">
                            ({POPULATION_RANK[p.id]}위 / 47)
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">면적 (순위)</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <span className="font-bold text-slate-900">{formatArea(p.areaKm2)}</span>
                          <span className="text-xs text-slate-500 ml-1.5">({AREA_RANK[p.id]}위)</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">인구밀도</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <span className="font-bold text-slate-900">{formatDensity(p.densityPerKm2)}</span>
                          <span className="text-xs text-slate-500 ml-1.5">({DENSITY_RANK[p.id]}위)</span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">역사적 지위</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          {p.powerBadge ? (
                            <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md text-xs">
                              👑 {p.powerBadge}
                            </span>
                          ) : (
                            <span className="text-slate-400">일반 지자체</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">도시권 & 신칸센</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5 space-y-1">
                          {p.metroBelt && (
                            <div className="font-semibold text-slate-800">🚄 {p.metroBelt}</div>
                          )}
                          <div className="text-xs text-sky-800">
                            {p.shinkansenLines.length ? p.shinkansenLines.join(', ') : '신칸센 미경유'}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">핵심 산업</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <div className="flex flex-wrap gap-1.5">
                            {p.keyIndustries.slice(0, 4).map((ind, i) => (
                              <span key={i} className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">랜드마크·유산</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5 space-y-1">
                          <div className="text-xs sm:text-sm font-medium text-slate-800">
                            {p.landmarks.slice(0, 3).join(', ')}
                          </div>
                          {p.worldHeritage && p.worldHeritage.length > 0 && (
                            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              🏛️ {p.worldHeritage[0]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <th className="p-3.5 font-bold text-rose-800 whitespace-nowrap">한국사 연계</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5">
                          {p.koreanHistory && p.koreanHistory.length > 0 ? (
                            <div className="space-y-0.5">
                              <span className="font-bold text-rose-700 text-xs sm:text-sm">
                                {p.koreanHistory.length}건 기록 보유
                              </span>
                              <div className="text-xs text-slate-600 line-clamp-2">
                                {p.koreanHistory[0].title}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs">특이 기록 없음</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-50/80">
                      <th className="p-3.5 font-bold text-slate-600 whitespace-nowrap">온천 & 미식</th>
                      {comparePrefs.map((p) => (
                        <td key={p.id} className="p-3.5 space-y-0.5">
                          {p.onsenAndSpecialty.onsen && (
                            <div className="text-xs sm:text-sm text-amber-800 font-semibold">
                              ♨️ {p.onsenAndSpecialty.onsen}
                            </div>
                          )}
                          <div className="text-xs text-slate-600">
                            {p.onsenAndSpecialty.specialties.slice(0, 3).join(', ')}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
