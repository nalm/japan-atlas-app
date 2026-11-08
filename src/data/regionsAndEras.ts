import {
  RegionInfo,
  HistoricalEra,
  HierarchyLevel,
  OldProvinceMapping,
} from '../types/atlas';

export const REGIONS: RegionInfo[] = [
  {
    id: 'hokkaido',
    number: 1,
    nameKo: '홋카이도',
    nameHanja: '北海道',
    nameRomaji: 'Hokkaidō',
    islandSummary: '홋카이도 (1道)',
    fullTitle: '홋카이도 지방 (北海道 · 최북단 대자연)',
    description:
      '일본 열도 최북단의 본섬으로, 하나의 섬 자체가 단일 광역자치단체(1道)를 이루며 일본 전체 면적의 약 22%를 차지합니다. 선주민 아이누(Ainu) 민족의 터전(에조치)이었으며, 1869년 메이지 정부의 개척사 설치 이후 계획도시 삿포로를 중심으로 낙농업·농수산업·겨울 관광의 거점으로 발전했습니다.',
    historicalContext:
      '선사~근세까지 본토 화인(和人)과 구별되는 아이누 문화권이었으며, 에도 시대에는 최남단 마쓰마에번만 화인이 관할하다가 1869년 홋카이도(北海道)로 개칭되었습니다.',
    economicContext:
      '일본 최대의 식량 기지(우유·밀·감자·옥수수·해산물 1위)이자 최근 치토세의 차세대 반도체(Rapidus) 프로젝트로 첨단 산업 기지로도 주목받고 있습니다.',
    themeColor: '#0284C7',
    fillColor: '#BAE6FD',
    activeFillColor: '#0EA5E9',
    strokeColor: '#0369A1',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    prefectureNames: ['홋카이도'],
  },
  {
    id: 'tohoku',
    number: 2,
    nameKo: '도호쿠',
    nameHanja: '東北',
    nameRomaji: 'Tōhoku',
    islandSummary: '혼슈 북부 (6県)',
    fullTitle: '도호쿠 지방 (東北 · 혼슈 북부)',
    description:
      '혼슈 북부의 6개 현(아오모리·이와테·미야기·아키타·야마가타·후쿠시마)을 아우르는 지역입니다. 고대에는 조정에 복속하지 않던 에미시(蝦夷)의 땅이자 옛 무쓰국(陸奥国)·데와국(出羽国)이었고, 센고쿠 시대에는 ‘독안룡’ 다테 마사무네의 센다이번이 패권을 잡았습니다.',
    historicalContext:
      '헤이안 말기 오슈 후지와라씨의 황금 문화(히라이즈미)가 꽃피웠으며, 막말 보신전쟁에서는 오우에쓰 열번동맹을 결성해 신정부군에 끝까지 저항했던 역사를 지닙니다.',
    economicContext:
      '센다이시를 지방 중추 거점으로 삼으며, 일본 유수의 곡창지대(아키타코마치·사사니시키 쌀)와 과수원(아오모리 사과, 야마가타 체리), 도호쿠 신칸센 연선 전자·부품 산업이 발달해 있습니다.',
    themeColor: '#16A34A',
    fillColor: '#BBF7D0',
    activeFillColor: '#22C55E',
    strokeColor: '#15803D',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    prefectureNames: ['아오모리현', '이와테현', '미야기현', '아키타현', '야마가타현', '후쿠시마현'],
  },
  {
    id: 'kanto',
    number: 3,
    nameKo: '간토',
    nameHanja: '関東',
    nameRomaji: 'Kantō',
    islandSummary: '혼슈 동부 · 수도권 (1都 6県)',
    fullTitle: '간토 지방 (関東 · 수도권 1都 6県)',
    description:
      '일본 최대의 평야인 간토평야 위에 수도 도쿄도와 가나가와·사이타마·지바·이바라키·도치기·군마 6개 현이 자리한 일본 정치·경제·문화의 심장부입니다. 일본 전체 인구의 약 35%(약 4,350만 명)가 이곳에 밀집해 세계 최대의 메갈로폴리스(수도권)를 형성합니다.',
    historicalContext:
      '1192년 미나모토노 요리토모가 가마쿠라에 최초의 무가정권(막부)을 세운 이래 무사들의 본거지가 되었고, 1603년 도쿠가와 이에야스의 에도 막부 개창과 1868년 도쿄 천도로 천년 고도 교토를 넘어 일본의 절대 중심이 되었습니다.',
    economicContext:
      '도쿄 23구의 글로벌 금융·본사·IT 경제, 요코하마·가와사키·지바의 게이힌·게이요 임해공업지대, 쓰쿠바 연구학원도시, 북간토 자동차·기계 산업이 결합된 일본 GDP의 약 40%를 담당하는 핵심 권역입니다.',
    themeColor: '#D97706',
    fillColor: '#FDE68A',
    activeFillColor: '#F59E0B',
    strokeColor: '#B45309',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    prefectureNames: ['도쿄도', '가나가와현', '사이타마현', '지바현', '이바라키현', '도치기현', '군마현'],
  },
  {
    id: 'chubu',
    number: 4,
    nameKo: '주부',
    nameHanja: '中部',
    nameRomaji: 'Chūbu',
    islandSummary: '혼슈 중앙부 (9県)',
    fullTitle: '주부 지방 (中部 · 호쿠리쿠·고신에쓰·도카이 9県)',
    description:
      '혼슈 정중앙에 위치하여 동일본(간토)과 서일본(간사이)을 잇는 교차로입니다. 동해 연안의 ‘호쿠리쿠(니가타·도야마·이시카와·후쿠이)’, 일본 알프스 산악 내륙의 ‘고신에쓰(야마나시·나가노)’, 태평양 연안의 ‘도카이(기후·시즈오카·아이치)’ 3개 소권역으로 나뉩니다.',
    historicalContext:
      '센고쿠 시대 천하통일 3영걸(오다 노부나가·도요토미 히데요시·도쿠가와 이에야스)이 모두 배출된 아이치·기후(오와리·미카와·미노)와 다케다 신겐(가이)·우에스기 겐신(에치고)·마에다 가문(가가 100만 석)의 치열한 역사가 깃든 땅입니다.',
    economicContext:
      '나고야·도요타시를 중심으로 한 주쿄 공업지대(아이치·기후·시즈오카)는 토요타 자동차를 필두로 일본 제조업 출하액 압도적 1위를 자랑하는 세계적인 모노즈쿠리(제조) 허브입니다.',
    themeColor: '#7C3AED',
    fillColor: '#DDD6FE',
    activeFillColor: '#8B5CF6',
    strokeColor: '#6D28D9',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    prefectureNames: [
      '아이치현',
      '시즈오카현',
      '기후현',
      '나가노현',
      '야마나시현',
      '니가타현',
      '이시카와현',
      '도야마현',
      '후쿠이현',
    ],
  },
  {
    id: 'kinki',
    number: 5,
    nameKo: '긴키 (간사이)',
    nameHanja: '近畿 · 関西',
    nameRomaji: 'Kinki / Kansai',
    islandSummary: '혼슈 중서부 (2府 5県)',
    fullTitle: '긴키·간사이 지방 (近畿·関西 · 천년 황도와 상인의 도시 2府 5県)',
    description:
      '황궁의 가까운 주변이라는 뜻의 ‘긴키(近畿)’ 또는 관문 서쪽이라는 뜻의 ‘간사이(関西)’로 불리며, 오사카부·교토부 2부와 효고·나라·시가·미에·와카야마 5현을 포괄합니다. 아스카·나라·헤이안(교토)으로 이어지는 약 1,300년 일본 고대·중세·근세 황실 수도의 본무대입니다.',
    historicalContext:
      '한반도 도래인(백제·가야·고구려) 문화가 꽃핀 아스카·나라 시대의 발상지이자, 794년부터 1869년까지 천년 황도였던 교토, ‘천하의 부엌’으로 불린 상업 수도 오사카, 개항장 고베가 어우러진 서일본의 중심입니다.',
    economicContext:
      '오사카·고베·교토를 잇는 게이한신(京阪神) 대도시권은 수도권에 이은 일본 제2의 경제·문화권으로, 제약·바이오·전자·전통 공예·관광 산업이 고도로 발달해 있습니다.',
    themeColor: '#E11D48',
    fillColor: '#FECDD3',
    activeFillColor: '#F43F5E',
    strokeColor: '#BE123C',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    prefectureNames: ['오사카부', '교토부', '효고현', '나라현', '시가현', '미에현', '와카야마현'],
  },
  {
    id: 'chugoku',
    number: 6,
    nameKo: '주고쿠',
    nameHanja: '中国',
    nameRomaji: 'Chūgoku',
    islandSummary: '혼슈 서단부 (5県)',
    fullTitle: '주고쿠 지방 (中国 · 산인·산요 5県)',
    description:
      '혼슈 서쪽 끝자락의 5개 현으로, 주고쿠 산지를 경계로 동해 쪽의 ‘산인(山陰: 돗토리·시마네)’과 세토내해 쪽의 ‘산요(山陽: 오카야마·히로시마·야마구치)’로 나뉩니다. 이름인 ‘주고쿠(中国)’는 헤이안 시대 수도 교토를 기준으로 근국(近国)·중국(中国)·원국(遠国)으로 나눈 데서 유래했습니다.',
    historicalContext:
      '시마네(이즈모)는 일본 건국 신화의 무대이며, 세토내해 항로는 고대 한반도 사절과 조선통신사가 오가던 해상 대동맥이었습니다. 야마구치(조슈번)는 메이지 유신의 주역(이토 히로부미·요시다 쇼인 등)을 배출한 근대사의 진원지입니다.',
    economicContext:
      '히로시마(마쓰다 자동차·중공업)와 오카야마(구라시키 미즈시마 콤비나트)·야마구치를 잇는 세토우치 공업지역은 중화학·조선·자동차 산업의 핵심 벨트입니다.',
    themeColor: '#0D9488',
    fillColor: '#99F6E4',
    activeFillColor: '#14B8A6',
    strokeColor: '#0F766E',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    prefectureNames: ['히로시마현', '오카야마현', '야마구치현', '시마네현', '돗토리현'],
  },
  {
    id: 'shikoku',
    number: 7,
    nameKo: '시코쿠',
    nameHanja: '四国',
    nameRomaji: 'Shikoku',
    islandSummary: '시코쿠 본섬 (4県)',
    fullTitle: '시코쿠 지방 (四国 · 4개 옛 구니의 섬 4県)',
    description:
      '일본 4대 본섬 중 가장 작은 섬으로, 고대 율령국인 아와(도쿠시마)·사누키(가가와)·이요(에히메)·도사(고치) 4개 구니(国)가 그대로 현대의 4개 현이 되어 ‘시코쿠(四国)’라 불립니다. 세토내해와 태평양 사이에 자리하며 혼슈와는 세토대교 등 3대 연륙교로 연결됩니다.',
    historicalContext:
      '헤이안 시대 승려 구카이(홍법대사)의 유적을 도는 ‘시코쿠 88개소 순례길(오헨로)’ 문화가 천년 넘게 이어져 오며, 남부 고치현(도사번)은 막말 사카모토 료마를 배출해 대정봉환과 메이지 유신을 견인했습니다.',
    economicContext:
      '북부 세토내해 연안(가가와·에히메)의 조선·제지·화학 공업과 에히메 감귤, 고치 가다랑어, 가가와 사누키 우동 등 독보적인 농수산·미식 관광으로 유명합니다.',
    themeColor: '#CA8A04',
    fillColor: '#FEF08A',
    activeFillColor: '#EAB308',
    strokeColor: '#A16207',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-900',
    prefectureNames: ['에히메현', '가가와현', '도쿠시마현', '고치현'],
  },
  {
    id: 'kyushu',
    number: 8,
    nameKo: '규슈·오키나와',
    nameHanja: '九州·沖縄',
    nameRomaji: 'Kyūshū & Okinawa',
    islandSummary: '규슈 (7県) · 류큐제도 (1県)',
    fullTitle: '규슈·오키나와 지방 (九州·沖縄 · 대륙 교류의 관문과 류큐 왕국 8県)',
    description:
      '옛 9개 율령국에서 유래한 일본 남서부의 대섬 ‘규슈(7개 현)’와 독자적인 류큐 왕국 역사를 지닌 아열대 군도 ‘오키나와현’을 묶은 권역입니다. 한반도 및 중국 대륙과 가장 가까워 선사시대 벼농사 전래부터 근대 서양 문물 유입까지 늘 일본 역사의 최전선 관문이었습니다.',
    historicalContext:
      '후쿠오카(다자이후·하카타)는 고대 대외 외교·방위의 총본산이었고, 나가사키(데지마)는 에도 막부 200년 쇄국기 유일한 서양 교역 창구였으며, 가고시마(사쓰마번)와 사가(히젠번)는 메이지 유신과 근대 공업화를 이끈 주역입니다.',
    economicContext:
      '후쿠오카·기타큐슈 대도시권을 중심으로, 최근 구마모토 TSMC 반도체 공장 유치로 부활한 ‘실리콘 아일랜드(반도체 산업)’, 오이타·구마모토·가고시마의 화산 온천 관광, 오키나와 휴양 관광이 활발합니다.',
    themeColor: '#DB2777',
    fillColor: '#FBCFE8',
    activeFillColor: '#EC4899',
    strokeColor: '#BE185D',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-900',
    prefectureNames: [
      '후쿠오카현',
      '구마모토현',
      '가고시마현',
      '나가사키현',
      '오이타현',
      '미야자키현',
      '사가현',
      '오키나와현',
    ],
  },
];

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'all',
    name: '전체 시대 (황도·막부·웅번)',
    period: '아스카 ~ 근현대',
    description:
      '일본 역사는 천황이 머문 ‘황도(아스카·나라·교토·도쿄)’와 실질적 통치권을 쥔 무가정권 ‘막부(가마쿠라·무로마치·에도)’, 그리고 지방을 지배한 유력 ‘번(藩·다이묘)’의 상호작용으로 전개되었습니다.',
    primaryPrefIds: ['nara', 'kyoto', 'kanagawa', 'tokyo', 'osaka'],
    majorHubPrefIds: ['aichi', 'kagoshima', 'yamaguchi', 'kochi', 'saga', 'ishikawa', 'miyagi', 'fukuoka', 'hiroshima', 'okinawa'],
    highlightNote:
      '천년 고도 교토(헤이안쿄)와 나라(헤이조쿄)가 서일본 긴키에 있다면, 무가정권의 거점 가마쿠라와 에도(도쿄)는 동일본 간토에 세워져 동서 이원 구조를 형성했습니다.',
  },
  {
    id: 'asuka-nara',
    name: '① 고대·아스카·나라',
    period: '592 ~ 794년',
    description:
      '한반도(백제·고구려·신라) 도래인들의 선진 기술과 불교를 수용하여 야마토 정권이 중앙집권 율령국가로 도약한 시대입니다. 아스카·후지와라쿄를 거쳐 710년 나라의 헤이조쿄(平城京)에 당나라 장안성을 모방한 계획 수도를 세웠습니다.',
    primaryPrefIds: ['nara', 'osaka', 'fukuoka'],
    majorHubPrefIds: ['shimane', 'shiga', 'kyoto', 'saga', 'miyazaki'],
    highlightNote:
      '나라현(아스카·헤이조쿄)과 오사카부(나니와노미야), 그리고 한반도·당나라 외교/국방 사령부였던 후쿠오카현(다자이후)이 고대 국가의 3대 축이었습니다.',
  },
  {
    id: 'heian',
    name: '② 헤이안 (천년 황도)',
    period: '794 ~ 1185년',
    description:
      '794년 간무 천황이 교토의 헤이안쿄(平安京)로 천도하며 시작된 약 400년의 귀족 시대입니다. 후지와라 가문의 섭관정치와 히라가나·『겐지 이야기』 등 국풍(国風) 문화가 꽃피웠고, 말기에는 다이라노 기요모리(헤이케)가 권력을 잡았습니다.',
    primaryPrefIds: ['kyoto'],
    majorHubPrefIds: ['nara', 'shiga', 'hyogo', 'hiroshima', 'iwate', 'fukuoka'],
    highlightNote:
      '교토(헤이안쿄)는 이후 1869년 도쿄 천도까지 무려 1,075년간 천황이 거주하는 일본의 공식 수도(황도)로 군림했습니다. 동북 이와테현(히라이즈미)에서는 오슈 후지와라씨가 독자적 황금 문화를 이뤘습니다.',
  },
  {
    id: 'kamakura-muromachi',
    name: '③ 가마쿠라·무로마치 막부',
    period: '1185 ~ 1573년',
    description:
      '겐페이 전쟁에서 승리한 미나모토노 요리토모가 가마쿠라(가나가와현)에 최초의 무사 정권(막부)을 열었고, 이어 아시카가 다카우지가 교토 무로마치에 두 번째 막부를 세웠습니다. 금각사·은각사·다도·노(能) 등 일본 전통 미학이 확립된 시기입니다.',
    primaryPrefIds: ['kanagawa', 'kyoto'],
    majorHubPrefIds: ['nara', 'fukuoka', 'nagasaki', 'yamaguchi', 'shizuoka', 'hyogo'],
    highlightNote:
      '1274·1281년 여몽연합군의 일본 원정(가미카제) 당시 최대 격전지는 후쿠오카(하카타만)와 나가사키(쓰시마·이키·다카시마)였으며, 무로마치 시대 서일본 최대 세력은 야마구치의 오우치 가문이었습니다.',
  },
  {
    id: 'sengoku',
    name: '④ 센고쿠·천하통일',
    period: '1467 ~ 1600년',
    description:
      '오닌의 난 이후 전국의 슈고 다이묘와 센고쿠 다이묘들이 할거하며 치열한 각축전을 벌인 전국시대입니다. 아이치현(오와리·미카와) 출신의 천하통일 3영걸 오다 노부나가·도요토미 히데요시·도쿠가와 이에야스가 차례로 패권을 잡았습니다.',
    primaryPrefIds: ['aichi', 'osaka', 'kyoto', 'gifu', 'shiga'],
    majorHubPrefIds: ['yamanashi', 'niigata', 'kanagawa', 'shizuoka', 'miyagi', 'hiroshima', 'yamaguchi', 'kagoshima', 'saga'],
    highlightNote:
      '아이치현(나고야·오카자키)과 기후현(기후성·세키가하라), 시가현(아즈치성), 오사카부(오사카성)를 잇는 주부~긴키 회랑이 천하통일의 결정적 무대였습니다.',
  },
  {
    id: 'edo',
    name: '⑤ 에도 막부 · 주요 번(藩)',
    period: '1603 ~ 1867년',
    description:
      '1600년 세키가하라 전투에서 승리한 도쿠가와 이에야스가 에도(도쿄)에 막부를 열어 265년간 평화와 경제 번영을 누린 시대입니다. 막부와 전국 약 260여 개 번(藩)이 권력을 나눈 ‘막번체제(幕藩体制)’와 참근교대제, 조닌(상공인) 문화가 발달했습니다.',
    primaryPrefIds: ['tokyo', 'osaka', 'kyoto'],
    majorHubPrefIds: ['ishikawa', 'miyagi', 'aichi', 'wakayama', 'ibaraki', 'kagoshima', 'yamaguchi', 'kumamoto', 'fukuoka', 'hiroshima', 'nagasaki'],
    highlightNote:
      '장군의 수도 에도(도쿄), 천황의 수도 교토, 천하의 부엌 오사카를 ‘3도(三都)’라 불렀으며, 도쿠가와 고산케(아이치·와카야마·이바라키)와 가가번(이시카와)·사쓰마번(가고시마)·센다이번(미야기) 등 대번이 지방을 통치했습니다.',
  },
  {
    id: 'meiji-modern',
    name: '⑥ 메이지 유신 · 근현대',
    period: '1868년 ~ 현재',
    description:
      '페리 흑선 내항(가나가와) 이후 사쓰마(가고시마)·조슈(야마구치)·도사(고치)·히젠(사가)의 ‘삿초토비(薩長土肥) 4대 웅번’이 막부를 무너뜨리고 1868년 메이지 유신과 도쿄 천도를 단행했습니다. 폐번치현(1871)으로 오늘날의 47개 도도부현 체제가 탄생했습니다.',
    primaryPrefIds: ['tokyo', 'kagoshima', 'yamaguchi', 'kochi', 'saga'],
    majorHubPrefIds: ['kanagawa', 'osaka', 'aichi', 'hyogo', 'fukuoka', 'hiroshima', 'nagasaki', 'hokkaido', 'okinawa'],
    highlightNote:
      '가고시마(사쓰마)와 야마구치(조슈)는 근대 일본 내각 총리와 육해군 수뇌부를 대거 배출한 메이지 정부의 양대 산맥이었으며, 1871년 폐번치현과 1879년 류큐처분(오키나와현 설치)으로 현재의 국토 행정 틀이 완성되었습니다.',
  },
];

