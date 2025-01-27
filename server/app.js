const express = require("express");
const { PrismaClient } = require("@prisma/client");
prisma = new PrismaClient();
const userRouter = require("./src/routers/userRouter");
const gameRouter = require("./src/routers/gameRouter");
const authRouter = require("./src/routers/authRouter");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/auth", authRouter);

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

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.update({
///create
// data: {
//   username: "adminaccount1",
//   nickname: "admin1",
//   role: "ADMIN",
//   password: {
//     create: {
//       password: "adminpassword1",
//     },
//   },
// },
// include: {
//   password: true,
// },

///filter
// where: {
//   username: {
//     contains: "Admin",
//     mode: "insensitive",
//   },
// },

///find scores for gamemode x
// where: {
//   username: "some user",
//   scores: {
//     some: {
//       gameMode: "EXPERT",
//     },
//   },
// },
// include: {
//   scores: true,
// }

///update
//     where: {
//       nickname: "admin",
//     },
//     data: {
//       username: "notadmin",
//       nickname: "notadmin",
//     },
//   });
//   console.log(user);
// }

// main()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
