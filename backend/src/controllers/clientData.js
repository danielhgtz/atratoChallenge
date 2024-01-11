// const myJson = require("../../../data/data.json");
let data = require("../../../data/data.js");
const { default: axios } = require("axios");

const GetClientData = async (req, res) => {
  return res.status(200).send(data);
};

const CreateClients = async (req, res) => {
  try {
    const response = await axios.get(`https://randommer.io/api/Card`, {
      headers: {
        "X-Api-Key": "f3b80c8d2c6a478e89445e919e625fff",
      },
    });

    const fakeData = {
      name: "FakeName",
      middleName: "FakeMiddleName",
      fLastName: "FakeFLastName",
      sLastName: "FakeSLastName",
      status: "pendiente",
      email: "fakeEmail",
      birthday: "1998-02-12",
      phone: "3333333333",
      assignedAnalyst: "Daniel",
      cardInfo: {
        number: response.data.cardNumber,
        cvv: response.data.cvv,
        pin: response.data.pin,
        expiration: response.data.date,
      },
    };
    data.push(fakeData);

    return res
      .status(200)
      .send({ message: "User created Succesfully", data: response.data });
  } catch (error) {
    console.log(error);
    // logger.warn(`CreateClient ${error}`)
    return res.status(500).send("Internal Server Error");
  }
};

const DeleteClient = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Missing identification param");
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].email === email) {
        data.splice(i, 1);
      }
    }
    res.status(200).send(`Client [${email}] succesfully deleted`);
  } catch (error) {}
};

module.exports = { GetClientData, CreateClients, DeleteClient };
