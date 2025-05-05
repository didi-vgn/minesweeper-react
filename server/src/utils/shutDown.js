exports.shutDown = async (signal) => {
  console.log(`Received ${signal}. Disconnecting from database...`);
  await prisma.$disconnect();
  process.exit(0);
};
