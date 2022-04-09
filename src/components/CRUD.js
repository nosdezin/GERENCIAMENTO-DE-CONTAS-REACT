import { useState } from "react";
import Botao from "./Botao";
import InputText from "./InputText";
import UserCard from "./UserCard";

export default function CRUD({ DataBase, SetDataBase }) {
  const [listageAccountDiv, setListageAccountDiv] = useState(false);
  const [painelCreateAccountDiv, setPainelCreateAccountDiv] = useState(false);
  const [AccountIDSelected, setAccountIDSelected] = useState(0);
  const [NewNameAccount, setNewNameAccount] = useState("");
  const [NewPasswordAccount, setNewPasswordAccount] = useState("");
  const [NewTypeUser, setNewTypeUser] = useState("");

  const btnDiv = (func, state) => {
    if (state) {
      func(!state);
    } else {
      func(!state);
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

  const CreateAccount = () => {
    const AccountHandle = {
      nome: NewNameAccount,
      senha: NewPasswordAccount,
      UserType: NewTypeUser,
      id: DataBase.length + 1,
    };

    SetDataBase([...DataBase, AccountHandle]);
    setNewNameAccount("");
    setNewPasswordAccount("");
    setNewTypeUser("");
  };

  return (
    <div className="CRUD_painel">
      <h2 style={{ padding: "10px" }}>CRUD</h2>
      <div>
        <Botao
          BtnText="Mostrar lista de contas"
          BtnClick={() => btnDiv(setListageAccountDiv, listageAccountDiv)}
        />
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
            <Botao
              BtnText="Mostrar Painel de criação de conta"
              BtnClick={() =>
                btnDiv(setPainelCreateAccountDiv, painelCreateAccountDiv)
              }
            />
            <Botao BtnText="Deletar conta" BtnClick={DeleteAccount} />

            {painelCreateAccountDiv && (
              <div className="painel_create_account">
                <InputText
                  placeholderText="Digite o nome do Usuario"
                  ValueState={NewNameAccount}
                  funcState={setNewNameAccount}
                />
                <InputText
                  placeholderText="Digite a senha do Usuario"
                  ValueState={NewPasswordAccount}
                  funcState={setNewPasswordAccount}
                />
                <select
                  className="UserType_Input"
                  onClick={(e) => setNewTypeUser(e.target.value)}
                >
                  <option value="comum">Comum</option>
                  <option value="admin">admin</option>
                </select>
                <Botao BtnText="Criar" BtnClick={CreateAccount} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
