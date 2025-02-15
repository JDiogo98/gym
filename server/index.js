const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 3001;

db.sequelize
  .sync() // Apaga e recria todas as tabelas
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar à DB:", err);
  });
