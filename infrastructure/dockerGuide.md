# Docker Guide
## 1. 개발 환경 실행

```bash
# 개발 환경 시작
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 특정 서비스만 재시작
docker-compose restart frontend
docker-compose restart backend

# 로그 확인
docker-compose logs -f frontend
docker-compose logs -f backend
```

## 2. 프로덕션 환경 실행
```bash
# 프로덕션 빌드 및 실행
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# 컨테이너 상태 확인
docker-compose ps

# 컨테이너 중지
docker-compose down
```
