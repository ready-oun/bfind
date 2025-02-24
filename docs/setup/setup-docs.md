# BIND 개발 환경 설정 가이드

## 목차
- [필수 요구사항](#필수-요구사항)
- [프로젝트 설정](#프로젝트-설정)
  - [프론트엔드 설정](#프론트엔드-설정)
  - [백엔드 설정](#백엔드-설정)
- [환경 변수 설정](#환경-변수-설정)
- [개발 서버 실행](#개발-서버-실행)
- [추가 설정](#추가-설정)

## 필수 요구사항

### 공통 요구사항
- Git
- Node.js 18.0.0 이상
- npm 9.0.0 이상 또는 yarn 1.22.0 이상
- VSCode (권장 에디터)

### 백엔드 추가 요구사항
- Docker Desktop
- PostgreSQL 15 이상
- Redis 7 이상

## 프로젝트 설정

### 프론트엔드 설정

1. 저장소 클론
```bash
git clone https://github.com/bind/frontend.git
cd frontend
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. VSCode 추천 확장 프로그램 설치
- ESLint
- Prettier
- TypeScript + JavaScript
- Material-UI Snippets
- GitLens

### 백엔드 설정

1. 저장소 클론
```bash
git clone https://github.com/bind/backend.git
cd backend
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. Docker 컨테이너 실행
```bash
docker-compose up -d
```

## 환경 변수 설정

### 프론트엔드 (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_GA_ID=your-ga-id
```

### 백엔드 (.env)
```env
# Server
PORT=8000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bind_db
DB_USER=bind_user
DB_PASSWORD=bind_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# AWS
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=bind-dev
```

## 개발 서버 실행

### 프론트엔드
```bash
# 개발 서버
npm run dev
# 또는
yarn dev

# 빌드
npm run build
# 또는
yarn build
```

### 백엔드
```bash
# 개발 서버
npm run dev
# 또는
yarn dev

# 마이그레이션
npm run migrate
# 또는
yarn migrate
```

## 추가 설정

### Git Hooks 설정
```bash
# Husky 설치
npm run prepare
# 또는
yarn prepare
```

### 코드 품질 검사
```bash
# 린트 검사
npm run lint
# 또는
yarn lint

# 타입 검사
npm run type-check
# 또는
yarn type-check
```

### 테스트 실행
```bash
# 단위 테스트
npm run test
# 또는
yarn test

# E2E 테스트
npm run test:e2e
# 또는
yarn test:e2e
```

### 문제 해결

#### 자주 발생하는 문제
1. 포트 충돌
   - 8000번 포트가 이미 사용 중인 경우 환경 변수에서 포트 변경

2. Docker 컨테이너 접근 오류
   - Docker Desktop이 실행 중인지 확인
   - 컨테이너 로그 확인: `docker-compose logs`

3. 데이터베이스 연결 오류
   - PostgreSQL 서비스 실행 상태 확인
   - 환경 변수 설정 확인

#### 도움말
추가 도움이 필요한 경우:
- 프로젝트 Wiki 참조
- Issue 생성
- 팀 리더에게 문의
