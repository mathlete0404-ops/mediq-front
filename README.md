# Front

## Project Introduction



## Overview

<table>

  <!-- 홈 / Home -->
  <tr>
    <th align="center">홈</th>
    <th align="center">Home</th>
  </tr>
  <tr>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/c1712567-17b7-41ee-b3e1-76e53c6df62e"
        alt="Korean Home"
        width="520"
      />
    </td>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/ae8eb9b4-4f24-4a97-bf5d-adbe816462e4"
        alt="English Home"
        width="520"
      />
    </td>
  </tr>

  <!-- 소개 / Introduction -->
  <tr>
    <th align="center">소개</th>
    <th align="center">Introduction</th>
  </tr>
  <tr>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/aee521aa-c18b-47eb-8eae-1e3348372dba"
        alt="Korean Introduction"
        width="520"
      />
    </td>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/d1d7b610-cbe8-47a6-b6c4-4a5a00ec2497"
        alt="English Introduction"
        width="520"
      />
    </td>
  </tr>
  <tr>
    <th align="center">새 채팅</th>
    <th align="center">New Chat</th>
  </tr>
  <tr>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/f6a21ef9-cf76-43a1-a412-91b20542d1f2"
        alt="Korean screenshot"
        width="520"
      />
    </td>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/08cc621e-6ba9-462b-ad9c-6fc33cd787b9"
        alt="English screenshot"
        width="520"
      />
    </td>
  </tr>
</table>


## Tech Stack
<img width="345" height="105" alt="Image" src="https://github.com/user-attachments/assets/1127b4eb-d3ae-4e05-af93-5a2678afa68d" />

## Project Introduction
MedIQ는 사용자가 입력한 증상 정보를 바탕으로 가장 적합한 진료과를 추천하고, 현재 위치 기준으로 신뢰도 높은 병원과 이동 경로를 안내하는 AI 기반 의료 네비게이션 웹 서비스입니다. 일상 속에서 갑작스러운 통증이나 불편함을 느꼈을 때, 많은 사람들은 “이 증상은 어느 과로 가야 하지?”, “근처에 믿을 수 있는 병원이 있을까?”, “응급 상황인지 아닌지 판단이 어렵다”와 같은 고민을 하게 됩니다. 특히 의료 지식이 부족한 일반 사용자나 외국인, 유학생의 경우 이러한 문제는 더욱 크게 다가옵니다. MedIQ는 이러한 현실적인 불편함에서 출발하여, 의료 접근성을 높이고 사용자의 의사결정을 돕는 것을 목표로 설계되었습니다.

본 서비스는 AI를 활용해 사용자가 자유롭게 입력한 증상 또는 구조화된 증상 템플릿을 분석하고, 이를 기반으로 적절한 진료과를 도출합니다. 이후 사용자의 위치 정보를 활용하여 대학병원, 유명 병원, 인근 병·의원 등을 구분하여 추천하며, Kakao Map API를 연동해 실제 지도에서 병원의 위치와 이동 경로를 직관적으로 확인할 수 있도록 구성하였습니다. 또한 병원별 전문 분야, 거리, 선택 여부 등을 고려한 인터페이스를 제공하여 사용자가 여러 병원을 비교·선택할 수 있도록 지원합니다. 단순한 검색 결과 나열이 아닌, 상황에 맞는 의료 선택을 단계적으로 안내하는 것이 MedIQ의 핵심 가치입니다.

MedIQ는 사용자 경험을 중요하게 고려하여 한국어와 영어를 모두 지원하는 다국어 환경, 라이트/다크 테마 전환, 반응형 UI 등 현대적인 웹 서비스 요소를 적극적으로 반영하였습니다. 프론트엔드에서는 React 기반 컴포넌트 구조를 활용하여 가독성과 확장성을 높였으며, 백엔드에서는 외부 지도 및 위치 API와 연동하여 실시간 데이터를 처리합니다. 본 프로젝트는 단순한 기능 구현을 넘어, 실제 사용자가 의료 서비스를 더 쉽고 빠르게 이용할 수 있도록 돕는 실용적인 문제 해결형 프로젝트로서의 의미를 갖습니다.

## Project Duration
본 프로젝트 MedIQ는 **2024년 10월부터 2025년 1월까지** 약 4개월간 진행되었습니다.  
아이디어 기획 단계부터 UI/UX 설계, 프론트엔드·백엔드 개발, AI 연동, 지도 API 통합까지 전 과정을 단독으로 수행하였습니다.  
단기간 내에 실제 사용 가능한 의료 네비게이션 서비스를 구현하는 것을 목표로 하여, 기능 구현뿐만 아니라 사용자 경험과 실사용 시나리오를 중심으로 지속적인 개선과 리팩토링을 진행하였습니다.

## Start Guide

### Step 0) 준비물

* Node.js (권장: **v18+ / v20+**)
* npm 또는 pnpm (아래는 npm 기준)
* Git
* (선택) Python 3.10+ (Groq 백엔드 쓸 경우)

---

## 1) Frontend 실행 (mediq-front)

### Step 1) 프로젝트 클론 & 이동

```bash
git clone <YOUR_REPO_URL>
cd mediq-front
```

### Step 2) 패키지 설치

```bash
npm install
```

