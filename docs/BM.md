# BM 문서: 웹 콘텐츠 플랫폼 & 충전/리워드 시스템

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [핵심 기능 및 서비스 구성](#2-핵심-기능-및-서비스-구성)
3. [기술 스택 및 시스템 아키텍처](#3-기술-스택-및-시스템-아키텍처)
4. [BM 및 리워드 시스템 전략](#4-bm-및-리워드-시스템-전략)
5. [개발 및 운영 계획](#5-개발-및-운영-계획)
6. [결론](#6-결론)

[English](#bm-document-web-content-platform--chargingreward-system)
## 1. 프로젝트 개요

### 목표
- 독자 맞춤형 웹 콘텐츠(웹툰, 웹소설 등) 뷰잉 및 결제 시스템 구축
- DRM, 보안, 확장성을 고려한 견고한 서비스 제공
- 독자 참여를 극대화하기 위한 포인트 적립, 커스텀 스토리 제안, 리워드 시스템 도입

### 참고 기업
RIDI, 키다리스튜디오(봄툰/레진코믹스), 미스터블루, 애니툰, 알라딘, yes24, 교보문고, 포스타입, 카카오페이지, 페이타랩, 토스 등

## 2. 핵심 기능 및 서비스 구성

### 2.1 기본 기능
- 웹 콘텐츠 뷰잉:
	- PC와 모바일 모두에서 최적화된 뷰어 제공 (반응형 디자인)
- DRM 적용:
	- 암호화, 워터마킹, 세션 인증 등을 통한 불법 복제 방지
- 결제 시스템:
	- 전체 화 결제와 개별 화 결제 지원
	- 기본 충전금액에 따른 포인트 적립 시스템 도입 (충전액이 클수록 보상이 커짐)

### 2.2 추가 기능
- 맞춤형 스토리 생성 및 제안:
	- 독자가 캐릭터, 스토리라인, 장르, 세계관 등을 선택하면 AI 또는 규칙 기반 엔진을 통해 한두 문단 분량의 스토리 요약 생성
	- 생성된 스토리와 유사한 콘텐츠 검색 및 추천, 혹은 독자 리퀘스트 기능 제공
- 리워드 시스템:
	- 독자가 제안한 스토리 설정 등이 채택되어 콘텐츠로 제작될 경우, 일정 조건 하에 리워드를 지급
	- 보상은 포인트 형태로 지급되어 추후 결제 시 할인 또는 특별 혜택으로 활용

### 2.3 콘텐츠 소장 및 운영 중단 문제 해결 방안
- 영구 소장권 개념 도입:
	- 콘텐츠 구매 시 단순 이용권이 아니라 '영구 소장권'을 부여하여 장기적인 접근 권한 보장
- 강화된 DRM 및 디지털 소유권 인증:
	- 기존 DRM 기술(암호화, 워터마킹 등)을 더욱 강화하고, 블록체인 기반 디지털 자산(NFT 개념) 도입을 검토
	- 플랫폼 운영 중단 시에도 독자의 소유권을 인증할 수 있도록 설계
- 분산 저장 및 클라우드 소장 서비스:
	- 클라우드 및 분산 저장 기술을 활용하여 콘텐츠 파일을 안전하게 관리하며, 독자가 언제든지 접근 가능하도록 지원

## 3. 기술 스택 및 시스템 아키텍처

### 3.1 프론트엔드
- 웹: React 또는 Vue.js (반응형 웹 디자인 및 사용자 인터페이스 최적화)
- 모바일: React Native, Flutter 또는 네이티브 앱 개발

### 3.2 백엔드
- API 및 결제, DRM, AI 스토리 생성 기능:
	- Node.js (Express 또는 Nest.js) / Python (Flask, FastAPI) / Java (Spring Boot) 선택 가능
	- CMS 및 내부 정산 시스템:
	- Java와 Kotlin/Spring 활용 – 안정적이며 성숙한 생태계 기반으로 트랜잭션 관리, 보안, 확장성을 지원

### 3.3 데이터베이스 및 검색
- 관계형 DB: PostgreSQL 또는 MySQL – 사용자, 결제, 콘텐츠 메타데이터 관리
- NoSQL: MongoDB – 비정형 데이터, 리퀘스트 이력 관리
- 검색 엔진: Elasticsearch – 유사 콘텐츠 검색 및 추천

### 3.4 클라우드 및 인프라
- 클라우드 서비스: AWS, GCP, Azure 등
- 컨테이너 및 서버리스: Docker, Kubernetes, AWS Lambda, Cloud Functions
- API 게이트웨이: Kong, NGINX 등

## 4. BM 및 리워드 시스템 전략

### 4.1 충전 결제 및 포인트 적립 시스템
- 충전액 기반 포인트 적립:
	- 예: 5만원 이상 충전 시 3%, 10만원 이상 충전 시 5% 적립 등 단계별 혜택 제공
- 포인트 활용:
	- 콘텐츠 결제 시 할인, 프리미엄 서비스 구독, 독점 이벤트 참여 등 다양한 방식으로 활용

### 4.2 제휴 및 외부 협력 방안
- 금융/핀테크 제휴:
	- 카드사, 핀테크 기업과 협력하여 추가 캐시백 및 포인트 보너스 제공
	- 간편 결제 시스템(토스, 카카오페이 등) 연계
- 타 콘텐츠 플랫폼 제휴:
	- 웹툰, 웹소설 플랫폼 간 통합 포인트 제도 도입 및 크로스 프로모션

### 4.3 독자 리워드 시스템
- 독자 제안 보상:
	- 독자가 제안한 스토리 설정이 채택되어 콘텐츠로 제작되면, 일정 제한 내 최대 포인트를 리워드로 지급
- 투명한 평가 기준 마련:
	- 리워드 산정 기준과 채택 절차를 명확히 문서화하여 공정성을 보장
	- 이용 약관 및 계약서를 통해 지적 재산권 및 법적 이슈 선제적 해결

### 4.4 콘텐츠 소장 문제 해결
- 영구 소장권 및 디지털 자산 인증:
	- 콘텐츠에 대해 영구 소장권을 부여하고, 블록체인 기반 인증서를 발급하여 독자의 소유권 보증
- 안정적인 콘텐츠 저장:
	- 클라우드와 분산 저장 기술을 활용해 플랫폼 운영 중단에도 독자가 콘텐츠에 안전하게 접근 가능하도록 설계

## 5. 개발 및 운영 계획

### 5.1 프로젝트 진행 단계
- 기획 및 요구사항 정의: 목표 기업 분석 및 기능 명세, 와이어프레임, 데이터 모델링 문서 작성
- 기술 검토 및 아키텍처 설계: 선택 기술 스택에 따른 모듈화, API 설계(RESTful, GraphQL 등) 및 아키텍처 구성

- 개발:
	- 프론트엔드(UI/UX 개발, 반응형 디자인 구현)
	- 백엔드(API, 결제, DRM, AI 스토리 생성 엔진 개발)
	- 데이터베이스 및 검색 시스템 구축
- 테스트 및 코드 리뷰:
	- 단위 테스트, 통합 테스트, CI/CD 파이프라인(GitHub Actions 등) 구축
- 배포 및 운영:
	- 클라우드 기반 배포(Docker, Kubernetes)
	- 관리자 대시보드 구축 및 모니터링, 사용자 피드백 반영

### 5.2 코드 품질 및 최적화
- 코드 리뷰와 협업 문화 확립: 정기적인 코드 리뷰 및 PR 기준 마련
- 테스트 자동화: 단위 및 통합 테스트로 기능 안정성 확보
- 성능 최적화: 프론트엔드(코드 스플리팅, Lazy Loading), 백엔드(캐싱, DB 인덱싱) 최적화

### 5.3 산출물 관리
- 버전 관리: GitHub 활용 및 Branch 전략(Feature, Develop, Main) 적용
- 문서화: 프로젝트 아키텍처, API 문서, 기술 블로그 포스트 등 정리

## 6. 결론

본 BM은 `독자 맞춤형 콘텐츠 플랫폼`을 통해 차별화된 사용자 경험을 제공하고, `충전 결제 및 포인트 리워드 시스템`을 도입하여 독자의 참여와 충성도를 높이는 것을 목표로 합니다.

또한, `영구 소장권` 및 `강화된 DRM`, `블록체인 기반 디지털 인증` 등을 통해 플랫폼 운영 중단 시 독자가 느끼는 배신감  문제를 해결함으로써, 제작자, 독자, 그리고 플랫폼 모두에게 안정성과 신뢰를 제공하는 혁신적인 비즈니스 모델입니다.

이 문서는 향후 실제 구현을 위한 기획 및 설계 단계에서 참고 자료로 활용될 수 있으며, 목표 기업의 요구사항과 시장의 변화에 맞춰 유연하게 업데이트 될 수 있습니다.

---

# BM Document: Web Content Platform & Charging/Reward System

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Core Features and Service Configuration](#2-core-features-and-service-configuration)
3. [Technology Stack and System Architecture](#3-technology-stack-and-system-architecture)
4. [BM and Reward System Strategy](#4-bm-and-reward-system-strategy)
5. [Development and Operation Plan](#5-development-and-operation-plan)
6. [Conclusion](#6-conclusion)

## 1. Project Overview

### Objectives
- Build a reader-customized web content (webtoon, web novel, etc.) viewing and payment system
- Provide robust services considering DRM, security, and scalability
- Introduce point accumulation, custom story proposals, and reward systems to maximize reader participation

### Reference Companies
RIDI, Kidari Studio (Bomtoon/Lezhin Comics), Mr. Blue, Anitoon, Aladin, yes24, Kyobo Book, Postype, Kakao Page, Peta Lab, Toss, etc.

## 2. Core Features and Service Configuration

### 2.1 Basic Features
- Web Content Viewing:
	- Provide optimized viewers for both PC and mobile (responsive design)
- DRM Application:
	- Prevent illegal copying through encryption, watermarking, session authentication
- Payment System:
	- Support full series and individual episode payments
	- Introduce point accumulation system based on basic charging amount (larger rewards for higher charges)

### 2.2 Additional Features
- Custom Story Creation and Proposal:
	- AI or rule-based engine generates a summary of a story in a few paragraphs based on the reader's selection of character, storyline, genre, and worldview
	- Provides content search and recommendation similar to the generated story or reader request functionality
- Reward System:
	- Reward is granted if the reader's story setting is adopted and made into content under certain conditions
	- Reward is granted in the form of points and can be used as a discount or special benefit at a later payment

### 2.3 Content Storage and Operation Shutdown Problem Solution
- Permanent Ownership Rights Concept:
	- Instead of a simple usage right, grant 'permanent ownership rights' to purchase content to ensure long-term access rights
- Enhanced DRM and Digital Ownership Authentication:
	- Strengthen existing DRM technology (encryption, watermarking, etc.) and consider adopting blockchain-based digital assets (NFT concept)
	- Design to authenticate the reader's ownership even when the platform shuts down
- Distributed Storage and Cloud Storage Service:
	- Utilize cloud and distributed storage technology to manage content files safely and support access by readers at any time

## 3. Technology Stack and System Architecture

### 3.1 Frontend
- Web: React or Vue.js (responsive web design and user interface optimization)
- Mobile: React Native, Flutter, or native app development

### 3.2 Backend
- API and payment, DRM, AI story generation functions:
	- Node.js (Express or Nest.js) / Python (Flask, FastAPI) / Java (Spring Boot) can be selected
	- CMS and internal settlement system:
	- Java and Kotlin/Spring utilization – stable and mature ecosystem-based transaction management, security, scalability support

### 3.3 Database and Search
- Relational DB: PostgreSQL or MySQL – manage user, payment, content metadata
- NoSQL: MongoDB – manage unstructured data, request history
- Search Engine: Elasticsearch – content search and recommendation

### 3.4 Cloud and Infrastructure
- Cloud Service: AWS, GCP, Azure, etc.
- Container and Serverless: Docker, Kubernetes, AWS Lambda, Cloud Functions
- API Gateway: Kong, NGINX, etc.

## 4. BM and Reward System Strategy

### 4.1 Charging Payment and Point Accumulation System
- Point Accumulation Based on Charging Amount:
	- Example: 3% point accumulation for 50,000 won or more, 5% point accumulation for 100,000 won or more, etc.
- Point Utilization:
	- Various ways to use points, such as discounts at content payment, premium service subscription, exclusive event participation

### 4.2 Cooperation and External Cooperation Plan
- Financial/Fintech Cooperation:
	- Cooperation with card companies and fintech companies to provide additional cashback and point bonus
	- Integration with easy payment systems (Toss, Kakao Pay, etc.)
- Cross-Platform Cooperation:
	- Introduce integrated point system and cross-promotion between webtoon and web novel platforms

### 4.3 Reader Reward System
- Reader Proposal Reward:
	- Reward the maximum point within the specified limit when the reader's story setting is adopted and made into content
- Establish Transparent Evaluation Criteria:
	- Clearly document the reward calculation criteria and selection process to ensure fairness
	- Prevent intellectual property rights and legal issues through terms of use and contract

### 4.4 Content Storage Problem Solution
- Permanent Ownership Rights and Digital Asset Authentication:
	- Grant permanent ownership rights to content and issue blockchain-based certification to guarantee the reader's ownership
- Stable Content Storage:
	- Design to access content safely even when the platform shuts down using cloud and distributed storage technology

## 5. Development and Operation Plan

### 5.1 Project Progress Step
- Define Requirements and Specifications: Analyze target companies and write feature specifications, wireframe, data modeling documents
- Technology Review and Architecture Design: Moduleization, API Design (RESTful, GraphQL, etc.) and Architecture Construction Based on Selected Technology Stack

- Development:
	- Frontend (UI/UX Development, Responsive Design Implementation)
	- Backend (API, Payment, DRM, AI Story Generation Engine Development)
	- Build Database and Search System
- Test and Code Review:
	- Build Unit Test, Integration Test, CI/CD Pipeline (GitHub Actions, etc.)
- Deployment and Operation:
	- Cloud-based Deployment (Docker, Kubernetes)
	- Build and Monitor Administrator Dashboard and Reflect User Feedback

### 5.2 Code Quality and Optimization
- Code Review and Collaboration Culture Establishment: Establish Regular Code Review and PR Criteria
- Test Automation: Ensure Function Stability Through Unit and Integration Test
- Performance Optimization: Frontend (Code Splitting, Lazy Loading), Backend (Caching, DB Indexing) Optimization

### 5.3 Output Management
- Version Management: Apply GitHub and Branch Strategy (Feature, Develop, Main)
- Documentation: Organize Project Architecture, API Documentation, Technical Blog Posts, etc.

## 6. Conclusion

This BM aims to provide differentiated user experiences through a 'reader-customized content platform' and increase reader participation and loyalty by introducing 'charging payment and point reward systems'.

Additionally, this is an innovative business model that provides stability and trust to creators, readers, and platforms by solving the betrayal problem that readers feel when platforms shut down through 'permanent ownership rights', 'enhanced DRM', and 'blockchain-based digital authentication'.

This document can be used as a reference material in the planning and design stages for actual implementation and can be flexibly updated according to target company requirements and market changes.