# BFIND 
*"비파인드(BFIND)는 독자와 콘텐츠를 한데 묶어(BIND) 새로운 이야기를 찾아가는(FIND) 혁신적인 플랫폼입니다. 안전한 소장과 참여를 통해 새로운 가치와 경험을 창출하며, 독자가 콘텐츠와 깊은 연결을 이루고 자신만의 이야기를 창조할 수 있도록 돕습니다."*

> **BFIND(비파인드)** 는 'Bind'와 'Find'의 결합으로, 독자와 콘텐츠를 하나로 묶고(BIND) 새로운 이야기를 함께 찾아가는(FIND) 철학을 담고 있습니다.
> 
> 이 이름은 단순히 콘텐츠를 소비하는 것을 넘어, 사용자가 직접 자신의 이야기를 제안하고 소장함으로써, 보다 깊은 연결과 참여를 경험할 수 있도록 한다는 의미를 내포합니다.
> 
> BFIND는 안전한 DRM 기술과 혁신적인 리워드 시스템을 통해 독자와 제작자 모두에게 신뢰와 지속 가능한 가치를 제공하는 디지털 플랫폼을 지향합니다.

*"BFIND is an innovative platform that binds readers with content (BIND) and helps them find their own stories (FIND). Through secure ownership and participation, it creates new value and experiences, helping readers form deep connections with content and create their own stories."*

> **BFIND** combines 'Bind' and 'Find', embodying a philosophy of binding readers and content together while finding new stories together.
>
> The name implies going beyond mere content consumption, allowing users to experience deeper connection and participation by proposing and owning their own stories.
>
> BFIND aims to be a digital platform that provides trust and sustainable value to both readers and creators through secure DRM technology and an innovative reward system.

## Web Content Platform with DRM & Story Proposal System

이 프로젝트는 고급 DRM 보호, 유연한 결제 시스템, 그리고 독자 참여 기반의 리워드 기능을 결합한 웹 콘텐츠 플랫폼을 구축하는 것을 목표로 합니다. 특히 독자들이 직접 스토리를 제안하고 채택 시 보상받는 혁신적인 'FIND' 시스템을 통해 기존 플랫폼과 차별화됩니다.

This project aims to build a web content platform that combines advanced DRM protection, flexible payment systems, and reader participation-based reward features. It differentiates itself from existing platforms through its innovative 'FIND' system, where readers can propose stories and receive rewards when adopted.

---

