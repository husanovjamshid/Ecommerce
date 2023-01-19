const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, (_) => console.log(`🚀SERVER READY AT PORT ${PORT}`));
