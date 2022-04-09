import "./App.css";
import Form from "./components/Form";
import { useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggin, setLoggin] = useState(false);
  const [db, setDB] = useState([
    { nome: "Edson", senha: "edson", UserType: "comum", id: 1 },
    { nome: "Admin", senha: "admin", UserType: "admin", id: 2 },
  ]);
  const [user, setUser] = useState({});
  const [senhaLogin, setSenhaLogin] = useState("");
  const [nomeLogin, setNomeLogin] = useState("");
  const [senhaRegister, setSenhaRegister] = useState("");
  const [nomeRegister, setNomeRegister] = useState("");

  const VerificationDBuser = (DatabaseUser) => {
    if (DatabaseUser.nome === nomeLogin && DatabaseUser.senha === senhaLogin) {
      setUser({
        nome: nomeLogin,
        senha: senhaLogin,
        UserType: DatabaseUser.UserType,
        id: DatabaseUser.id,
      });
      setLoggin(true);
    } else {
      setNomeLogin("");
      setSenhaLogin("");
    }
  };

  const handleLoginClick = () => db.map((DBuser) => VerificationDBuser(DBuser));

  const handleCloseClick = () => setLoggin(false);

  const handleRegisterClick = () => {
    const AccountHandle = {
      nome: nomeRegister,
      senha: senhaRegister,
      UserType: "comum",
      id: db.length + 1,
    };

    setDB([...db, AccountHandle]);
  };

  return (
    <div>
      {loggin ? (
        <Dashboard
          user={user}
          DataBase={db}
          CloseBoard={handleCloseClick}
          SetDataBase={setDB}
        />
      ) : (
        <Form
          nomeLogin={nomeLogin}
          senhaLogin={senhaLogin}
          setNomeLogin={setNomeLogin}
          setSenhaLogin={setSenhaLogin}
          handleLoginClick={handleLoginClick}
          nomeRegister={nomeRegister}
          senhaRegister={senhaRegister}
          setNomeRegister={setNomeRegister}
          setSenhaRegister={setSenhaRegister}
          handleRegisterClick={handleRegisterClick}
        />
      )}
    </div>
  );
}

export default App;
