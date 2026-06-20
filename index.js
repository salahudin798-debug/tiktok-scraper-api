const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/submit-fanedit", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { tiktokUrl } = req.body;
  if (!tiktokUrl) return res.status(400).json({ error: "tiktokUrl chahiye" });
  try {
    const infoRes = await axios.get(`https://api.tikwm.com/video/?url=${tiktokUrl}`);
    const data = infoRes.data;
    return res.json({
      success: true,
      videoUrl: data.data?.play,
      cover: data.data?.cover,
      author: data.data?.author?.unique_id
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chal gaya: ${PORT}`));
