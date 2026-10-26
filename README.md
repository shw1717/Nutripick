<div align="center">

# 💊 NutriPick

### 생활패턴과 식습관으로 찾는 나의 영양제

건강 고민을 직접 고르는 대신, **누구나 답할 수 있는 생활패턴·식습관**을 선택하면<br/>
고민 카테고리를 자동으로 분류해 영양제를 추천하는 **멀티페이지(MPA) 웹사이트**입니다.

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jquery&logoColor=white"/>
<img src="https://img.shields.io/badge/localStorage-1B2A4A?style=flat-square"/>

**[🔗 Live Demo](https://shw1717.github.io/NutriPick/)**

<img src="assets/screenshots/main.png" width="90%"/>

</div>

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|---|---|
| **구분** | 웹 프로그래밍 최종 프로젝트 · 팀 (3인) |
| **팀원** | 노건우 · 송현우 · 양진희 |
| **내 역할** | (담당한 부분을 입력하세요) |
| **목표** | 한 학기 동안 배운 HTML · CSS · JS · DOM 조작을 하나의 완성된 서비스로 통합 |
| **특징** | 백엔드 없이 **localStorage**만으로 회원 · 장바구니 · 주문 · 후기까지 동작 |

### 💡 핵심 아이디어 — 고민이 아닌 '생활'을 묻습니다

보통의 추천 서비스는 *"어떤 고민이 있나요?"* 로 시작합니다.<br/>
하지만 영양제를 처음 사는 사람은 자기에게 무엇이 필요한지 모릅니다.

```
① 선택                    ② 자동 분류                 ③ 추천
수면 · 운동 · 햇빛 · 식사   →  19개 항목을 7개 고민       →  고민 · 태그 일치도로
누구나 답할 수 있는 항목       카테고리로 자동 분류            점수를 매겨 상위 3개 추천
```

---

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🧾 **생활패턴 · 식습관 설문** | 생활패턴 10개 + 식습관 9개 항목 체크 (data.js 옵션 배열을 `map`으로 자동 생성) |
| 🏷 **고민 카테고리 자동 분류** | 선택값을 체력/피로 · 실내/햇빛 · 눈 건강 · 장/식사 · 뼈/미네랄 · 혈행/지방산 · 면역/항산화 7개 유형으로 분류 |
| 🎯 **추천 점수 계산** | 생활패턴 · 식습관 · 카테고리 일치 개수를 합산해 상위 3개 추천, 일치한 태그는 강조 표시 |
| 🛒 **장바구니 · 결제** | 사용자별 장바구니 → 결제 확인 모달 → 주문 저장 |
| 👤 **회원 시스템** | 회원가입 · 로그인 · 로그아웃, 비로그인 시 장바구니 · 후기 작성 제한 |
| 📝 **후기 게시판** | 별점과 함께 후기 등록 · 조회, 마이페이지에서 내 후기 · 결제 내역 확인 |

---

## 🖥 화면 구성

<table>
<tr>
<th>생활패턴 · 식습관 설문</th>
<th>맞춤 추천 결과</th>
</tr>
<tr>
<td><img src="assets/screenshots/survey.png"/></td>
<td><img src="assets/screenshots/recommend.png"/></td>
</tr>
<tr>
<th colspan="2">영양제 전체 목록</th>
</tr>
<tr>
<td colspan="2" align="center"><img src="assets/screenshots/products.png" width="60%"/></td>
</tr>
</table>

---

## 🏗 아키텍처

### MPA 구조 — 페이지마다 역할 하나씩

```
NutriPick/
├── html/                 # 11개 페이지
│   ├── index.html        # 메인 · 베스트셀러
│   ├── survey.html       # 생활 · 식습관 설문
│   ├── recommend.html    # 고민 분류 + 추천 결과
│   ├── products.html     # 전체 영양제 목록
│   ├── cart.html         # 장바구니 · 결제
│   ├── board.html        # 후기 게시판
│   ├── write-review.html # 후기 작성
│   ├── login.html · signup.html
│   ├── mypage.html       # 결제 내역 · 내 후기
│   └── about.html        # 서비스 소개
├── JavaScript/
│   ├── data.js           # 고민 카테고리 · 설문 옵션 · 영양제 데이터
│   ├── common.js         # 상품 카드 생성 · 장바구니 · 헤더/푸터 로드
│   ├── auth.js           # 회원가입 · 로그인 · 사용자별 주문
│   └── (페이지별 스크립트)
├── CSS/                  # style.css + 페이지별 CSS
├── header-footer/        # 공통 header · footer (jQuery load()로 삽입)
└── images/
```

### 페이지 흐름 · 데이터 전달

페이지가 바뀌어도 **localStorage가 '다리' 역할**을 해서 데이터가 이어집니다.

```
[추천 흐름]
index ──▶ survey ──(선택값 저장)──▶ localStorage ──▶ recommend ──▶ products

[회원 · 커머스 흐름]
login ──▶ cart ──▶ 결제 확인 모달 ──(주문 저장)──▶ mypage
           └─ nutriCart_{userId}          └─ nutriOrders_{userId}
```

### 데이터 설계 — 하나의 객체 배열로 추천과 카드 출력을 모두 처리

```js
{
  id: 3, name: "비타민 D", category: "비타민",
  matchCategories: ["indoor", "bone"],   // 고민 카테고리
  lifestyle: ["실내생활", "햇빛부족"],      // 생활패턴 태그
  diet: ["유제품부족"],                    // 식습관 태그
  price: 12000, image: "../images/vitamin_d.jpg"
}
```

| 영양제 제품 | 고민 카테고리 | 설문 항목 |
|:---:|:---:|:---:|
| **12개** | **7개** | **19개** (생활 10 + 식습관 9) |

---

## 🧠 추천 로직

### ① 고민 카테고리 자동 분류

카테고리마다 키워드를 두고, **사용자가 고른 항목과 겹치는 개수**를 점수로 매깁니다.

```js
Object.entries(concernCategories)
  .map(([key, category]) => {
    const score = category.keywords.filter((k) => selectedAll.includes(k)).length;
    return { key, ...category, score };
  })
  .filter((c) => c.score > 0)          // 관련 없는 카테고리 제외
  .sort((a, b) => b.score - a.score);  // 1위가 대표 고민
```

### ② 추천 점수 계산 · 정렬

```js
score = lifestyleScore + dietScore + categoryScore;

supplements
  .filter((item) => item.score > 0)
  .sort((a, b) => b.score - a.score || a.price - b.price)  // 동점이면 저가 우선
  .slice(0, MAX_RESULTS);                                   // 상위 3개
```

---

## ▶️ 실행 방법

헤더/푸터를 jQuery `load()`로 불러오기 때문에 **파일을 더블클릭해서 열면(file://) 헤더가 보이지 않습니다.** 로컬 서버로 실행해 주세요.

```bash
# 방법 1) VS Code Live Server 확장으로 html/index.html 열기

# 방법 2) Python 내장 서버
python -m http.server 8000
# → http://localhost:8000/html/index.html
```

---

## ⚠️ 한계와 개선점

- **보안:** 학습용으로 회원 정보(비밀번호 포함)를 localStorage에 평문 저장합니다. 실제 서비스라면 서버에서 비밀번호를 해시(bcrypt 등)로 저장하고 세션/토큰으로 인증해야 합니다.
- **데이터 유지:** localStorage는 브라우저별로 저장되어 다른 기기에서는 데이터가 이어지지 않습니다.
- **추천 방식:** 규칙 기반 점수 계산이라 사용자 맥락(나이 · 복용 중인 영양제 등)을 반영하지 못합니다.

## 🚀 확장 방향

| 방향 | 내용 |
|---|---|
| **AI API 연동** | 자연어 · 음성으로 생활습관 입력 → 키워드 분류 + 추천 이유 자동 생성 |
| **OCR 인식** | 복용 중인 영양제 사진을 읽어 중복 성분 자동 필터링 |
| **예산 · 제형 반영** | 가격대 · 복용 횟수 · 제형(알약/젤리) 선호를 추천 조건에 추가 |
| **FastAPI + DB** | 회원 · 주문 · 추천 히스토리를 백엔드로 이전 |

> 처음부터 데이터를 **태그 기반으로 설계**해 두어, 핵심 구조를 유지한 채 AI 기반 추천으로 확장할 수 있습니다.

---

## 📝 배운 점

- 페이지 역할을 나누는 **MPA 설계**와 폴더 · 경로 구조를 직접 경험했습니다.
- **배열 고차함수(map · filter · sort)** 로 추천 점수 계산과 정렬을 구현했습니다.
- **localStorage**로 인증 · 장바구니 · 주문 · 후기까지 페이지 간 데이터를 전달했습니다.
- 규칙 기반에서 AI 기반으로 확장하려면 **데이터 설계가 가장 중요**하다는 것을 체감했습니다.

📄 초기 기획 문서: [docs/PLANNING.md](docs/PLANNING.md)

<div align="center">
<br/>
<sub>※ 의료 진단이 아닌 생활패턴 · 식습관 기반의 학습용 추천 서비스입니다.</sub>
</div>
