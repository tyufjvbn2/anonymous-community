# Anonymous Community Board

익명 커뮤니티 게시판 구현

## 기능

### 게시판 기능

- 게시글 작성, 수정, 삭제
- 제목과 작성자로 검색
- 비밀번호로 게시글 보호
- 댓글 및 대댓글 기능
- 페이징 처리

### 키워드 알림 기능

- 키워드 기반 게시글/댓글 알림
- 작성자별 키워드 등록

## 기술 스택

- NestJS
- TypeORM
- MySQL
- TypeScript
- Swagger (API 문서화)

## 요구사항

- Node.js 18.x 이상
- MySQL 8.x
- npm 또는 yarn

## 설치 및 설정

1. 저장소 클론

```bash
git clone [repository-url]
cd anonymous-community
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정
   `.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가합니다:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=anonymous_community
PORT=3000
NODE_ENV=development
```

4. 데이터베이스 생성

```sql
CREATE DATABASE anonymous_community;
```

5. 마이그레이션 실행

```bash
npm run migration:run
```

## 실행

개발 모드:

```bash
npm run start:dev
```

프로덕션 모드:

```bash
npm run build
npm run start:prod
```

## API 문서

Swagger UI를 통해 API 문서를 확인할 수 있습니다:

- 개발 서버: http://localhost:3000/api
- 프로덕션 서버: http://your-domain/api

API 문서에서는 다음 정보를 확인할 수 있습니다:

- 모든 API 엔드포인트 목록
- 각 API의 요청/응답 형식
- API 테스트 기능
- 데이터 모델 스키마

## API 엔드포인트

### 게시글

- `POST /posts` - 게시글 작성
- `GET /posts` - 게시글 목록 조회 (페이징)
- `GET /posts/search` - 게시글 검색
- `GET /posts/:id` - 게시글 상세 조회
- `PUT /posts/:id` - 게시글 수정
- `DELETE /posts/:id` - 게시글 삭제

### 댓글

- `POST /posts/:postId/comments` - 댓글 작성
- `GET /posts/:postId/comments` - 댓글 목록 조회 (페이징)

## 개발

### 마이그레이션

```bash
# 마이그레이션 생성
npm run migration:generate

# 마이그레이션 실행
npm run migration:run

# 마이그레이션 롤백
npm run migration:revert
```

### 린트

```bash
npm run lint
```

### 포맷팅

```bash
npm run format
```

## 라이선스

UNLICENSED
