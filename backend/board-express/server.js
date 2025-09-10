// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

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
  // 구현 로직
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
