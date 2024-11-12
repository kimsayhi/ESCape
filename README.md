# <img src="./public/readme/main_title.png" />

# 방탈출 리뷰 서비스 ESCape

> #### 🔗 배포 사이트 : https://es-cape-codeit.vercel.app/

<br>

## 👥 팀 소개

<table>
  <thead>
    <tr>
      <th style="width: 20%; text-align: center;"> <a href="https://github.com/ojm51">오정민</a> </th>
      <th style="width: 20%; text-align: center;"> <a href="https://github.com/kimsayhi">김세환</a> </th>
      <th style="width: 20%; text-align: center;"> <a href="https://github.com/KJongHwa">김종화</a> </th>
      <th style="width: 20%; text-align: center;"> <a href="https://github.com/naynara87">나윤주</a> </th>
      <th style="width: 20%; text-align: center;"> <a href="https://github.com/SealBros">서지훈</a> </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;"> <img src="./public/readme/profile_jm.jpeg" alt="오정민 프로필 사진" > </td>
      <td style="text-align: center;"> <img src="./public/readme/profile_sh.png" alt="김세환 프로필 사진" > </td>
      <td style="text-align: center;"> <img src="./public/readme/profile_jh.jpeg" alt="김종화 프로필 사진" > </td>
      <td style="text-align: center;"> <img src="./public/readme/profile_yj.png" alt="나윤주 프로필 사진" > </td>
      <td style="text-align: center;"> <img src="./public/readme/profile_sjh.png" alt="서지훈 프로필 사진" > </td>
    </tr>
    <tr>
      <td style="text-align: center;">CSS / Tailwind 설정<br>데이터 수집<br> 마이 / 유저 페이지</td>
      <td style="text-align: center;">공용 컴포넌트 설계<br>데이터 수집 / 가공<br>상품 / 랜딩 페이지</td>
      <td style="text-align: center;">레포지토리 설정<br>데이터 수집<br>자유게시판 페이지</td>
      <td style="text-align: center;">유저 플로우 설계<br>데이터 수집<br>로고 디자인<br> 회원가입 / 로그인 페이지</td>
      <td style="text-align: center;">컨벤션 / 포매터 설정<br>데이터 수집 / 가공<br>상품 상세 페이지</td>
    </tr>
  </tbody>
</table>



<br>
<br>

## 🗓️ 프로젝트 기간
> **2024년 10월 07일(월) ~ 2024년 11월 11일(월)**

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
ESCape
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
| **Front-End Tool** | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white" /> |
| **UI Library**     | <img src="https://img.shields.io/badge/flowbite--react-4B5563?style=for-the-badge&logo=flowbite&logoColor=white"/> |
| **Git**            | <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=Git&logoColor=white" /> |
| **Deployment**     | <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />  |

<br>

## 🖥️ 구현 페이지

