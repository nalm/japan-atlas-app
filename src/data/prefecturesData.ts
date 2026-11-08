import { PrefectureInfo, RegionId, RegionInfo } from '../types/atlas';
import { REGIONS } from './regionsAndEras';
import { PREFS_NORTH_EAST } from './prefsNorthEast';
import { PREFS_CENTRAL } from './prefsCentral';
import { PREFS_WEST_SOUTH } from './prefsWestSouth';

// 47개 도도부현 통합 배열
export const ALL_PREFECTURES: PrefectureInfo[] = [
  ...PREFS_NORTH_EAST,
  ...PREFS_CENTRAL,
  ...PREFS_WEST_SOUTH,
];

// ID 키 맵
export const PREFECTURE_MAP: Record<string, PrefectureInfo> = Object.fromEntries(
  ALL_PREFECTURES.map((p) => [p.id, p])
);

// 지방(Region) 키 맵
export const REGION_MAP: Record<RegionId, RegionInfo> = Object.fromEntries(
  REGIONS.map((r) => [r.id, r])
) as Record<RegionId, RegionInfo>;

// 인구 순위 (1위 = 최대 인구 도쿄도)
const sortedByPop = [...ALL_PREFECTURES].sort((a, b) => b.populationMan - a.populationMan);
export const POPULATION_RANK: Record<string, number> = Object.fromEntries(
  sortedByPop.map((p, idx) => [p.id, idx + 1])
);

// 면적 순위 (1위 = 최대 면적 홋카이도)
const sortedByArea = [...ALL_PREFECTURES].sort((a, b) => b.areaKm2 - a.areaKm2);
export const AREA_RANK: Record<string, number> = Object.fromEntries(
  sortedByArea.map((p, idx) => [p.id, idx + 1])
);

// 인구밀도 순위 (1위 = 최고 밀도 도쿄도)
const sortedByDensity = [...ALL_PREFECTURES].sort((a, b) => b.densityPerKm2 - a.densityPerKm2);
export const DENSITY_RANK: Record<string, number> = Object.fromEntries(
  sortedByDensity.map((p, idx) => [p.id, idx + 1])
);

// 포맷터 함수들
export function formatPop(man: number): string {
  return `${man.toLocaleString()}만 명`;
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} km²`;
}

export function formatDensity(density: number): string {
  return `${density.toLocaleString()}명/km²`;
}

// 라벨 밀집 방지용 세트 (기본 줌에서는 축약하거나 숨김)
export const DENSE_PREF_IDS = new Set<string>([
  'tokyo',
  'kanagawa',
  'saitama',
  'chiba',
  'osaka',
  'kyoto',
  'nara',
  'shiga',
  'kagawa',
  'tokushima',
  'saga',
  'toyama',
  'fukui',
]);

// 지도 마커 기준 라벨 배치 방향 (충돌 방지)
export const LABEL_POS: Record<string, 'left' | 'right' | 'top' | 'bottom'> = {
  tokyo: 'right',
  kanagawa: 'bottom',
  saitama: 'top',
  chiba: 'right',
  gunma: 'left',
  tochigi: 'right',
  ibaraki: 'right',
  osaka: 'left',
  kyoto: 'top',
  hyogo: 'left',
  nara: 'bottom',
  wakayama: 'bottom',
  shiga: 'right',
  mie: 'right',
  aichi: 'bottom',
  shizuoka: 'bottom',
  gifu: 'top',
  nagano: 'right',
  yamanashi: 'left',
  niigata: 'right',
  toyama: 'top',
  ishikawa: 'left',
  fukui: 'left',
  tottori: 'top',
  shimane: 'top',
  okayama: 'bottom',
  hiroshima: 'bottom',
  yamaguchi: 'left',
  tokushima: 'bottom',
  kagawa: 'top',
  ehime: 'left',
  kochi: 'bottom',
  fukuoka: 'top',
  saga: 'left',
  nagasaki: 'left',
  kumamoto: 'right',
  oita: 'right',
  miyazaki: 'right',
  kagoshima: 'bottom',
  okinawa: 'right',
  hokkaido: 'right',
  aomori: 'top',
  iwate: 'right',
  miyagi: 'right',
  akita: 'left',
  yamagata: 'left',
  fukushima: 'right',
};

export interface ComparePreset {
  title: string;
  description: string;
  prefIds: string[];
}

export const COMPARE_PRESETS: ComparePreset[] = [
  {
    title: '3대 메트로폴리스 (수도권 · 게이한신 · 주쿄권)',
    description: '일본 3대 경제권을 이끄는 도쿄도(1위), 오사카부(3위), 아이치현(4위)의 경제·인구·산업 구조 비교',
    prefIds: ['tokyo', 'osaka', 'aichi'],
  },
  {
    title: '천년 고도와 고대 막부 수도',
    description: '794년 헤이안쿄의 교토부, 710년 헤이조쿄의 나라현, 1192년 가마쿠라 막부의 가나가와현 비교',
    prefIds: ['kyoto', 'nara', 'kanagawa'],
  },
  {
    title: '메이지 유신 서남 웅번 (삿초히)',
    description: '막말 개혁을 주도하고 근대 일본 정부를 수립한 사쓰마(가고시마), 조슈(야마구치), 히젠(사가)',
    prefIds: ['kagoshima', 'yamaguchi', 'saga'],
  },
  {
    title: '한국사 · 조선통신사 · 도공 교류 거점',
    description: '조선통신사 제1차 기착지 쓰시마·이키(나가사키), 규슈 통구(후쿠오카), 세토내해 기항지(히로시마)',
    prefIds: ['nagasaki', 'fukuoka', 'hiroshima'],
  },
  {
    title: '일본의 북단과 남단 (대자연과 남국)',
    description: '설국과 대자연의 홋카이도(면적 1위), 류큐 왕국 해양 문화의 오키나와현, 일본 알프스의 나가노현',
    prefIds: ['hokkaido', 'okinawa', 'nagano'],
  },
  {
    title: '세계문화유산과 전통 공예',
    description: '가가 100만 석 전통공예의 이시카와, 닛코 도쇼구의 도치기, 국보 히메지성의 효고',
    prefIds: ['ishikawa', 'tochigi', 'hyogo'],
  },
];
