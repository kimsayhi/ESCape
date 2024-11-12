// prettier-ignore
# <img src="./public/readme/main_title.png" />

# 방탈출 리뷰 서비스 ESCape

> #### 🔗 배포 사이트 : https://es-cape-codeit.vercel.app/

<br>

## 👥 팀 소개

| 팀원 | 역할 및 GitHub |
|:---:|:---|
| ![오정민 프로필 사진](./public/readme/profile_jm.jpeg) <br> [오정민](https://github.com/ojm51) | CSS / Tailwind 설정, 데이터 수집, 마이 / 유저 페이지 |
| ![김세환 프로필 사진](./public/readme/profile_sh.png) <br> [김세환](https://github.com/kimsayhi) | 공용 컴포넌트 설계, 데이터 수집 / 가공, 상품 / 랜딩 페이지 |
| ![김종화 프로필 사진](./public/readme/profile_jh.jpeg) <br> [김종화](https://github.com/KJongHwa) | 레포지토리 설정, 데이터 수집, 자유게시판 페이지 |
| ![나윤주 프로필 사진](./public/readme/profile_yj.png) <br> [나윤주](https://github.com/naynara87) | 유저 플로우 설계, 데이터 수집, 로고 디자인, 회원가입 / 로그인 페이지 |
| ![서지훈 프로필 사진](./public/readme/profile_sjh.png) <br> [서지훈](https://github.com/SealBros) | 컨벤션 / 포매터 설정, 데이터 수집 / 가공, 상품 상세 페이지 |


<br>
<br>

## 🗓️ 프로젝트 기간

- **1주차:** 주제 선정 및 초기 세팅
- **2주차:** 1차 기능 개발
- **3주차:** 2차 기능 개발
- **4-6주차:** 통합 테스트 및 버그 수정, 발표 준비 및 기타 사항 보완
- **최종 주:** 발표 (11월 11일)

<br>
<br>

## 📐 설계


### ▪️ user Flow

![user flow](./public/readme/user_flow.png)

### ▪️ Directory

```
react-project-11
├─ public
├─ src
│  ├─ components
│  │  ├─ @shared
│  │  ├─ addboard
│  │  ├─ auth
│  │  ├─ board
│  │  ├─ mypage
│  │  ├─ product
│  │  └─ productDetail
│  ├─ contexts
│  ├─ dtos
│  ├─ hooks
│  ├─ libs
│  │  ├─ axios
│  │  └─ constants
│  ├─ pages
│  │  ├─ addboard
│  │  ├─ board
│  │  ├─ error
│  │  ├─ mypage
│  │  ├─ oauth
│  │  ├─ product
│  │  ├─ signin
│  │  ├─ signup
│  │  └─ user
│  ├─ styles
└─ └─ utils
```

<br>

## ⚙️ 기술 스택

| 구분               | 기술 |
|--------------------|--------------------|
| **HTML**           | <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" /> |
| **CSS**            | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> |
| **Package Manager** | <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> |
| **Front-End Tool** | <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> |
| **UI Library**     | <img src="https://img.shields.io/badge/flowbite--react-4B5563?style=for-the-badge&logo=flowbite&logoColor=white"/> |
| **Git**            | <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=Git&logoColor=white" /> |
| **Deployment**     | <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=black" /> |

<br>

## 🖥️ 구현 페이지

| 구분           | 구현 페이지 |
|----------------|------------|
| **메인**       | ![메인](./public/readme/main.gif) |
| **로그인**     | ![로그인](./public/readme/login.gif) |
| **회원가입**   | ![회원가입](./public/readme/signup.gif) |
| **마이페이지** | ![마이페이지1](./public/readme/mypage.gif) <br> ![마이페이지2](./public/readme/mypage-2.gif) |
| **자유게시판** | ![자유게시판1](./public/readme/board-1.gif) <br> ![자유게시판2](./public/readme/board-2.gif) |
| **자유게시판 글쓰기** | ![자유게시판 글쓰기](./public/readme/board-6.gif) |
| **지역별 테마** | ![테마1](./public/readme/theme-1.gif) <br> ![테마2](./public/readme/theme-2.gif) |
| **타인 페이지** | ![타인 페이지1](./public/readme/user-1.gif) <br> ![타인 페이지2](./public/readme/user-2.gif) |
| **테마 상세페이지** | ![테마 상세1](./public/readme/theme-detail-1.gif) <br> ![테마 상세2](./public/readme/theme-detail-2.gif) |

<br>

## 🎤 프로젝트 소감

| 좋았던 점 | 아쉬운 점 | 개선할 점 |
|-----------|-----------|-----------|
| 서로의 상황 및 컨디션을 배려하며 프로젝트를 진행 | 다양한 아이디어를 제시했지만, 소통 오류로 반영되지 않은 경우가 있었음 | 혼자 고민해보는 시간의 마지노선을 정하고, 그 시간이 지나도 해결이 안 될 때 질문하기 |
| 팀원 간의 활발한 소통과 협력 | 예상치 못한 일로 인해 계획한 작업을 끝내지 못한 경우가 많았음 | 매일 짧은 회고를 통해 자신이 구현한 것과 소감을 공유하고 기록 |