/** 조선통신사 사행길 주요 기착지 (부산 -> 쓰시마 -> 에도) */
export const TONGSINSA_ROUTE: {
  step: number;
  name: string;
  periodOrRole: string;
  coord: [number, number];
  prefId?: string;
}[] = [
  {
    step: 1,
    name: '이즈하라 (쓰시마·대마도)',
    periodOrRole: '나가사키현 · 통신사 맞이 및 쓰시마번주 인도 시작점',
    coord: [129.29, 34.2],
    prefId: 'nagasaki',
  },
  {
    step: 2,
    name: '이키섬 & 아이노시마',
    periodOrRole: '나가사키·후쿠오카현 · 현해탄 도해 후 후쿠오카번 영접',
    coord: [130.42, 33.76],
    prefId: 'fukuoka',
  },
  {
    step: 3,
    name: '시모노세키 (아카마가세키)',
    periodOrRole: '야마구치현 · 혼슈 본토 첫 상륙 관문이자 세토내해 초입',
    coord: [130.94, 33.95],
    prefId: 'yamaguchi',
  },
  {
    step: 4,
    name: '가마가리 · 도모노우라',
    periodOrRole: '히로시마현 · 세토내해 최고 절경지(일동제일형승) 및 문화 교류',
    coord: [132.68, 34.2],
    prefId: 'hiroshima',
  },
  {
    step: 5,
    name: '우시마도 (세토우치)',
    periodOrRole: '오카야마현 · 오카야마번 영접 포구 및 유학자 필담 교류',
    coord: [134.16, 34.61],
    prefId: 'okayama',
  },
  {
    step: 6,
    name: '오사카 (요도가와강)',
    periodOrRole: '오사카부 · 해로에서 육로로 전환하는 상업 수도 기착지',
    coord: [135.5, 34.69],
    prefId: 'osaka',
  },
  {
    step: 7,
    name: '교토 & 오미하치만',
    periodOrRole: '교토부·시가현 · 천년 고도 통과 및 비와호 연안 조선인가도',
    coord: [135.76, 35.01],
    prefId: 'kyoto',
  },
  {
    step: 8,
    name: '나고야 (오와리)',
    periodOrRole: '아이치현 · 도카이도 핵심 거점 및 오와리번 영접',
    coord: [136.91, 35.18],
    prefId: 'aichi',
  },
  {
    step: 9,
    name: '시즈오카 (세이켄지)',
    periodOrRole: '시즈오카현 · 후지산 조망 명소이자 통신사 시문·현판 유산의 보고',
    coord: [138.38, 34.98],
    prefId: 'shizuoka',
  },
  {
    step: 10,
    name: '에도 (도쿄 아사쿠사·히가시혼간지)',
    periodOrRole: '도쿄도 · 최종 목적지 (에도성에서 쇼군에게 국서 전달) · 일부 사행은 닛코(도치기)까지 연장',
    coord: [139.77, 35.68],
    prefId: 'tokyo',
  },
];