<table>
  <thead>
    <tr>
      <th style="text-align: center;" width="150">구분</th>
      <th style="text-align: center;">구현 페이지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="text-align: center;">메인</th>
      <td style="text-align: center;"><img src="./public/readme/main.gif" alt="메인 페이지" /></td>
    </tr>
    <tr>
      <th style="text-align: center;">로그인</th>
      <td style="text-align: center;"><img src="./public/readme/login.gif" alt="로그인 페이지" /></td>
    </tr>
    <tr>
      <th style="text-align: center;">회원가입</th>
      <td style="text-align: center;"><img src="./public/readme/signup.gif" alt="회원가입 페이지" /></td>
    </tr>
    <tr>
      <th style="text-align: center;">마이페이지</th>
      <td style="text-align: center;">
        <img src="./public/readme/mypage.gif" alt="마이페이지 1" />
        <img src="./public/readme/mypage-2.gif" alt="마이페이지 2" />
        <img src="./public/readme/mypage-3.gif" alt="마이페이지 3" />
        <img src="./public/readme/mypage-4.gif" alt="마이페이지 4" />
      </td>
    </tr>
    <tr>
      <th style="text-align: center;">자유게시판</th>
      <td style="text-align: center;">
        <img src="./public/readme/board-1.gif" alt="자유게시판 1" />
        <img src="./public/readme/board-2.gif" alt="자유게시판 2" />
        <img src="./public/readme/board-3.gif" alt="자유게시판 3" />
        <img src="./public/readme/board-4.gif" alt="자유게시판 4" />
      </td>
    </tr>
    <tr>
      <th style="text-align: center;">자유게시판 글쓰기</th>
      <td style="text-align: center;"><img src="./public/readme/board-6.gif" alt="자유게시판 글쓰기" /></td>
    </tr>
    <tr>
      <th style="text-align: center;">자유게시판 상세</th>
      <td style="text-align: center;">
        <img src="./public/readme/board-detail-1.gif" alt="자유게시판 상세 1" />
        <img src="./public/readme/board-detail-2.gif" alt="자유게시판 상세 2" />
        <img src="./public/readme/board-detail-3.gif" alt="자유게시판 상세 3" />
        <img src="./public/readme/board-detail-4.gif" alt="자유게시판 상세 4" />
        <img src="./public/readme/board-detail-5.gif" alt="자유게시판 상세 5" />
      </td>
    </tr>
    <tr>
      <th style="text-align: center;">지역별 테마</th>
      <td style="text-align: center;">
        <img src="./public/readme/theme-1.gif" alt="지역별 테마 1" />
        <img src="./public/readme/theme-2.gif" alt="지역별 테마 2" />
        <img src="./public/readme/theme-3.gif" alt="지역별 테마 3" />
        <img src="./public/readme/theme-4.gif" alt="지역별 테마 4" />
      </td>
    </tr>
    <tr>
      <th style="text-align: center;"><strong>타인 페이지</strong></th>
      <td style="text-align: center;">
        <img src="./public/readme/user-1.gif" alt="타인 페이지 1" />
        <img src="./public/readme/user-2.gif" alt="타인 페이지 2" />
        <img src="./public/readme/user-3.gif" alt="타인 페이지 3" />
      </td>
    </tr>
    <tr>
      <th style="text-align: center;"><strong>테마 상세페이지</strong></th>
      <td style="text-align: center;">
        <img src="./public/readme/theme-detail-1.gif" alt="테마 상세 1" />
        <img src="./public/readme/theme-detail-2.gif" alt="테마 상세 2" />
        <img src="./public/readme/theme-detail-3.gif" alt="테마 상세 3" />
        <img src="./public/readme/theme-detail-4.gif" alt="테마 상세 4" />
        <img src="./public/readme/theme-detail-5.gif" alt="테마 상세 5" />
        <img src="./public/readme/theme-detail-6.gif" alt="테마 상세 6" />
        <img src="./public/readme/theme-detail-7.gif" alt="테마 상세 7" />
        <img src="./public/readme/theme-detail-8.gif" alt="테마 상세 8" />
      </td>
    </tr>
  </tbody>
</table>

<br>

## 🎤 프로젝트 소감

<table style="width:100%">
  <thead>
    <tr>
      <th>좋았던 점</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>“서로의 상황 및 컨디션을 배려하며 프로젝트를 진행함”</td></tr>   <tr>
      <td>“다른 팀원에게 막히는 부분이 있다면 나서서 도와주고 함께 고민함”</td></tr> 
        <tr><td>“서로를 존중하며 다양한 의견을 편하게 제시할 수 있는 분위기를 조성함”</td>
    </tr> 
  </tbody>
  </table>
<table style="width:100%">
  <thead>
    <tr>
    <th >아쉬운 점</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>“다양한 아이디어를 제시했지만, 소통 오류로 반영되지 않은 경우가 있었음”</td></tr> 
        <tr><td>“오늘의 TodoList를 작성했지만, 예상치 못한 일이 생기거나 집중력이 떨어져 계획한 일을 끝내지 못한 경우가 많았음"</td> 
    </tr> 
  </tbody>
  </table> 
<table style="width:100%">
  <thead>
    <tr>
      <th >개선할 점</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>“혼자 고민해보는 시간의 마지노선을 정하고, 그 시간이 지나도 해결이 안 될 때 질문하기 / 그 시간 동안만 혼자 고민하기”</td></tr> <tr>
      <td>“간단하게라도 매일 ‘자신이 하루동안 구현한 것 + 어려웠던 것 + 좋았던 것 + 소감’ 회고하고 기록 남기기”</td>
    </tr> 
  </tbody>
</table>