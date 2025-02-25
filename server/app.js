const express = require("express");
const { PrismaClient } = require("@prisma/client");
prisma = new PrismaClient();
const userRouter = require("./src/routers/userRouter");
const gameRouter = require("./src/routers/gameRouter");
const authRouter = require("./src/routers/authRouter");
const achievementRouter = require("./src/routers/achievementRouter");

const app = express();
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/auth", authRouter);
app.use("/achievements", achievementRouter);

// console.log(require("crypto").randomBytes(32).toString("hex"));

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

// console.log(prisma);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
