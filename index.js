import { kv } from '@vercel/kv';

const express = require("express");
const bodyParser = require('body-parser');


const app = express();

app.use(cors());

app.get("/api/store", async (req, res) => {
  console.log(req.query.key);

  let data = await kv.get(req.query.key);
  console.log(data);
  if (data === null) {
    return res.status(404).json({
      msg: 'Key Not Found'
    })
  }

  // 如果数据存在，返回 200 OK 并返回数据
  return res.status(200).json(data);
});


app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL-encoded 请求体

app.post('/api/store', async (req, res) => {

  const { key, value } = req.body;

  try {
    await kv.set(key, value);
    return res.status(201).json({ msg: 'Key-value pair added successfully' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error adding key-value pair' }); 
  }

});

// Export the Express API
module.exports = app;