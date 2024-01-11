import "./App.css";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { Card } from "./components/card/card";

dotenv.config();

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_PORT}/clients`,
      }).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateClient = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_PORT}/clients`,
    })
      .then((res) => {
        setUser(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((e) => {
        setUser("Error creating user");
      });
  };

  return (
    <div className="App">
      <div>
        {data && data.map((data) => <Card key={data.id} data={data} />)}
      </div>
      <div>
        <p>Add new Client</p>
        <button className="new-client" onClick={handleCreateClient}>
          +
        </button>
        {user}
      </div>
    </div>
  );
};

export default App;
