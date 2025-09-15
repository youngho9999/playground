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
