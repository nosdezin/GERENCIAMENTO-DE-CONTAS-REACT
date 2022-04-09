import "./App.css";
import Form from "./components/Form";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { dbFB } from "./components/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [loggin, setLoggin] = useState(false);
  const [db, setDB] = useState([]);
  const [user, setUser] = useState({});
  const [senhaLogin, setSenhaLogin] = useState("");
  const [nomeLogin, setNomeLogin] = useState("");
  const [senhaRegister, setSenhaRegister] = useState("");
  const [nomeRegister, setNomeRegister] = useState("");
  const usersColletionRef = collection(dbFB, "contas");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColletionRef);
      setDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

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

  const handleRegisterClick = async () => {
    const AccountHandle = {
      nome: nomeRegister,
      senha: senhaRegister,
      UserType: "comum",
      id: db.length + 1,
    };

    await addDoc(usersColletionRef, AccountHandle);
  };

  return (
    <div>
      {loggin ? (
        <Dashboard user={user} CloseBoard={handleCloseClick} />
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
