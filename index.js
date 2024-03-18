const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const io = require("./src/utils/sockets/socket")(http);
const PORT = process.env.PORT || 3000;
require("./db/mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const userRoutes = require("./src/components/users/users.route");
const groupRoutes = require("./src/components/groupChat/groupChat.route");

app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
