import axios from "axios";
import dotenv from "dotenv";

import "./card.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

dotenv.config();

const removeItem = (email) => {
  try {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_PORT}/clients`,
      params: { email: email },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

export const Card = ({ data }) => {
  const expirationDate = data && new Date(data?.cardInfo?.expiration);

  return (
    <div className="card-main-div">
      <div className="card-title-div">
        <div className="card-headers">
          <AccountCircleIcon fontSize="large" />
          <p className="card-title">
            {data?.name} {data?.middleName} {data?.fLastName} {data?.sLastName}
          </p>
          <p>ID: {data?.id}</p>
        </div>
        <select className="card-selector">
          <option disabled={true}>{data?.status}</option>
          <option value="pending">Pendiente</option>
          <option value="inProgress">En Proceso</option>
        </select>
        <button className="card-delete" onClick={removeItem(data?.email)}>
          Remover
        </button>
      </div>
      <div className="card-info-div">
        <div className="card-inner-div-1">
          <p className="card-subtitle">MAIL:</p>
          <p>{data?.email}</p>
          <p className="card-subtitle">FECHA DE NACIMIENTO:</p>
          <p>{data?.birthday}</p>
          <p className="card-subtitle">TELÉFONO:</p>
          {data?.phone}
          <p className="card-subtitle">ANALISTA ASIGNADO:</p>
          {data?.assignedAnalyst}
        </div>
        <div className="card-inner-div-2">
          <p className="card-subtitle">FULL NAME:</p>
          {`${data?.name} ${data?.fLastName} ${data?.sLastName}`}
          <p className="card-subtitle">CARD NUMBER:</p>
          {data?.cardInfo?.number}

          {/* //grid */}
          <div className="grid-container">
            <div>
              <p className="card-subtitle">CVV:</p>
              <p className="card-subtitle">PIN:</p>
              <p className="card-subtitle">EXP:</p>
            </div>
            <div>
              <p>{data?.cardInfo?.cvv}</p>
              <p>{data?.cardInfo?.pin}</p>
              <p>{`${expirationDate.getMonth()} / ${
                expirationDate.getFullYear() % 100
              }`}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="card-edit-btn">EDITAR</button>
    </div>
  );
};
