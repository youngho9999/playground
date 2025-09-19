// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// 여러 속담을 조합하여 긴 문자열을 만듭니다.
const koreanProverbs = [
  '낮말은 새가 듣고 밤말은 쥐가 듣는다.',
  '가는 말이 고와야 오는 말이 곱다.',
  '티끌 모아 태산.',
  '개천에서 용 난다.',
  '호랑이도 제 말하면 온다.',
  '벼룩도 낯짝이 있다.',
  '구슬이 서 말이라도 꿰어야 보배다.',
  '서당개 삼 년이면 풍월을 읊는다.',
  '원숭이도 나무에서 떨어진다.',
  '우물 안 개구리.',
  '돌다리도 두들겨 보고 건너라.'
];

const longKoreanString = koreanProverbs.join(' ').repeat(20); // 50번 반복하여 매우 긴 문자열 생성

// SSE 전송 API
app.get('/stream-sse', (req, res) => {
  // SSE를 위한 필수 헤더 설정
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const chunkSize = 40; // 100글자씩 잘라서 보낼 조각 크기
  let index = 0;

  const intervalId = setInterval(() => {
    const chunk = longKoreanString.substring(index, index + chunkSize);

    if (chunk.length > 0) {
      // 각 조각을 'data:' 필드에 담아 이벤트로 보냅니다.
      res.write(`data: ${chunk}\n\n`);
      index += chunkSize;
    } else {
      clearInterval(intervalId);
      res.end(); // 모든 조각을 보낸 후 스트림 종료
      console.log('SSE 스트림 전송 완료!');
    }
  }, 100); // 50ms마다 조각 전송

  req.on('close', () => {
    clearInterval(intervalId);
    console.log('클라이언트 연결이 끊어졌습니다.');
  });
});



// 게시글 목록 조회
app.get("/api/posts", async (req, res) => {
  try {
    const data = await fs.readFile("./posts.json", "utf8");
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    res.json([]);
  }
});

// 게시글 작성
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required." });
    }

    const data = await fs.readFile("./posts.json", "utf8");
    const posts = JSON.parse(data);

    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      title,
      content,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);

    await fs.writeFile("./posts.json", JSON.stringify(posts, null, 2));

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// 이벤트 목록 조회
app.get("/api/event", (req, res) => {
  res.json([
    { id: 1, name: "오늘의 이벤트", date: "2025-09-15" },
    { id: 2, name: "특별 할인", date: "2025-09-16" },
  ]);
});

// 좋아요 수 증가
app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile("./posts.json", "utf8");
    const posts = JSON.parse(data);
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likeCount = (post.likeCount || 0) + 1;
    post.updatedAt = new Date().toISOString();

    await fs.writeFile("./posts.json", JSON.stringify(posts, null, 2));

    res.json({ likeCount: post.likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating like count" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
