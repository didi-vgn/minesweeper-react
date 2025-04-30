require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
prisma = new PrismaClient();
const userRouter = require("./src/routers/userRouter");
const gameRouter = require("./src/routers/gameRouter");
const authRouter = require("./src/routers/authRouter");
const achievementRouter = require("./src/routers/achievementRouter");
const rateLimit = require("express-rate-limit");
const AppError = require("./src/errors/AppError");

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    const err = new AppError(
      `Too many requests, please try again later.`,
      "TOO_MANY_REQUESTS",
      429
    );
    next(err);
  },
});

const app = express();
const cors = require("cors");
const errorHandler = require("./src/errors/errorHandler");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/auth", authRouter);
app.use("/achievements", achievementRouter);

process.on("SIGTERM", async () => {
  console.log("Disconnecting from database...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Disconnecting from database...");
  await prisma.$disconnect();
  process.exit(0);
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
