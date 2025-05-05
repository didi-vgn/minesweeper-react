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
const errorHandler = require("./src/errors/errorHandler");
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const { shutDown } = require("./src/utils/shutDown");

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

app.set("trust proxy", 1);
const cors = require("cors");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new new AppError(
            `Origin not allowed by CORS.`,
            "CORS_NOT_ALLOWED",
            403
          )()
        );
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

process.on("SIGTERM", () => shutDown("SIGTERM"));
process.on("SIGINT", () => shutDown("SIGINT"));

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Listening on port 3000...`);
});
