# GAME DB

### 프로젝트 소개

GAME DB는 RAWG API를 기반으로 구축된 게임 정보 플랫폼입니다. 사용자들이 인기 있는 게임들을 탐색하고, 상세 정보를 확인할 수 있도록 설계되었습니다.

## 🎮 기능 구현

- **New and Trending**: 최신 트렌딩 게임 목록
- **Best of the Year**: 올해 최고의 게임
- **All-time Top 250**: 올타임 베스트 250 게임
- **All Games**: 전체 게임 목록 조회

### 게임 상세 정보

- 게임별 상세 페이지
- 게임 설명, 평점, 플랫폼, 장르 정보
- 게임 스크린샷 갤러리

## 폴더 구조

```
src/
├── api/ # API 관련 로직
│ ├── apiClient.ts # Axios 클라이언트 설정
│ └── gamesApi.ts # 게임 API 함수들
├── app/ # Next.js App Router
│ ├── discover/ # 게임 탐색 페이지들
│ ├── games/ # 게임 상세 페이지
│ └── video-game-releases/ # 출시 캘린더
├── components/ # 재사용 가능한 컴포넌트
│ ├── features/ # 기능별 컴포넌트
│ ├── layout/ # 레이아웃 컴포넌트
│ └── ui/ # UI 컴포넌트
├── types/ # TypeScript 타입 정의
├── utils/ # 유틸리티 함수들
└── assets/ # 정적 자산 (아이콘, 이미지)
```

## 🛠 기술 스택

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **Axios**
- RAWG API
- Vercel
