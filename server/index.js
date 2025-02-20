const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 3001;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar à DB:", err);
  });
