import { useState, useEffect } from "react";
import Botao from "./Botao";
import InputText from "./InputText";
import UserCard from "./UserCard";
import { dbFB } from "./Firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function CRUD({ DataBase, SetDataBase }) {
  const [listageAccountDiv, setListageAccountDiv] = useState(false);
  const [painelCreateAccountDiv, setPainelCreateAccountDiv] = useState(false);
  const [AccountIDSelected, setAccountIDSelected] = useState(0);
  const [NewNameAccount, setNewNameAccount] = useState("");
  const [NewPasswordAccount, setNewPasswordAccount] = useState("");
  const [NewTypeUser, setNewTypeUser] = useState("");
  const usersColletionRef = collection(dbFB, "contas");
  const [db, setDB] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColletionRef);
      setDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();

    setNewTypeUser("comum");
  }, [db]);

  const deleteAccount = async () => {
    const id = AccountIDSelected;
    const itemDoc = doc(dbFB, "contas", id);
    // console.log(itemDoc);
    await deleteDoc(itemDoc);
  };

  const btnDiv = (func, state) => {
    if (state) {
      func(!state);
    } else {
      func(!state);
    }
  };

  const selectPerson = (id) => setAccountIDSelected(id);

  const CreateAccount = async () => {
    const AccountHandle = {
      nome: NewNameAccount,
      senha: NewPasswordAccount,
      UserType: NewTypeUser,
      id: db.length + 1,
    };
    console.log(AccountHandle);
    await addDoc(usersColletionRef, AccountHandle);
    // setDB([...db, AccountHandle]);
    setNewNameAccount("");
    setNewPasswordAccount("");
    setNewTypeUser("");
  };

  return (
    <div className="CRUD_painel">
      <h2 style={{ padding: "10px" }}>CRUD</h2>
      <div>
        <Botao
          BtnText={
            !listageAccountDiv
              ? "Mostrar lista de contas"
              : "Ocultar lista de contas"
          }
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
              {db.map((user) => {
                return (
                  <UserCard
                    user={user}
                    handleSection={() => selectPerson(user.id)}
                    key={user.id}
                  />
                );
              })}
            </div>
            <p>Id selecionado: {AccountIDSelected}</p>
            <Botao
              BtnText={
                !painelCreateAccountDiv
                  ? "Mostrar Painel de criação de conta"
                  : "Ocultar Painel de criação de conta"
              }
              BtnClick={() =>
                btnDiv(setPainelCreateAccountDiv, painelCreateAccountDiv)
              }
            />
            <Botao BtnText="Deletar conta" BtnClick={deleteAccount} />

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
                  <option disabled>Escolha o tipo de usuario</option>
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
