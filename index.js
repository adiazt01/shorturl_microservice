import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { connectDB } from "./mongodb.js";
import { ObjectId } from "mongoose";
import { Url_shortener, url_shortenerValidate } from "./url_shortener.model.js";

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const validUrl = async (req, res, next) => {
  try {
    const validateUrl = url_shortenerValidate.parse(req.body);
    if (validateUrl) return next();
  } catch (error) {
    res.json({ error: "Invalid url" });
  }
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/shorturl", validUrl, async (req, res) => {
  const { original_url } = req.body;
  const newShortener = await new Url_shortener({
    original_url,
  }).save();

  res.json({
    original_url: newShortener.original_url,
    short_url: newShortener.short_url,
  });
});

app.get("/api/shorturl/:shorturl", async (req, res) => {
  const { shorturl } = req.params;
  if (isNaN(shorturl)) {
    return res.json({ error: "Invalid short url" });
  }
  try {
    const foundShortener = await Url_shortener.findOne({
      short_url: Number(shorturl),
    });
    if (!foundShortener) res.json({ error: "Not found short url" });
    res.redirect(foundShortener.original_url);
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/shorturl/:shorturl", async (req, res) => {
  const { shorturl } = req.params;
  if (isNaN(shorturl)) {
    return res.json({ error: "Invalid short url" });
  }
  try {
    const foundShortener = await Url_shortener.findOne({
      short_url: Number(shorturl),
    });
    if (!foundShortener) res.json({ error: "Not found short url" });
    res.redirect(foundShortener.original_url);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
  connectDB();
});
