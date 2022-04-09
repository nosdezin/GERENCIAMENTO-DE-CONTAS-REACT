import Botao from "./Botao";
import InputText from "./InputText";

export default function Form({
  handleLoginClick,
  handleRegisterClick,
  setNomeLogin,
  setSenhaLogin,
  nomeLogin,
  senhaLogin,
  nomeRegister,
  senhaRegister,
  setNomeRegister,
  setSenhaRegister,
}) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Formulario</h1>
      <div className="Form_container">
        <div className="resgister_container">
          <InputText
            placeholderText="Digite seu nome"
            ValueState={nomeRegister}
            funcState={setNomeRegister}
          />
          <InputText
            placeholderText="Digite sua senha"
            ValueState={senhaRegister}
            funcState={setSenhaRegister}
          />
          <Botao BtnClick={handleRegisterClick} BtnText="Registrar-se" />
        </div>
        <div className="login_container">
          <InputText
            ValueState={nomeLogin}
            funcState={setNomeLogin}
            placeholderText="Digite seu nome"
          />
          <InputText
            ValueState={senhaLogin}
            funcState={setSenhaLogin}
            placeholderText="Digite sua senha"
          />

          <Botao BtnClick={handleLoginClick} BtnText="Logar-se" />
        </div>
      </div>
    </div>
  );
}
