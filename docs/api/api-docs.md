# BIND API Documentation

## 목차
- [개요](#개요)
- [인증 API](#인증-api)
- [결제 API](#결제-api)
- [콘텐츠 API](#콘텐츠-api)
- [사용자 API](#사용자-api)
- [공통 응답](#공통-응답)
- [에러 코드](#에러-코드)

## 개요

### Base URL
```
개발: http://localhost:8000/api/v1
스테이징: https://api.stage.bind.com/v1
프로덕션: https://api.bind.com/v1
```

### 인증
- Bearer Token 방식 사용
- 모든 인증 필요 API는 헤더에 토큰 포함 필요
```
Authorization: Bearer {token}
```

### 공통 요청 헤더
```
Content-Type: application/json
Accept: application/json
```

## 인증 API

### 회원가입
```http
POST /auth/signup
```

**Request Body**
```json
{
  "email": "string",     // 이메일 (필수)
  "password": "string",  // 비밀번호 (필수, 최소 8자)
  "name": "string",      // 이름 (필수, 2-20자)
  "phone": "string"      // 전화번호 (선택)
}
```

**Response**
```json
{
  "status": "success",
  "data": {
    "userId": "string",
    "token": "string",
    "name": "string"
  }
}
```

### 로그인
```http
POST /auth/login
```

**Request Body**
```json
{
  "email": "string",     // 이메일 (필수)
  "password": "string"   // 비밀번호 (필수)
}
```

**Response**
```json
{
  "status": "success",
  "data": {
    "token": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "points": number,
      "coins": number
    }
  }
}
```

## 결제 API

### 결제 생성
```http
POST /payments
```

**Request Body**
```json
{
  "productId": "string",      // 상품 ID (필수)
  "paymentMethod": "string",  // 결제 수단 (필수)
  "usePoints": number,        // 사용 포인트 (선택)
  "amount": number           // 결제 금액 (필수)
}
```

**Response**
```json
{
  "status": "success",
  "data": {
    "paymentId": "string",
    "orderNumber": "string",
    "amount": number,
    "pgToken": "string"    // PG사 결제 토큰
  }
}
```

### 결제 완료
```http
POST /payments/{paymentId}/complete
```

**Request Body**
```json
{
  "pgToken": "string",    // PG사 결제 토큰 (필수)
  "paymentKey": "string"  // PG사 결제 키 (필수)
}
```

**Response**
```json
{
  "status": "success",
  "data": {
    "paymentId": "string",
    "status": "COMPLETED",
    "coins": number,      // 지급된 코인
    "points": number      // 적립된 포인트
  }
}
```

## 공통 응답

### 성공 응답
```json
{
  "status": "success",
  "data": {
    // 응답 데이터
  }
}
```

### 에러 응답
```json
{
  "status": "error",
  "error": {
    "code": "string",
    "message": "string",
    "details": {} // 추가 에러 정보 (선택)
  }
}
```

## 에러 코드

| 코드 | 설명 | HTTP 상태 코드 |
|------|------|----------------|
| AUTH_REQUIRED | 인증 필요 | 401 |
| INVALID_TOKEN | 유효하지 않은 토큰 | 401 |
| TOKEN_EXPIRED | 만료된 토큰 | 401 |
| NOT_FOUND | 리소스를 찾을 수 없음 | 404 |
| VALIDATION_ERROR | 요청 데이터 검증 실패 | 400 |
| INSUFFICIENT_POINTS | 포인트 부족 | 400 |
| PAYMENT_FAILED | 결제 실패 | 400 |
| SERVER_ERROR | 서버 에러 | 500 |
