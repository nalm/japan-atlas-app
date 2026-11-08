export type RegionId =
  | 'hokkaido'
  | 'tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu';

export type PrefType = '도(都)' | '도(道)' | '부(府)' | '현(県)';

export type IslandName = '홋카이도' | '혼슈' | '시코쿠' | '규슈' | '류큐제도(오키나와)';

export type Lens = 'none' | 'era' | 'korea' | 'shinkansen' | 'heritage';

export interface RegionInfo {
  id: RegionId;
  number: number;
  nameKo: string;
  nameHanja: string;
  nameRomaji: string;
  islandSummary: string;
  fullTitle: string;
  description: string;
  historicalContext: string;
  economicContext: string;
  themeColor: string;
  fillColor: string;
  activeFillColor: string;
  strokeColor: string;
  badgeBg: string;
  badgeText: string;
  prefectureNames: string[];
}

export interface MajorCityItem {
  nameKo: string;
  nameHanja: string;
  status?: '현청·정령지정도시' | '정령지정도시' | '현청·중핵시' | '중핵시' | '현청소재지' | '특별구(23구)' | '주요거점시';
  populationText?: string;
  note: string;
}

export interface PowerCenterRecord {
  title: string; // 예: '헤이안쿄(平安京) 천년 황도', '가마쿠라 막부', '사쓰마번(시마즈 가문 · 77만 석)'
  eraId: string;
  category: '황도·수도' | '막부(무가정권)' | '센고쿠·유력 번(藩)' | '개항·근대화 거점' | '메이지 유신 4대 웅번';
  oldName?: string; // 예: '야마시로국(山城国)', '무사시국 에도(江戸)'
  period?: string;
  note: string;
}

export interface FamousPerson {
  name: string;
  hanja: string;
  era: string;
  role: string;
  connectionType: '출생' | '거병·번주' | '활동·통치' | '유배·순국·개항';
  description: string;
}

export interface KoreanHistoryLink {
  category: '조선통신사 경로' | '고대 도래인·백제 교류' | '임진왜란·피로인·도공' | '근현대·항일 독립운동';
  title: string;
  year: string;
  description: string;
  tongsinsaStep?: number; // 1~10 조선통신사 주요 기착지 단계
}

export interface PrefectureInfo {
  id: string;
  code: number; // JIS X 0401 (1~47)
  nameKo: string; // 예: '도쿄도', '오사카부', '아이치현'
  shortNameKo: string; // 예: '도쿄', '오사카', '아이치'
  nameHanja: string; // 예: '東京都', '大阪府', '愛知県'
  romaji: string; // 예: 'Tōkyō-to'
  regionId: RegionId;
  type: PrefType;
  island: IslandName;
  oldProvinces: string; // 옛 율령국 (예: '무사시국(武蔵国)')
  capitalKo: string; // 현청소재지 한글 (예: '신주쿠구(도쿄 23구)', '삿포로시')
  capitalHanja: string; // 현청소재지 한자
  coord: [number, number]; // 현청/대표 마커 [lng, lat]
  labelCoord?: [number, number]; // 폴리곤 중앙 라벨 좌표 [lng, lat]
  populationMan: number; // 만 명 단위 (예: 1409 -> 1,409만 명)
  populationText: string; // 예: '약 1,409만 명'
  areaKm2: number; // 면적 km²
  densityPerKm2: number; // 인구밀도 (명/km²)
  nickname: string; // 핵심 캐치프레이즈
  powerBadge?: '역대 황도(皇都)' | '역대 막부 소재지' | '메이지 유신 4대 웅번' | '센고쿠·에도 대번(大藩)';
  metroBelt?: '수도권(간토 대도시권)' | '게이한신(긴키 대도시권)' | '주쿄권(도카이 대도시권)' | '기타큐슈·후쿠오카 도시권' | '센다이·삿포로·히로시마 지방중추';
  shinkansenLines: string[]; // 통과하는 신칸센 노선명
  majorCities: MajorCityItem[];
  powerCenters: PowerCenterRecord[];
  historicalRoleSummary: string;
  historicalEvents: {
    era: string;
    title: string;
    detail: string;
  }[];
  famousPeople: FamousPerson[];
  characteristicsSummary: string;
  keyIndustries: string[];
  landmarks: string[];
  worldHeritage?: string[]; // 유네스코 세계유산
  onsenAndSpecialty: {
    onsen?: string; // 대표 온천
    specialties: string[]; // 대표 미식·특산품
  };
  koreanHistory?: KoreanHistoryLink[];
}

export interface HistoricalEra {
  id: string;
  name: string;
  period: string;
  description: string;
  primaryPrefIds: string[]; // 해당 시대 수도·막부·최핵심 도도부현
  majorHubPrefIds: string[]; // 주요 웅번·거점 도도부현
  highlightNote: string;
}

export interface HierarchyLevel {
  level: number;
  titleKo: string;
  titleHanja: string;
  subtitle: string;
  koreaComparison: string;
  colorClass: string;
  borderClass: string;
  badgeClass: string;
  units: {
    nameKo: string;
    nameHanja: string;
    description: string;
    example: string;
    isSpecial?: boolean;
  }[];
}

export interface OldProvinceMapping {
  circuitKo: string; // 오기칠도 (예: '도카이도(東海道)', '산요도(山陽道)', '사이카이도(西海道)')
  oldNameKo: string; // 예: '사쓰마국 · 오스미국'
  oldNameHanja: string; // 예: '薩摩国 · 大隅国'
  shortAlias: string; // 예: '사쓰마(薩州)'
  modernPrefId: string;
  modernPrefKo: string;
  historicalSignificance: string;
}
