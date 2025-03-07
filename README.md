## monicar

![Image](https://github.com/user-attachments/assets/1f23c32b-6988-4c50-bc9a-707b1f4f2449)

<div align="center">

🚘 [monicar](https://www.monicar.kr/)<br>
📒 [Storybook](https://develop--677a9e60af1c67b3c5b149e8.chromatic.com)

|            | **아이디** | **비밀번호** |
| ---------- | ---------- | ------------ |
| **테스트** | kernel486  | kernel486    |
| **테스트** | happy77    | happy77      |
| **테스트** | angry44    | angry44      |

### 소개

> monicar는 **대규모 카쉐어링 관제를 위한 실시간 모니터링 서비스**입니다. 15,000대 이상의 차량에서 발생하는 시동, GPS, 운행 데이터를 수집하고 분석하여 효율적인 차량 관리 솔루션을 제공합니다.

### 주요 기능

#### 📊 대시보드

<div align="center">

![Image](https://github.com/user-attachments/assets/92738813-9be8-4b12-b14d-b1592f0f7f1e)

</div>
- 직관적인 UI/UX로 알림 현황과 공지사항을 한눈에 파악<br>
- SSE(Server-Sent Events)를 활용한 실시간 차량 점검 알림 시스템

#### 🗺️ 위치 조회

<div align="center">

![Image](https://github.com/user-attachments/assets/3570566d-a223-4f3f-8578-0b2ce9b499d8)

</div>
- 지도 줌 레벨에 따른 차량 클러스터링 시스템<br>
- 개별 차량의 실시간 위치 추적

#### 🚗 실시간 경로 조회

<div align="center">

![Image](https://github.com/user-attachments/assets/4e9bd3b3-ae35-4f76-869b-a6ffaeab52d3)

</div>
- 자동 위치 추적을 통한 실시간 차량 모니터링<br>
- 선택 기간의 차량 이동 정보 표시

#### 📝 운행 기록 관리

<div align="center">

![Image](https://github.com/user-attachments/assets/0d8fa13b-7249-49b4-b6ab-eb97a6d5f96f)

</div>
- 국세청 표준 양식 운행일지 제공<br>
- 엑셀 파일 다운로드 지원<br>
- 일별/시간별 운행 기록 조회<br>
- 차량 등록/삭제 관리 기능<br>

### 시스템 특징

#### 📡 데이터 수집 및 처리

<div align="center">

![Image](https://github.com/user-attachments/assets/ac37efa4-fb5e-4765-998f-729654fc83bd)

</div>
- 차량당 60초 간격으로 60개의 GPS 데이터 일괄 전송<br>
- Apache Kafka를 활용한 대용량 데이터 처리<br>
- 시동, GPS 정보의 실시간 모니터링

#### 💻 사용자 경험

<div align="center">

![Image](https://github.com/user-attachments/assets/9f7a851e-a9ba-4833-9251-da5501e752c8)

</div>
- 모바일 반응형 디자인으로 어디서나 접근 가능<br>
- 다크모드 지원으로 사용자 편의성 강화

## 🛠 기술 스택

### FE

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,css,vercel" />
  </a>
</p>

<p align="center">
  🗺️ Tech Stack: Next.js, React, TypeScript, VanillaExtract, Zustand
</p>

### BE

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=github,docker,spring,java,kafka,aws,mysql,redis,elasticsearch,jwt" />
  </a>
</p>

<p align="center">
  ⚡ Tech Stack: Spring Boot, Spring Data JPA, Spring Security, QueryDSL, MyBatis, JWT, SSE, AWS EC2, AWS RDS, AWS ALB
</p>

## 👤 팀원소개

<div align="center">

| [<img src="https://avatars.githubusercontent.com/u/93717306?v=4" width="100" height="100"/>](https://github.com/Suxxxxhyun) | [<img src="https://avatars.githubusercontent.com/u/79817983?v=4" width="100" height="100"/>](https://github.com/kbyunghoon) | [<img src="https://avatars.githubusercontent.com/u/70049994?v=4" width="100" height="100"/>](https://github.com/tomatozil) | [<img src="https://avatars.githubusercontent.com/u/93127663?v=4" width="100" height="100"/>](https://github.com/red-dev-Mark) | [<img src="https://avatars.githubusercontent.com/u/170427166?s=400&u=3ff8a944ecc62e8224cd1a7372148d8e70fcc45f&v=4" width="100" height="100"/>](https://github.com/nanafromjeju) |
| :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                       [👑 BE @박수현](https://github.com/Suxxxxhyun)                                        |                                         [BE @김병훈](https://github.com/kbyunghoon)                                         |                                         [BE @윤지윤](https://github.com/tomatozil)                                         |                                         [FE @권혁준](https://github.com/red-dev-Mark)                                         |                                                                  [FE @김난아](https://github.com/nanafromjeju)                                                                  |

</div>

## 🔫 BE Trouble Shooting

- [부하테스트 - 메시지 큐를 도입할 수 밖에 없었던 이유](https://www.canva.com/design/DAGfcRy6xGE/q6HvKo_qZ0ftXHH79zK6rg/edit?utm_content=DAGfcRy6xGE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [메시지 큐 중에 Kafka를 도입한 이유 - 구체적으로 업로드 예정](https://github.com/Kernel360/KDEV3_monicar_BE/blob/develop/img/Kafa도입이유.md)
- [Route53 동작이 제대로 안될 때가 있다.](https://github.com/Kernel360/blog/pull/131)
- [SSE 응답이 계속 대기 중(Pending)으로 유지되는 문제](<https://github.com/Kernel360/KDEV3_monicar_BE/wiki/SSE-%EC%9D%91%EB%8B%B5%EC%9D%B4-%EA%B3%84%EC%86%8D-%EB%8C%80%EA%B8%B0-%EC%A4%91(Pending)%EC%9C%BC%EB%A1%9C-%EC%9C%A0%EC%A7%80%EB%90%98%EB%8A%94-%EB%AC%B8%EC%A0%9C>)
- [Spring Transaction ‐ Propagation.REQUIRES_NEW 를 써보며 - 수정 예정](https://github.com/Kernel360/KDEV3_monicar_BE/wiki/Spring-Transaction-%E2%80%90-Propagation.REQUIRES_NEW-%EB%A5%BC-%EC%8D%A8%EB%B3%B4%EB%A9%B0)

## 기술 세미나

- [확장가능한 시스템 설계 - 박수현](https://docs.google.com/presentation/d/179fQnnWuqpqkAJLTbvhTNh4YNEe4cjSUiS6bVxZVHAY/edit?usp=sharing)
- [동기 비동기 HTTP 요청 - 윤지윤](https://docs.google.com/presentation/d/1aIru1TdHdLZ956GhZVdg9CFyTxlelEdOxnKPFwaDa2M/edit?usp=sharing)