/** 신칸센 주요 노선망 데이터 */
export const SHINKANSEN_ROUTES: {
  id: string;
  name: string;
  color: string;
  description: string;
  coords: [number, number][];
}[] = [
  {
    id: 'tokaido',
    name: '도카이도 신칸센 (도쿄~신오사카)',
    color: '#2563EB',
    description: '1964년 개통된 세계 최초의 고속철도이자 수도권·주쿄권·게이한신 3대 도시권을 잇는 일본 경제의 대동맥',
    coords: [
      [139.76, 35.68], // 도쿄
      [139.62, 35.51], // 신요코하마
      [138.39, 34.97], // 시즈오카
      [137.73, 34.7],  // 하마마쓰
      [136.88, 35.17], // 나고야
      [135.76, 34.99], // 교토
      [135.5, 34.73],  // 신오사카
    ],
  },
  {
    id: 'sanyo',
    name: '산요 신칸센 (신오사카~하카타)',
    color: '#0D9488',
    description: '간사이(오사카·고베)에서 세토내해 연안(오카야마·히로시마·야마구치)을 거쳐 규슈 후쿠오카(하카타)를 연결',
    coords: [
      [135.5, 34.73],  // 신오사카
      [135.19, 34.71], // 신고베
      [133.92, 34.67], // 오카야마
      [132.48, 34.4],  // 히로시마
      [131.4, 34.09],  // 신야마구치
      [130.88, 33.89], // 고쿠라
      [130.42, 33.59], // 하카타
    ],
  },
  {
    id: 'kyushu',
    name: '규슈·니시큐슈 신칸센 (하카타~가고시마 / 나가사키)',
    color: '#DB2777',
    description: '규슈 남북 종단(후쿠오카~구마모토~가고시마) 및 서부(사가 다케오온센~나가사키) 연결 고속철도',
    coords: [
      [130.42, 33.59], // 하카타
      [130.3, 33.26],  // 사가 인근
      [130.69, 32.79], // 구마모토
      [130.54, 31.58], // 가고시마추오
    ],
  },
  {
    id: 'tohoku-hokkaido',
    name: '도호쿠·홋카이도 신칸센 (도쿄~센다이~신아오모리~신하코다테)',
    color: '#16A34A',
    description: '도쿄에서 도호쿠(우쓰노미야·후쿠시마·센다이·모리오카·아오모리)를 관통해 세이칸 터널로 홋카이도 하코다테(삿포로 연장 공사 중)까지 연결',
    coords: [
      [139.76, 35.68], // 도쿄
      [139.62, 35.91], // 오미야
      [139.9, 36.56],  // 우쓰노미야
      [140.46, 37.75], // 후쿠시마
      [140.88, 38.26], // 센다이
      [141.14, 39.7],  // 모리오카
      [140.69, 40.83], // 신아오모리
      [140.65, 41.9],  // 신하코다테호쿠토
    ],
  },
  {
    id: 'hokuriku',
    name: '호쿠리쿠 신칸센 (도쿄~나가노~가나자와~쓰루가)',
    color: '#7C3AED',
    description: '수도권에서 나가노를 거쳐 호쿠리쿠 3현(도야마·이시카와 가나자와·후쿠이 쓰루가)을 잇는 환동해 고속망',
    coords: [
      [139.62, 35.91], // 오미야
      [139.01, 36.32], // 다카사키
      [138.19, 36.64], // 나가노
      [137.21, 36.7],  // 도야마
      [136.65, 36.58], // 가나자와
      [136.22, 36.06], // 후쿠이
      [136.08, 35.64], // 쓰루가
    ],
  },
];

