# GAME DB

## 프로젝트 소개

RAWG API를 활용해 다양한 게임 데이터를 검색하고 탐색할 수 있는 웹 서비스를 개발했습니다.

## 기능 시연

<img src="src/assets/gamelist.gif" alt="게임 리스트 조회" width="600">

<br />

<img src="src/assets/search.gif" alt="검색 기능" width="600">

## 폴더 구조

```
src/
├── api/ # API 관련 로직
├── app/ # Next.js App Router 페이지
│ ├── page.tsx
│ ├── games/
│ │ ├── page.tsx
│ │ └── [slug]/
│ ├── discover/
│ │ ├── all-time-top/
│ │ └── best-of-the-year/
│ └── search/
├── assets/ # 정적 자산 (아이콘, 이미지)
├── components/ # 재사용 가능한 컴포넌트
│ ├── common/
│ ├── game/
│ ├── search/
│ └── layout/
├── hooks/ # 커스텀 훅
├── lib/ # 라이브러리 설정
├── types/ # TypeScript 타입 정의
└── utils/ # 유틸리티 함수
```

## 🛠 기술 스택

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **Axios**
- **Vercel**
- **RAWG API**
