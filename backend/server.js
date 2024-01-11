const express = require("express");
const cors = require("cors");
const {
  GetClientData,
  CreateClients,
  DeleteClient,
} = require("./src/controllers/clientData");
const app = express();
const PORT = 5000;

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

app.get("/clients", GetClientData);
app.post("/clients", CreateClients);
app.delete("/clients", DeleteClient);

app.get("/", function (req, res) {
  res.send("Hello from backend");
});