export const HIERARCHY_LEVELS: HierarchyLevel[] = [
  {
    level: 1,
    titleKo: '광역자치단체 · 47개 도도부현',
    titleHanja: '都道府県 (1都 · 1道 · 2府 · 43県)',
    subtitle: '1871년 메이지 유신 폐번치현(廃藩置県)과 1943년 도쿄도제 시행으로 확립된 1급 행정구역',
    koreaComparison: '대한민국의 광역시·도·특별자치시·도와 동급',
    colorClass: 'bg-rose-50',
    borderClass: 'border-rose-400',
    badgeClass: 'bg-rose-600 text-white',
    units: [
      {
        nameKo: '도 (都) · 1곳',
        nameHanja: '東京都',
        description:
          '일본의 수도 도쿄에만 부여된 유일한 행정 단위입니다. 1943년 구 도쿄부(東京府)와 도쿄시(東京市)를 하나로 통합해 출범했으며, 산하에 23개 특별구와 다마 지역 26시·도서부를 거느립니다.',
        example: '도쿄도 (東京都)',
        isSpecial: true,
      },
      {
        nameKo: '도 (道) · 1곳',
        nameHanja: '北海道',
        description:
          '고대 오기칠도(도카이도·산요도 등)의 ‘도(道)’ 명칭을 계승해 1869년 에조치에 신설된 단위입니다. 섬 전체가 단일 광역자치단체이며 산하에 14개 진흥국(구 지청)을 두고 있습니다.',
        example: '홋카이도 (北海道)',
        isSpecial: true,
      },
      {
        nameKo: '부 (府) · 2곳',
        nameHanja: '府 (大阪府·京都府)',
        description:
          '메이지 초기 황도와 대도시권에 설치된 3부(도쿄부·교토부·오사카부) 중 도쿄가 ‘도(都)’로 전환된 뒤 남은 서일본의 역사·경제 양대 핵심 자치단체입니다. 법적 지위는 현(県)과 완전히 동일합니다.',
        example: '오사카부 (大阪府), 교토부 (京都府)',
      },
      {
        nameKo: '현 (県) · 43곳',
        nameHanja: '県 (43개 현)',
        description:
          '일본 광역자치단체의 표준 단위로, 에도 시대의 약 260여 개 번(藩)을 통폐합하여 만들어졌습니다. 각 현에는 행정 중심지인 현청 소재지(県庁所在地)가 있습니다.',
        example: '가나가와현, 아이치현, 후쿠오카현, 오키나와현 등 43곳',
      },
    ],
  },
  {
    level: 2,
    titleKo: '대도시 특례 기초자치단체 · 정령지정도시 & 중핵시',
    titleHanja: '政令指定都市 (20시) · 中核市 (62시) · 特別区 (23구)',
    subtitle: '도도부현 산하에 속하지만 광역자치단체에 준하는 막강한 행정·재정 권한을 위임받은 대도시',
    koreaComparison: '한국의 특례시(수원·고양·용인·창원) 및 서울 자치구에 해당',
    colorClass: 'bg-amber-50',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-600 text-white',
    units: [
      {
        nameKo: '정령지정도시 (政令指定都市) · 20곳',
        nameHanja: '인구 50만 명 이상 법정 대도시',
        description:
          '내각 정령으로 지정된 20개 핵심 대도시입니다. 한국과 달리 광역시로 도도부현에서 분리·독립하지 않고 기존 부·현 소속을 유지한 채, 산하에 행정구(区)를 두고 도도부현의 권한 약 80%를 직접 행사합니다.',
        example: '요코하마·오사카·나고야·삿포로·후쿠오카·교토·고베·센다이·히로시마·구마모토 등 20개 시',
        isSpecial: true,
      },
      {
        nameKo: '도쿄 23특별구 (特別区) · 23곳',
        nameHanja: '구 도쿄시 영역의 자치구',
        description:
          '일반 정령지정도시의 행정구와 달리 구청장과 구의회를 직접 선출하는 완전한 기초자치단체(시와 동급)입니다. 상하수도·소방 등 대도시 광역 사무만 도쿄도가 통합 관장합니다.',
        example: '신주쿠구, 시부야구, 미나토구, 지요다구, 주오구 등 23구 (인구 합계 약 980만 명)',
        isSpecial: true,
      },
      {
        nameKo: '중핵시 (中核市) · 62곳',
        nameHanja: '인구 20만 명 이상 지방 거점 도시',
        description:
          '정령지정도시 다음가는 규모의 지방 중심 도시로, 보건소 설치·복지·환경·도시계획 등 상당수 광역 사무를 도도부현으로부터 이양받아 처리합니다.',
        example: '가나자와시, 도야마시, 마쓰야마시, 가고시마시, 나가사키시, 나하시 등 62개 시',
      },
    ],
  },
  {
    level: 3,
    titleKo: '일반 기초자치단체 · 시정촌 (市町村)',
    titleHanja: '市 (시) · 町 (정/마치·초) · 村 (촌/무라·손)',
    subtitle: '주민 생활 밀착 행정을 담당하는 약 1,700여 개 기초자치단체 (헤이세이 대합병으로 대폭 통합)',
    koreaComparison: '한국의 일반 시(市) · 군(郡) · 읍·면 자치단위',
    colorClass: 'bg-blue-50',
    borderClass: 'border-blue-400',
    badgeClass: 'bg-blue-600 text-white',
    units: [
      {
        nameKo: '일반 시 (市)',
        nameHanja: '인구 5만 명 이상 도시',
        description:
          '원칙적으로 인구 5만 명 이상, 도시적 형태를 갖춘 기초자치단체입니다. 1999~2010년 ‘헤이세이 대합병’을 통해 주변 정·촌을 통합한 시가 크게 늘어났습니다.',
        example: '가마쿠라시, 이세시, 벳푸시, 다자이후시, 오타루시 등',
      },
      {
        nameKo: '정 (町: 마치/초) & 촌 (村: 무라/손)',
        nameHanja: '군(郡) 소속의 소규모 자치단체',
        description:
          '지리적 구분인 군(郡) 아래에 속하지만, 군(郡) 자체에는 행정권이 없고 정(町)과 촌(村)이 각각 독립된 시장(정장·촌장)과 의회를 가진 완전한 기초자치단체입니다.',
        example: '하코네정(가나가와), 유후인(구 유후인정·현 유후시), 시라카와촌(기후현 합장촌) 등',
      },
    ],
  },
];

