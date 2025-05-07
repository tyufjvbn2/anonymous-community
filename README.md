# Anonymous Community Board

익명 게시판 및 키워드 알림 기능이 있는 커뮤니티 서비스입니다.

## 기술 스택

- NestJS
- TypeScript
- MySQL
- TypeORM
- class-validator
- class-transformer

## 기능

- 게시글 CRUD (제목, 내용, 작성자, 비밀번호)
- 댓글 기능 (대댓글 지원)
- 게시글 검색 (제목, 작성자)
- 키워드 알림 기능

## 설치 및 실행 방법

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
   `.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 입력합니다:

```
NODE_ENV=development
PORT=원하는 포트
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=mysql_username
DB_PASSWORD=mysql_password
DB_DATABASE=anonymous_community
```

4. 데이터베이스 생성

```sql
CREATE DATABASE anonymous_community;
```

5. 데이터베이스 마이그레이션 실행

```bash
npm run migration:run
```

6. 서버 실행

```bash
npm run start:dev
```

## API 엔드포인트

### 게시글

- GET /posts - 게시글 목록 조회 (페이지네이션)
- POST /posts - 게시글 작성
- PUT /posts/:id - 게시글 수정
- DELETE /posts/:id - 게시글 삭제
- GET /posts/search - 게시글 검색 (제목, 작성자)

### 댓글

- GET /posts/:postId/comments - 댓글 목록 조회 (페이지네이션)
- POST /posts/:postId/comments - 댓글 작성
- POST /posts/:postId/comments/:commentId/replies - 대댓글 작성

## 데이터베이스 스키마

데이터베이스 스키마는 `src/database/migrations` 디렉토리에 있습니다.
