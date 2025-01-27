const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../config/database");

// passport.use(
//  new LocalStrategy(async(username, password, done) => {
//   try {

//   }
//  })
// )
