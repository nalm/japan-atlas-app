import { useState } from 'react';
import { X, Layers, Building2, MapPin, Sparkles, Zap, Globe } from 'lucide-react';
import { HIERARCHY_LEVELS, OLD_PROVINCE_MAPPINGS } from '../data/regionsAndEras';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrefecture?: (id: string) => void;
}

export default function HierarchyModal({ isOpen, onClose, onSelectPrefecture }: Props) {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'provinces' | 'kanto-kansai'>('hierarchy');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Layers size={17} />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                일본 행정 계층 구조 및 율령국(令制国) 체계
              </h3>
              <p className="text-xs text-slate-500">
                1都 1道 2府 43県 · 정령지정도시 · 중핵시 · 옛 율령국과 동서일본 문화권 비교
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-5 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'hierarchy'
                ? 'border-slate-900 text-slate-900 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🏛️ 1都 1道 2府 43県 & 대도시 특례
          </button>
          <button
            onClick={() => setActiveTab('provinces')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'provinces'
                ? 'border-slate-900 text-slate-900 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📜 옛 율령국(令制国) & 막말 웅번 매핑
          </button>
          <button
            onClick={() => setActiveTab('kanto-kansai')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'kanto-kansai'
                ? 'border-slate-900 text-slate-900 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚡ 간토 vs 간사이 (동·서일본 문화 & 전력망)
          </button>
        </div>

        {/* 탭 콘텐츠 본문 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-thin">
          {activeTab === 'hierarchy' && (
            <div className="space-y-6">
              {/* 계층 카드 리스트 */}
              {HIERARCHY_LEVELS.map((lvl) => (
                <div key={lvl.level} className={`border rounded-2xl p-4 sm:p-5 ${lvl.borderClass} ${lvl.colorClass}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${lvl.badgeClass}`}>
                        제{lvl.level}계층
                      </span>
                      <h4 className="font-black text-base text-slate-900">
                        {lvl.titleKo} <span className="text-slate-400 font-semibold text-xs">{lvl.titleHanja}</span>
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                      한국 대응: {lvl.koreaComparison}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">{lvl.subtitle}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {lvl.units.map((u, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border bg-white shadow-2xs ${
                          u.isSpecial ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs text-slate-900">
                            {u.nameKo} <span className="text-slate-400 font-medium text-[11px]">{u.nameHanja}</span>
                          </span>
                          {u.isSpecial && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                              특례 자치체
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">{u.description}</p>
                        <div className="mt-2 text-[10px] text-slate-500 font-semibold bg-slate-50 p-1.5 rounded-md border border-slate-100">
                          예시: {u.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'provinces' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950">
                <div className="font-black text-sm text-amber-900 mb-1 flex items-center gap-1.5">
                  <Sparkles size={15} /> 율령국(令制国)과 폐번치현(廢藩置縣) 역사
                </div>
                7세기 다이카 개신과 율령 체제에 따라 제정된 고대 68개 구니(国)는 중세와 에도 시대(약 300여 개 번)를 거치며 
                일본인의 정체성을 규정했습니다. 1871년 메이지 정부가 영주(다이묘)의 지배권을 회수하고 근대 행정구역인 
                도도부현을 설치(폐번치현)하면서 오늘날의 47개 도로 통합되었습니다. 
                여전히 사쓰마·조슈·가가 등 옛 율령국과 번의 이름은 문화·지리·특산물에 강력하게 살아 숨 쉬고 있습니다.
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/80 text-slate-700 font-extrabold border-b border-slate-200">
                    <tr>
                      <th className="p-3">고대 도(道)</th>
                      <th className="p-3">옛 율령국(令制国) / 약칭</th>
                      <th className="p-3">현대 도도부현</th>
                      <th className="p-3">역사적 의의 및 관련 번(藩)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {OLD_PROVINCE_MAPPINGS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-semibold text-slate-500 whitespace-nowrap">{row.circuitKo}</td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{row.oldNameKo}</div>
                          <div className="text-[10px] text-slate-400">{row.oldNameHanja} · {row.shortAlias}</div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {onSelectPrefecture ? (
                            <button
                              onClick={() => {
                                onSelectPrefecture(row.modernPrefId);
                                onClose();
                              }}
                              className="font-extrabold text-sky-700 hover:underline"
                            >
                              {row.modernPrefKo} ↗
                            </button>
                          ) : (
                            <span className="font-extrabold text-slate-800">{row.modernPrefKo}</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-600 leading-snug">{row.historicalSignificance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'kanto-kansai' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 간토(동일본) */}
                <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      동일본 중심
                    </span>
                    <span className="font-black text-amber-900">간토 (関東)</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-2">
                    에도 막부 · 무사 정권 · 표준어의 심장부
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                    <li>• <span className="font-bold">역사성:</span> 가마쿠라 막부(1192) 및 도쿠가와 에도 막부(1603) 이래 무사(사무라이) 중심의 실용적이고 규율을 중시하는 문화.</li>
                    <li>• <span className="font-bold">음식 문화:</span> 간장 베이스의 짙고 진한 우동 국물(쇼유 다시), 장어 등쪽으로 손질(배 가르기를 피하는 무사 문화).</li>
                    <li>• <span className="font-bold">에스컬레이터:</span> 좌측에 서고, 우측을 비워둠.</li>
                    <li>• <span className="font-bold">전력 주파수:</span> 독일 발전기를 들여온 역사로 <span className="font-extrabold text-amber-800">50Hz (동일본)</span>.</li>
                  </ul>
                </div>

                {/* 간사이(서일본) */}
                <div className="border border-purple-200 bg-purple-50/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-600 text-white">
                      서일본 중심
                    </span>
                    <span className="font-black text-purple-900">간사이 (関西 · 긴키)</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-2">
                    천년 황도(교토) · 상업 수도(오사카)
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                    <li>• <span className="font-bold">역사성:</span> 아스카·나라·교토 황도 문화와 에도 시대 ‘천하의 부엌’ 오사카 상인들의 개방적이고 실리적인 문화.</li>
                    <li>• <span className="font-bold">음식 문화:</span> 다시마·가쓰오부시 베이스의 맑고 감칠맛 나는 우동 국물, 장어 배쪽 손질(상인들의 정직한 속마음).</li>
                    <li>• <span className="font-bold">에스컬레이터:</span> 우측에 서고, 좌측을 비워둠 (1970 오사카 엑스포 계기).</li>
                    <li>• <span className="font-bold">전력 주파수:</span> 미국 발전기를 들여온 역사로 <span className="font-extrabold text-purple-800">60Hz (서일본)</span>.</li>
                  </ul>
                </div>
              </div>

              {/* 주파수 경계선 해설 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed">
                <div className="font-black text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-500" />
                  이토이가와-시즈오카 구조선과 세계 유일의 50Hz/60Hz 양분 국가
                </div>
                메이지 시대 도쿄전등이 독일 AEG에서 50Hz 교류 발전기를 도입하고, 오사카전등이 미국 GE에서 60Hz 발전기를 수입한 결과, 
                니가타현 이토이가와시와 시즈오카현 후지산 부근을 경계로 전력망이 둘로 나뉘었습니다. 
                현재는 주파수 변환소(FC)를 통해 전력을 상호 융통하고 있으나 여전히 동일본 대지진 등 비상시 전력 수급의 핵심 기술적 변수로 작용합니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
