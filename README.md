// prettier-ignore
# <img src="./public/readme/main_title.png" />

# 방탈출 리뷰 서비스 ESCape

> #### 🔗 배포 사이트 : https://es-cape-codeit.vercel.app/

<br>

## 👥 팀 소개

|               [오정민](https://github.com/ojm51)                |                     [김세환](https://github.com/kimsayhi)                     |                     [김종화](https://github.com/KJongHwa)                      |                   [나윤주](https://github.com/naynara87)                    | [서지훈](https://github.com/SealBros) |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | -------------------------------------- |
| ![오정민 프로필 사진](./public/readme/profile_jm.jpeg) | ![김세환 프로필 사진](./public/readme/profile_sh.png) | ![김종화 프로필 사진](./public/readme/profile_jh.jpeg) | ![나윤주 프로필 사진](./public/readme/profile_yj.png) |![서지훈 프로필 사진](./public/readme/profile_sjh.png) |
|    CSS / Tailwind 설정,데이터 수집,마이 / 유저 페이지            |         공용 컴포넌트 설계,데이터 수집 / 가공, 상품 / 랜딩 페이지         | 레포지토리 설정,데이터 수집,자유게시판 페이지 | 유저플로우 설계,데이터 수집, 로고 디자인,회원가입 / 로그인 페이지 |   컨벤션 / 포매터 설정,데이터 수집 / 가공,상품 상세 페이지 |

<br>
<br>

## 🗓️ 프로젝트 기간

> **2024년 10월 07일(월) ~ 2024년 11월 11일(월)**
>
> > **🌱 1st week**
> >
> > - 10월 07일(월) ~ 10월 13일(일)
> >   - 주제 선정
> >   - 초기세팅
>
> > **☘️ 2nd week**
> >
> > - 10월 14일(월) ~ 10월 20일(일)
> >   - 1차 기능 개발
>
> > **🍀 3nd week**
> >
> > - 10월 21일(월) ~ 10월 27일(일)
> >   - 2차 기능 개발
>
> > **🍀 4nd - 6nd week**
> >
> > - 10월 28일(월) ~ 11월 10일(일)
> >   - 통합테스트 및 버그 수정
> >   - 발표 준비 및 기타 사항 보완
>
> > **🪴 final week**
> >
> > - 11월 11일(월)
> >   - 발표
>

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

|        구분           |                                                                                                                     기술                                                                                                                      |
| :-------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       **HTML**        | <img src="https://github.com/M-Moong/ID-NUMBER/assets/105577805/fd7807ea-6cdb-47e5-a0dd-b77db83b3415" width="28" height="28"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" />  |
|        **CSS**        | <img src="https://github.com/M-Moong/ID-NUMBER/assets/105577805/bed6550a-a5b3-48e2-a6f7-b105c6bd3455" width="28" height="28"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />  |
|  **Package Manager**  | <img src="https://github.com/M-Moong/ID-NUMBER/assets/105577805/98668e2c-d97a-45d0-8f75-e14084e75d09" width="28px"/> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />                 |
|  **Front-End Tool**   | <img src="https://github.com/kimInDa/react-project-11/assets/105577805/42394b45-fae9-4818-803a-a11ed2d5f6a7" width="28" height="28"/> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />  |
|    **UI Library**     | <img src="https://img.shields.io/badge/flowbite--react-4B5563?style=for-the-badge&logo=flowbite&logoColor=white"/>                                                                                                                          |
|        **Git**        | <img src="https://github.com/M-Moong/ID-NUMBER/assets/105577805/91c4abfd-6805-45ee-8305-c72492bd1afc" width="28px"/> <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=Git&logoColor=white" /> <br> <img src="https://github.com/M-Moong/ID-NUMBER/assets/105577805/748d9e80-bf75-4d9a-bee3-4815ecaeb810" width="28px"/> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white" />        |
|       **Tools**       | <img src="https://github.com/Rbochill/Rbochill/assets/105577805/12c1ac10-3975-47bc-b271-d8656361d9a2" width="28px"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white" /> <br> <img src="https://github.com/Rbochill/Rbochill/assets/105577805/2972553a-b861-4707-a1d1-fbaf8b69f3ca" width="28px"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white" />          |
|    **Deployment**     | <img src="https://github.com/kimInDa/react-project-11/assets/105577805/ccd7ad3c-2ce6-4249-bb94-2c207844875a" width="28" height="28"/> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=black" /> |



<br>
<br>

## 🖥️ 구현 페이지 & 🧑‍💻 코드 리뷰

|               구분                |                                                          구현 페이지                                                          |                                                                                                                                                                                                                                                                                                                                                                                      구현 기능<br>(코드 리뷰)                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **메인** |  <img src="./public/readme/main.gif" /> |  |
| **로그인** |  <img src="./public/readme/login.gif" /> |  |
| **회원가입** | <img src="./public/readme/signup.gif" /> |  |
| **마이페이지**  | <img src="./public/readme/mypage.gif" /> <img src="./public/readme/mypage-2.gif" /><img src="./public/readme/mypage-3.gif" /><img src="./public/readme/mypage-4.gif" />| |
| **자유게시판** | <img src="./public/readme/board-1.gif" /><img src="./public/readme/board-2.gif" /><img src="./public/readme/board-3.gif" /><img src="./public/readme/board-4.gif" /><img src="./public/readme/board-4.gif" />| |
| **자유게시판 글쓰기** | <img src="./public/readme/board-6.gif" />| |
| **자유게시판 상세** |<img src="./public/readme/board-detail-1.gif" /><img src="./public/readme/board-detail-2.gif" /><img src="./public/readme/board-detail-3.gif" /><img src="./public/readme/board-detail-4.gif" /><img src="./public/readme/board-detail-5.gif" /> | |
| **지역별 테마** | <img src="./public/readme/theme-1.gif" /><img src="./public/readme/theme-1.gif" /><img src="./public/readme/theme-2.gif" /><img src="./public/readme/theme-3.gif" /><img src="./public/readme/theme-4.gif" />| |
| **타인 페이지** |<img src="./public/readme/user-1.gif" /><img src="./public/readme/user-2.gif" /><img src="./public/readme/user-3.gif" /> | |
| **테마 상세페이지** | <img src="./public/readme/theme-detail-1.gif" /><img src="./public/readme/theme-detail-1.gif" /><img src="./public/readme/theme-detail-2.gif" /><img src="./public/readme/theme-detail-3.gif" /><img src="./public/readme/theme-detail-4.gif" /><img src="./public/readme/theme-detail-5.gif" /><img src="./public/readme/theme-detail-6.gif" /><img src="./public/readme/theme-detail-7.gif" /><img src="./public/readme/theme-detail-8.gif" />| |


<br>
<br>

## 🎤 프로젝트 소감

|      좋았던 점                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “서로의 상황 및 컨디션을 배려하며 프로젝트를 진행함”                                                                                                            |
| “다른 팀원에게 막히는 부분이 있다면 나서서 도와주고 함께 고민함”                                                                                                |
| “서로를 존중하며 다양한 의견을 편하게 제시할 수 있는 분위기를 조성함”                                                                                            |

|      아쉬운 점                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “다양한 아이디어를 제시했지만, 소통 오류로 반영되지 않은 경우가 있었음”                                                                                           |
| “오늘의 TodoList를 작성했지만, 예상치 못한 일이 생기거나 집중력이 떨어져 계획한 일을 끝내지 못한 경우가 많았음"                                                 |

|      개선할 점                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “혼자 고민해보는 시간의 마지노선을 정하고, 그 시간이 지나도 해결이 안 될 때 질문하기 / 그 시간 동안만 혼자 고민하기”                                              |
| “간단하게라도 매일 ‘자신이 하루동안 구현한 것 + 어려웠던 것 + 좋았던 것 + 소감’ 회고하고 기록 남기기”                                                              |
