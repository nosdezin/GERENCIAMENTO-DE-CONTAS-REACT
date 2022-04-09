import { useState } from "react";
import Botao from "./Botao";
import UserCard from "./UserCard";

export default function CRUD({ DataBase, SetDataBase }) {
  const [listageAccountDiv, setListageAccountDiv] = useState(false);
  const [AccountIDSelected, setAccountIDSelected] = useState(0);

  const btnListage = () => {
    if (listageAccountDiv) {
      setListageAccountDiv(!listageAccountDiv);
    } else {
      setListageAccountDiv(!listageAccountDiv);
    }
  };

  const selectPerson = (id) => setAccountIDSelected(id);

  const DeleteAccount = () => {
    const newDB = DataBase.filter((user) => {
      if (user.id === AccountIDSelected) {
        return false;
      } else {
        return true;
      }
    });

    SetDataBase(newDB);
  };

  return (
    <div style={{ border: "5px solid #000", width: "38%", borderLeft: "0" }}>
      <h2 style={{ padding: "10px" }}>CRUD</h2>
      <div>
        <Botao BtnText="Mostrar lista de contas" BtnClick={btnListage} />
        {listageAccountDiv && (
          <div>
            <div
              style={{
                border: "5px solid #000",
                borderRight: "0",
                borderLeft: "0",
              }}
            >
              {DataBase.map((user) => {
                return (
                  <UserCard
                    user={user}
                    handleSection={() => selectPerson(user.id)}
                    key={user.id}
                  />
                );
              })}
            </div>
            <Botao BtnText="Criar uma conta" />
            <Botao BtnText="Deletar conta" BtnClick={DeleteAccount} />
          </div>
        )}
      </div>
    </div>
  );
}
