// NutriPick 추천 데이터(JSON 객체 배열)
// 추천 기준: 1순위 생활 패턴 + 2순위 식습관 사용
const concernCategories = {
  energy: {
    title: "체력/피로 관리형",
    description:
      "수면 부족, 아침 결식, 카페인 의존처럼 에너지 리듬이 흔들리는 패턴입니다.",
    keywords: [
      "수면부족",
      "카페인과다",
      "아침결식",
      "불규칙식사",
      "스트레스많음",
    ],
  },
  indoor: {
    title: "실내생활/햇빛부족형",
    description:
      "실내 활동이 많고 햇빛 노출이 적어 기본 영양 균형 관리가 필요한 패턴입니다.",
    keywords: ["실내생활", "햇빛부족", "운동부족"],
  },
  screen: {
    title: "눈 건강 관리형",
    description:
      "컴퓨터나 스마트폰 사용 시간이 길어 눈 피로와 집중 관리 니즈가 있는 패턴입니다.",
    keywords: ["화면사용많음", "앉아있는시간많음"],
  },
  gut: {
    title: "장/식사 균형 관리형",
    description:
      "채소 섭취 부족, 배달 음식, 불규칙한 식사처럼 장과 식사 균형 관리가 필요한 패턴입니다.",
    keywords: ["채소부족", "배달많음", "불규칙식사", "과일부족"],
  },
  bone: {
    title: "뼈/미네랄 관리형",
    description:
      "유제품 섭취가 적거나 운동량이 부족해 칼슘과 미네랄 관리 관심이 높은 패턴입니다.",
    keywords: ["유제품부족", "운동부족", "햇빛부족"],
  },
  omega: {
    title: "혈행/지방산 균형형",
    description:
      "생선 섭취가 적고 기름진 식사가 많아 지방산 균형 관리가 필요한 패턴입니다.",
    keywords: ["생선부족", "기름진식사", "배달많음"],
  },
  immune: {
    title: "면역/항산화 관리형",
    description:
      "흡연·음주·스트레스나 과일 섭취 부족처럼 항산화·면역 균형 관리가 필요한 패턴입니다.",
    keywords: ["흡연", "음주잦음", "스트레스많음", "과일부족"],
  },
};

const lifestyleOptions = [
  { value: "수면부족", label: "평균 수면 6시간 이하" },
  { value: "실내생활", label: "실내 생활이 많음" },
  { value: "화면사용많음", label: "컴퓨터/스마트폰 사용이 많음" },
  { value: "운동부족", label: "운동을 거의 하지 않음" },
  { value: "카페인과다", label: "카페인을 하루 3잔 이상 마심" },
  { value: "앉아있는시간많음", label: "하루 8시간 이상 앉아 있음" },
  { value: "햇빛부족", label: "낮에 햇빛을 거의 못 봄" },
  { value: "흡연", label: "흡연을 함" },
  { value: "음주잦음", label: "주 2회 이상 음주함" },
  { value: "스트레스많음", label: "스트레스를 자주 받음" },
];

const dietOptions = [
  { value: "생선부족", label: "생선을 자주 먹지 않음" },
  { value: "채소부족", label: "채소 섭취가 적음" },
  { value: "유제품부족", label: "우유/요거트 등 유제품 섭취가 적음" },
  { value: "아침결식", label: "아침을 자주 거름" },
  { value: "배달많음", label: "배달/외식이 많음" },
  { value: "기름진식사", label: "기름지거나 튀긴 음식을 자주 먹음" },
  { value: "불규칙식사", label: "식사 시간이 불규칙함" },
  { value: "과일부족", label: "과일을 자주 먹지 않음" },
  { value: "단음식많음", label: "단 음식·디저트를 자주 먹음" },
];