## 목차 (Table of Contents)
- [한국어 버전](#한국어-버전)
- [English Version](#english-version)

---

## 한국어 버전

### 개요
이 프로젝트는 웹툰, 웹소설 등 디지털 콘텐츠를 대상으로 안전하고 확장 가능한 플랫폼을 구축하는 것을 목표로 합니다. 고급 DRM 보호, 다양한 결제 옵션, 독자 리워드, 그리고 커스텀 스토리 제안 기능을 통해 독자에게 단순 이용을 넘어서 영구 소장권까지 제공하는 혁신적인 시스템을 구현합니다.

### 핵심 기능
1. **반응형 콘텐츠 뷰어**
   - PC와 모바일에서 최적화된 사용자 인터페이스 제공
2. **강화된 DRM 보호**
   - 암호화, 워터마킹, 세션 인증 등을 통한 불법 복제 방지
3. **유연한 결제 시스템**
   - 전체 화/개별 화 결제 지원
   - 충전 금액에 따른 단계별 포인트 적립
4. **CMS 및 내부 정산 시스템**
   - Java 및 Kotlin/Spring을 활용한 안정적, 안전한 콘텐츠 및 정산 관리

### 차별화 기능
1. **커스텀 스토리 생성 및 독자 제안 기능 (FIND System)**
   - 독자가 직접 캐릭터, 스토리라인, 장르, 세계관 등을 선택하여 커스텀 스토리 요약 생성
   - AI 또는 규칙 기반 엔진을 통한 실시간 결과 제공 및 유사 콘텐츠 추천/리퀘스트
   - 제안된 스토리의 평가 및 피드백 시스템
   - 채택된 스토리의 제작 과정 참여 기회

2. **독자 리워드 시스템**
   - 독자가 제안한 스토리 설정이 채택되어 실제 콘텐츠로 제작되면, 리워드 포인트 지급
   - 명확한 평가 기준과 절차를 통해 투명하게 운영

3. **영구 소장권 및 디지털 자산 인증**
   - 콘텐츠 구매 시 단순 이용권이 아닌 '영구 소장권'을 발급
   - 블록체인 기반 디지털 인증(예: NFT 개념) 및 분산 저장 기술을 도입하여, 플랫폼 운영 중단 시에도 독자 소유권 보장

### 기술 스택
- **프론트엔드:** React 또는 Vue.js (웹), React Native, Flutter 또는 네이티브 앱 (모바일)
- **백엔드:** 
  - API 및 핵심 기능: Node.js (Express/Nest.js), Python (Flask/FastAPI), 또는 Java (Spring Boot)
  - CMS 및 내부 정산: Java/Kotlin + Spring
- **데이터베이스 및 검색:** PostgreSQL/MySQL (관계형 데이터), MongoDB (NoSQL), Elasticsearch (검색)
- **인프라:** AWS, GCP, Azure, Docker, Kubernetes, Serverless (AWS Lambda, Cloud Functions), API Gateway (Kong, NGINX)

### 시스템 아키텍처
- **프론트엔드 클라이언트:** 웹과 모바일 애플리케이션
- **백엔드 서비스:** 
  - API 서버: 결제, DRM, 커스텀 스토리 생성 등 핵심 비즈니스 로직 처리
  - CMS & 정산 엔진: 콘텐츠 관리 및 내부 재무 거래 관리
- **데이터베이스 계층:** 관계형 DB와 NoSQL, Elasticsearch 연동
- **보안 계층:** 강화된 DRM, OAuth2/JWT 기반 인증, 블록체인 인증(옵션)
- **배포 인프라:** 클라우드 기반 컨테이너화 및 CI/CD 파이프라인 구축

## 프로젝트 구조
```
bfind/
├── frontend/          # React 프론트엔드
├── backend/           # Spring Boot 백엔드
├── infrastructure/    # 인프라 설정
│   ├── docker/       # Docker 설정
│   └── terraform/    # (향후) IaC 설정
└── docs/             # 프로젝트 문서
    ├── architecture/ # 아키텍처 문서
    ├── api/          # API 문서
    ├── database/     # DB 설계 문서
    └── setup/        # 환경 설정 가이드
```

## 기술 스택

### 프론트엔드
- React 18
- TypeScript
- MUI (Material-UI)
- Redux Toolkit
- Vite

### 백엔드
- Spring Boot 3.x
- Kotlin
- Spring Data JPA
- Spring Security
- PostgreSQL
- Redis (캐싱)

### 인프라
- Docker
- Docker Compose
- AWS (예정)
- GitHub Actions (CI/CD) (예정)

## 시작하기

### 사전 요구사항
- Node.js 18.0.0 이상
- Java 17 (Eclipse Temurin 추천)
- Docker Desktop
- IDE
  - VSCode (프론트엔드)
  - IntelliJ IDEA (백엔드)

### 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/ready-oun/bfind.git
cd bfind
```

2. 프론트엔드 설정
```bash
cd frontend
npm install
```

3. 백엔드 설정
```bash
cd backend
./gradlew build
```

4. 환경 변수 설정 (예정)
```bash
# frontend/.env
cp frontend/.env.example frontend/.env

# backend/src/main/resources/application-dev.yml
cp backend/src/main/resources/application-dev.yml.example backend/src/main/resources/application-dev.yml
```

5. Docker 컨테이너 실행 (예정)
```bash
docker-compose up -d
```

### 개발 서버 실행

1. 프론트엔드 개발 서버
```bash
cd frontend
npm run dev
```

2. 백엔드 개발 서버
```bash
cd backend
./gradlew bootRun
```

### 개발 프로세스 및 로드맵
1. 기획 및 요구사항 정의: 상세 기능 명세, 와이어프레임, 데이터 모델링, API 문서 작성
2. 디자인 및 프로토타입 제작: UI/UX 프로토타입 및 API 계약 수립
3. 구현:
   - 핵심 기능(콘텐츠 뷰어, DRM, 결제 시스템) 및 차별화 기능(커스텀 스토리, 리워드, 소장권)
   - CMS 및 정산 시스템 통합
4. 테스트 및 코드 리뷰: 단위, 통합, e2e 테스트와 정기 코드 리뷰
5. 배포 및 모니터링: 클라우드 배포, CI/CD 파이프라인, 실시간 모니터링 도구 도입
6. 피드백 및 개선: 사용자 피드백 수집 및 기능 개선

## API 문서 (예정)
- Swagger UI: http://localhost:8080/swagger-ui.html
- API 문서: [docs/api/api-docs.md](docs/api/api-docs.md)

## 데이터베이스 (예정)
- ERD: [docs/database/database-docs.md](docs/database/database-docs.md)
- 마이그레이션: backend/src/main/resources/db/migration

## 아키텍처
- 상세 설계: [docs/architecture/architecture-docs.md](docs/architecture/architecture-docs.md)
- 인프라 구성: [infrastructure/dockerGuide.md](infrastructure/dockerGuide.md)

## 개발 가이드 (예정)
- 코딩 컨벤션
- Git 브랜치 전략
- 커밋 메시지 규칙
- PR 템플릿

## 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스
MIT License - [LICENSE](LICENSE)

## 연락처
- 프로젝트 리드: heeyn.lim@gmail.com
- GitHub: @ready-oun

---

## English Version

### Overview
This project aims to build a secure and scalable platform for webtoons and web novels. Through advanced DRM protection, various payment options, reader rewards, and custom story proposal features, we implement an innovative system that provides permanent ownership rights beyond simple usage.

### Core Features
- **Backend Services:** 
  - API Server: Core business logic processing including payments, DRM, custom story creation
  - CMS & Settlement Engine: Content management and internal financial transaction management
- **Database Layer:** Integration of relational DB, NoSQL, and Elasticsearch
- **Security Layer:** Enhanced DRM, OAuth2/JWT-based authentication, blockchain authentication (optional)
- **Deployment Infrastructure:** Cloud-based containerization and CI/CD pipeline

## Project Structure
```
bfind/
├── frontend/          # React frontend
├── backend/           # Spring Boot backend
├── infrastructure/    # Infrastructure setup
│   ├── docker/       # Docker configuration
│   └── terraform/    # (Future) IaC configuration
└── docs/             # Project documentation
    ├── architecture/ # Architecture docs
    ├── api/          # API docs
    ├── database/     # DB design docs
    └── setup/        # Setup guides
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- MUI (Material-UI)
- Redux Toolkit
- Vite

### Backend
- Spring Boot 3.x
- Kotlin
- Spring Data JPA
- Spring Security
- PostgreSQL
- Redis (Caching)

### Infrastructure
- Docker
- Docker Compose
- AWS (Planned)
- GitHub Actions (CI/CD) (Planned)

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- Java 17 (Eclipse Temurin recommended)
- Docker Desktop
- IDE
  - VSCode (Frontend)
  - IntelliJ IDEA (Backend)

### Development Setup

1. Clone Repository
```bash
git clone https://github.com/ready-oun/bfind.git
cd bfind
```

2. Frontend Setup
```bash
cd frontend
npm install
```

3. Backend Setup
```bash
cd backend
./gradlew build
```

4. Environment Variables Setup (Planned)
```bash
# frontend/.env
cp frontend/.env.example frontend/.env

# backend/src/main/resources/application-dev.yml
cp backend/src/main/resources/application-dev.yml.example backend/src/main/resources/application-dev.yml
```

5. Run Docker Containers (Planned)
```bash
docker-compose up -d
```

### Running Development Servers

1. Frontend Development Server
```bash
cd frontend
npm run dev
```

2. Backend Development Server
```bash
cd backend
./gradlew bootRun
```

### Development Process and Roadmap
1. Planning and Requirements: Detailed feature specifications, wireframes, data modeling, API documentation
2. Design and Prototyping: UI/UX prototypes and API contract establishment
3. Implementation:
   - Core features (content viewer, DRM, payment system) and differentiating features (custom stories, rewards, ownership rights)
   - CMS and settlement system integration
4. Testing and Code Review: Unit, integration, e2e tests and regular code reviews
5. Deployment and Monitoring: Cloud deployment, CI/CD pipeline, real-time monitoring tools
6. Feedback and Improvement: User feedback collection and feature enhancement

## API Documentation (Planned)
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: [docs/api/api-docs.md](docs/api/api-docs.md)

## Database (Planned)
- ERD: [docs/database/database-docs.md](docs/database/database-docs.md)
- Migration: backend/src/main/resources/db/migration

## Architecture
- Detailed Design: [docs/architecture/architecture-docs.md](docs/architecture/architecture-docs.md)
- Infrastructure Setup: [infrastructure/dockerGuide.md](infrastructure/dockerGuide.md)

## Development Guide (Planned)
- Coding Conventions
- Git Branch Strategy
- Commit Message Rules
- PR Templates

## Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
MIT License - [LICENSE](LICENSE)

## Contact
- Project Lead: heeyn.lim@gmail.com
- GitHub: @ready-oun