export const OLD_PROVINCE_MAPPINGS: OldProvinceMapping[] = [
  {
    circuitKo: '사이카이도 (규슈)',
    oldNameKo: '사쓰마국 · 오스미국',
    oldNameHanja: '薩摩国 · 大隅国',
    shortAlias: '사쓰마 (薩州)',
    modernPrefId: 'kagoshima',
    modernPrefKo: '가고시마현',
    historicalSignificance:
      '시마즈 가문(77만 석)의 본거지이자 사이고 다카모리·오쿠보 도시미치를 배출해 메이지 유신을 이끈 제1의 웅번(雄藩). ‘삿초동맹’의 ‘삿(薩)’이 바로 사쓰마입니다.',
  },
  {
    circuitKo: '산요도 (주고쿠)',
    oldNameKo: '나가토국 · 스오국',
    oldNameHanja: '長門国 · 周防国',
    shortAlias: '조슈 (長州)',
    modernPrefId: 'yamaguchi',
    modernPrefKo: '야마구치현',
    historicalSignificance:
      '모리 가문(36만 석)의 조슈번 영역. 요시다 쇼인의 쇼카손주쿠에서 이토 히로부미·기도 다카요시·야마가타 아리토모 등이 배출되어 근대 일본 내각을 장악했습니다.',
  },
  {
    circuitKo: '난카이도 (시코쿠)',
    oldNameKo: '도사국',
    oldNameHanja: '土佐国',
    shortAlias: '도사 (土州)',
    modernPrefId: 'kochi',
    modernPrefKo: '고치현',
    historicalSignificance:
      '야마우치 가문의 도사번 영역. 사카모토 료마가 삿초동맹과 대정봉환(막부 권력 반환)을 성사시켰고, 이타가키 다이스케가 자유민권운동을 일으킨 곳입니다.',
  },
  {
    circuitKo: '사이카이도 (규슈)',
    oldNameKo: '히젠국',
    oldNameHanja: '肥前国',
    shortAlias: '히젠 (肥州)',
    modernPrefId: 'saga',
    modernPrefKo: '사가현 · 나가사키현',
    historicalSignificance:
      '나베시마 가문의 사가번(히젠번) 영역. 네덜란드 난학(蘭学)과 반사로·증기선 기술을 가장 먼저 수용해 ‘삿초토비(薩長土肥)’ 4대 웅번의 일익을 담당하고 오쿠마 시게노부를 배출했습니다.',
  },
  {
    circuitKo: '도카이도 (주부)',
    oldNameKo: '오와리국 · 미카와국',
    oldNameHanja: '尾張国 · 三河国',
    shortAlias: '오와리·미카와 (尾州·三州)',
    modernPrefId: 'aichi',
    modernPrefKo: '아이치현',
    historicalSignificance:
      '서부 오와리(나고야)는 오다 노부나가·도요토미 히데요시의 고향이자 도쿠가와 고산케 필두 오와리번의 땅이고, 동부 미카와(오카자키·도요타)는 도쿠가와 이에야스와 가신단의 발상지입니다.',
  },
  {
    circuitKo: '호쿠리쿠도 (주부)',
    oldNameKo: '가가국 · 노토국',
    oldNameHanja: '加賀国 · 能登国',
    shortAlias: '가가 (加州)',
    modernPrefId: 'ishikawa',
    modernPrefKo: '이시카와현',
    historicalSignificance:
      '마에다 도시이에 가문이 다스린 ‘가가 100만 석(加賀百万石)’ 가가번의 중심지로, 에도 막부 아래 외양(도자마) 다이묘 중 최대의 경제력과 금박·전통 공예 문화를 자랑했습니다.',
  },
  {
    circuitKo: '도산도 (도호쿠)',
    oldNameKo: '무쓰국 (오슈)',
    oldNameHanja: '陸奥国 (奥州)',
    shortAlias: '무쓰·오슈 (奥州)',
    modernPrefId: 'miyagi',
    modernPrefKo: '미야기·후쿠시마·이와테·아오모리현',
    historicalSignificance:
      '도호쿠 태평양 연안 전체를 아우르던 광대한 옛 구니로, ‘독안룡’ 다테 마사무네의 센다이번(62만 석)과 충절의 대명사 아이즈번(후쿠시마현 서부)이 자리했습니다.',
  },
  {
    circuitKo: '도카이도 (간토)',
    oldNameKo: '무사시국 · 사가미국',
    oldNameHanja: '武蔵国 · 相模国',
    shortAlias: '무사시·사가미 (武州·相州)',
    modernPrefId: 'tokyo',
    modernPrefKo: '도쿄도 · 사이타마현 · 가나가와현',
    historicalSignificance:
      '무사시국은 에도(도쿄)·사이타마·요코하마 북부를 아우르던 간토 최대의 구니이며, 사가미국은 가마쿠라 막부와 오다와라 고호조씨의 본거지(현 가나가와현 중서부)입니다.',
  },
  {
    circuitKo: '기나이 (긴키)',
    oldNameKo: '야마시로국 · 야마토국 · 셋쓰국',
    oldNameHanja: '山城国 · 大和国 · 摂津国',
    shortAlias: '기나이 5국 (畿内)',
    modernPrefId: 'kyoto',
    modernPrefKo: '교토부 · 나라현 · 오사카부 · 효고현 동부',
    historicalSignificance:
      '천황 직할 수도권인 기나이(畿内)의 핵심으로, 야마시로는 헤이안쿄(교토), 야마토는 아스카·헤이조쿄(나라), 셋쓰는 오사카·고베에 해당합니다.',
  },
  {
    circuitKo: '도산도 (주부)',
    oldNameKo: '가이국 · 시나노국 · 에치고국',
    oldNameHanja: '甲斐国 · 信濃国 · 越後国',
    shortAlias: '가이·시나노·에치고 (甲信越)',
    modernPrefId: 'yamanashi',
    modernPrefKo: '야마나시현 · 나가노현 · 니가타현',
    historicalSignificance:
      '‘가이의 호랑이’ 다케다 신겐(야마나시)과 ‘에치고의 용’ 우에스기 겐신(니가타)이 시나노(나가노 가와나카지마)에서 다섯 차례 격돌한 전국시대 최고의 라이벌 무대입니다.',
  },
];