// 카테고리별(비타민 → 미네랄 → 지방산 → 유산균 → 눈 건강 → 종합비타민)로 묶고
// 각 카테고리 안에서는 가나다순 정렬
const supplements = [
  // --- 비타민 ---
  {
    id: 1,
    name: "비타민 B",
    category: "비타민",
    matchCategories: ["energy", "gut"],
    lifestyle: ["수면부족", "카페인과다", "스트레스많음"],
    diet: ["아침결식", "불규칙식사", "채소부족", "단음식많음"],
    price: 16000,
    description:
      "아침 결식과 불규칙한 식사가 잦은 체력 관리형 사용자에게 어울리는 제품군입니다.",
    image: "../images/vitaminb.jpg",
  },
  {
    id: 2,
    name: "비타민 C",
    category: "비타민",
    matchCategories: ["energy", "gut", "immune"],
    lifestyle: ["수면부족", "카페인과다", "흡연", "스트레스많음"],
    diet: ["채소부족", "불규칙식사", "과일부족"],
    price: 13000,
    description:
      "채소·과일 섭취가 적거나 흡연·스트레스가 잦은 사용자에게 항산화 균형 관점으로 추천 근거를 만들기 좋은 비타민입니다.",
    image: "../images/vitamin_c.jpg",
  },
  {
    id: 3,
    name: "비타민 D",
    category: "비타민",
    matchCategories: ["indoor", "bone"],
    lifestyle: ["실내생활", "운동부족", "햇빛부족"],
    diet: ["유제품부족"],
    price: 12000,
    description:
      "실내 생활과 햇빛 노출 부족 패턴에서 관리 필요도가 높은 기본 영양소입니다.",
    image: "../images/vitamin_d.jpg",
  },
  {
    id: 4,
    name: "비타민 E",
    category: "비타민",
    matchCategories: ["omega", "immune"],
    lifestyle: ["흡연"],
    diet: ["생선부족", "기름진식사", "배달많음", "과일부족"],
    price: 14000,
    description:
      "생선 섭취가 적고 기름진 식사나 배달·외식이 잦은 식습관에서 지방산·항산화 균형 관리 관점으로 제안하기 좋은 비타민입니다.",
    image: "../images/vitamine.png",
  },

  // --- 미네랄 ---
  {
    id: 5,
    name: "마그네슘",
    category: "미네랄",
    matchCategories: ["energy", "bone"],
    lifestyle: [
      "수면부족",
      "카페인과다",
      "운동부족",
      "스트레스많음",
      "음주잦음",
    ],
    diet: ["불규칙식사", "단음식많음"],
    price: 15000,
    description:
      "수면 부족, 카페인 섭취, 스트레스나 음주가 잦은 패턴에서 함께 제안하기 좋은 미네랄입니다.",
    image: "../images/magnesium.jpg",
  },
  {
    id: 6,
    name: "아연",
    category: "미네랄",
    matchCategories: ["gut", "energy", "immune"],
    lifestyle: ["수면부족"],
    diet: ["채소부족", "배달많음", "불규칙식사", "과일부족"],
    price: 14000,
    description:
      "채소·과일 섭취가 적고 배달·외식이 잦거나 식사가 불규칙한 식습관에서 면역·균형 관리 관점으로 제안하기 좋은 미네랄입니다.",
    image: "../images/zinc.jpg",
  },
  {
    id: 7,
    name: "철분",
    category: "미네랄",
    matchCategories: ["energy", "gut"],
    lifestyle: ["수면부족"],
    diet: ["아침결식", "채소부족", "불규칙식사"],
    price: 15000,
    description:
      "아침을 자주 거르고 채소 섭취가 적거나 식사가 불규칙한 체력 관리형 사용자에게 추천 근거를 만들기 좋은 미네랄입니다.",
    image: "../images/iron.jpg",
  },
  {
    id: 8,
    name: "칼슘",
    category: "미네랄",
    matchCategories: ["bone"],
    lifestyle: ["운동부족", "실내생활", "햇빛부족"],
    diet: ["유제품부족"],
    price: 17000,
    description:
      "유제품 섭취가 적거나 운동량이 부족한 사용자에게 뼈/미네랄 관리 관점으로 제안할 수 있습니다.",
    image: "../images/calcium.jpg",
  },

  // --- 지방산 ---
  {
    id: 9,
    name: "오메가-3",
    category: "지방산",
    matchCategories: ["omega", "screen"],
    lifestyle: ["화면사용많음", "앉아있는시간많음"],
    diet: ["생선부족", "기름진식사", "배달많음"],
    price: 18000,
    description:
      "생선 섭취가 적거나 기름진 식사가 잦은 사람에게 추천 근거를 만들기 좋은 영양소입니다.",
    image: "../images/omega3.jpg",
  },

  // --- 유산균 ---
  {
    id: 10,
    name: "프로바이오틱스",
    category: "유산균",
    matchCategories: ["gut"],
    lifestyle: ["앉아있는시간많음"],
    diet: ["채소부족", "배달많음", "불규칙식사"],
    price: 22000,
    description:
      "채소 섭취가 적고 배달/외식이 잦은 식습관에서 장 관리 제품으로 추천하기 좋습니다.",
    image: "../images/probiotics.jpg",
  },

  // --- 눈 건강 ---
  {
    id: 11,
    name: "루테인",
    category: "눈 건강",
    matchCategories: ["screen"],
    lifestyle: ["화면사용많음", "앉아있는시간많음"],
    diet: [],
    price: 19000,
    description:
      "화면 사용 시간이 긴 눈 건강 관리형 사용자에게 추천 근거가 명확한 제품군입니다.",
    image: "../images/lutein.jpg",
  },

  // --- 종합비타민 ---
  {
    id: 12,
    name: "종합비타민",
    category: "종합비타민",
    matchCategories: ["indoor", "energy", "immune"],
    lifestyle: ["실내생활", "운동부족", "햇빛부족"],
    diet: ["아침결식"],
    price: 21000,
    description:
      "실내 생활이 많고 운동이 부족하거나 아침을 자주 거르는 입문자에게 기본 영양 균형 관점으로 제안하기 좋은 종합 영양제입니다.",
    image: "../images/multivitamin.png",
  },
];
