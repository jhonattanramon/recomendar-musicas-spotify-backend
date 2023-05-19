const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(
      "mongodb+srv://jhonattancosta:vCpqADHY00RbSb4n@cluster0.elsca2r.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log('conectado ao banco');
  } catch (e) {
    console.log(`erro: ${e}`);
  }
}
module.exports = main;
