const prisma = require("../config/database");

exports.findManyUsers = async (req, res) => {
  try {
    const users = await prisma.findManyUsers();
    if (users.length === 0) {
      return res.status(200).json({ message: "No users found.", users: [] });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

///needs to be separated
// exports.findUsersByNickname = async (req, res) => {
//   const query = req.query.nickname;

//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         nickname: {
//           contains: query || "",
//           mode: "insensitive",
//         },
//       },
//       select: {
//         id: true,
//         username: true,
//         nickname: true,
//         role: true,
//       },
//     });

//     if (users.length === 0) {
//       return res.status(200).json({ message: "No users found.", users: [] });
//     }
//     return res.status(200).json({ users });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ error: err.message });
//   }
// };

// ///everything below needs to be separated
// exports.deleteUser = async (req, res) => {
//   const { nickname } = req.params;
//   try {
//     const user = await prisma.user.findUnique({ where: { nickname } });
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }
//     await prisma.user.delete({
//       where: {
//         nickname,
//       },
//     });
//     return res.status(200).json({ message: "User deleted." });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.updateUserNickname = async (req, res) => {
//   const { nickname } = req.params;
//   try {
//     const user = await prisma.user.findUnique({ where: { nickname } });
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const updatedUser = await prisma.user.update({
//       where: {
//         nickname,
//       },
//       data: {
//         nickname: req.body.newNickname,
//       },
//     });
//     return res
//       .status(200)
//       .json({ message: "Nickname updated.", user: updatedUser });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.updateUserPassword = async (req, res) => {
//   const { nickname } = req.params;
//   const { newPassword } = req.body;

//   /////bcrypt password

//   try {
//     const user = await prisma.user.findUnique({ where: { nickname } });
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     await prisma.user.update({
//       where: {
//         nickname,
//       },
//       data: {
//         password: newPassword,
//       },
//     });
//     return res.status(200).json({ message: "Password updated." });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ error: err.message });
//   }
// };