### Step 3) 환경변수 설정 (.env.local)

`mediq-front` 폴더에 `.env.local` 만들고 아래처럼 넣어.

```env
# Kakao REST API Key (서버에서 사용)
KAKAO_REST_API_KEY=YOUR_KAKAO_REST_API_KEY

# (선택) Groq 백엔드 URL을 프론트에서 호출할 때
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

> ✅ **Kakao 키는 반드시 REST API 키**를 사용하고, **.env.local**에 넣어야 해.
> 프론트 코드에 직접 하드코딩하면 노출됨.

### Step 4) 개발 서버 실행

```bash
npm run dev
```

* 브라우저에서: `http://localhost:3000`

---

## 2) Kakao API 설정 (필수)

### ✅ 필요한 Kakao API (MedIQ에서 쓰는 것)

MedIQ가 “주변 병원 검색 + 좌표(geocode)”를 하려면 보통 아래가 필요해:

1. **Kakao Local API (REST)**

* 키워드로 병원 검색: `local/search/keyword`
* 주소/키워드 좌표화(지오코딩): `local/search/address` 또는 키워드 검색 기반 좌표 추출

2. **(선택) Kakao Maps JavaScript SDK**

* 지도 UI를 프론트에서 렌더링할 때 사용
* (너는 지금 프론트 지도 구현도 하니까 보통 함께 씀)

---

## 3) Kakao API Key 발급 & 적용 (필수)

### Step 1) Kakao Developers에서 앱 생성

* Kakao Developers → **내 애플리케이션** → **애플리케이션 추가하기**

### Step 2) REST API Key 확인

* 앱 선택 → **앱 키** 메뉴 → **REST API 키** 복사

### Step 3) `.env.local`에 추가

```env
KAKAO_REST_API_KEY=복사한키
```

### Step 4) (지도 SDK 쓸 경우) JavaScript Key도 확인

* 똑같이 **앱 키** 메뉴에서 JavaScript 키 확인 가능

### Step 5) 플랫폼 등록 (중요)

* 앱 설정 → **플랫폼** → Web 등록
* `http://localhost:3000` 추가
* 배포 도메인도 추가해야 배포시 정상작동

---

## 4) MedIQ Kakao API Routes (필수)

현재 너가 쓰는 구조상 프론트에서 호출하는 API는 대략 이런 형태야:

* `/api/kakao/search?lat=...&lng=...&specialty=...`
* `/api/kakao/geocode?q=...`

### ✅ 체크포인트

* `mediq-front` 안에 **Next.js API route**로 존재해야 함
  예:

  * `src/pages/api/kakao/search.js`
  * `src/pages/api/kakao/geocode.js`
    (또는 app router이면 `src/app/api/kakao/.../route.js`)

* `.env.local`에 `KAKAO_REST_API_KEY`가 있어야 함

---

## 5) Backend (Groq) 실행 (선택: mediq-back)

Groq 백엔드를 실제로 쓰는 경우에만 필요.

### Step 1) 이동

```bash
cd ../mediq-back
```

### Step 2) 가상환경 생성 (권장)

```bash
python -m venv .venv
source .venv/bin/activate
```

### Step 3) 설치

```bash
pip install -r requirements.txt
```

### Step 4) 환경변수 (.env)

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

### Step 5) 실행

> 파일명이 `groq.py` 라면 충돌 가능성이 있어. (groq 라이브러리랑 이름 겹침)
> **권장 파일명: `main.py`**

예: `main.py`에 `app = FastAPI()`가 있을 때:

```bash
uvicorn main:app --reload
```

---

# Required APIs / Services

## ✅ Must-have

* **Kakao Local REST API**

  * Nearby hospital search (Keyword Search)
  * Geocode (Address Search or Keyword-based)
* **(If you show an actual map UI)** Kakao Maps JavaScript SDK

## ✅ Optional (If AI runs on backend)

* **Groq API** (FastAPI + Groq)

## ✅ base44 관련

* base44의 `InvokeLLM`을 쓰는 구조면:

  * API key를 프론트에 안 넣어도 됨 (플랫폼에서 관리)
  * 모델 선택도 base44 설정에서 변경됨

---

# Recommended VS Code Extensions

### Frontend (React / Next.js)

* **ESLint**
* **Prettier**
* **Tailwind CSS IntelliSense**
* **JavaScript and TypeScript Nightly** (선택)
* **Error Lens** (선택)

### Backend (Python / FastAPI)

* **Python**
* **Pylance**
* **dotenv** (선택)

### Git / README

* **GitLens**
* **Markdown Preview Enhanced** (선택)

---

# Troubleshooting (자주 터지는 것만)

### 1) `npm run dev` 했는데 package.json 못 찾는 오류

✅ 현재 폴더가 프로젝트 폴더인지 확인

```bash
pwd
ls
```

`package.json` 보이는 위치에서 실행해야 함.

---

### 2) Kakao API 401/403

* REST API 키가 맞는지
* `.env.local` 위치가 `mediq-front` 안이 맞는지
* 플랫폼(Web) 등록에 `localhost:3000` 등록했는지

---

### 3) `/api/kakao/geocode` 404

* 해당 API route 파일이 실제로 존재하는지
* 경로가 app router인지 pages router인지 확인 필요



