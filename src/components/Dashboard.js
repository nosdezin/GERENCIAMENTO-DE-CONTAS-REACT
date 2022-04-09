import React from "react";
import Botao from "./Botao";
import CRUD from "./CRUD";

export default function Dashboard({ user, CloseBoard }) {
  return (
    <div>
      <div>
        <Botao BtnText="X - Voltar" BtnClick={CloseBoard} />
      </div>

      <div>
        <h1>Bem-vindo {user.nome}</h1>
        <p>
          <strong>Nome:</strong> {user.nome}
        </p>
        <p>
          <strong>Senha:</strong> {user.senha}
        </p>
        <p>
          <strong>Tipo de Usuario:</strong> {user.UserType}
        </p>
      </div>

      {user.UserType === "admin" && (
        <CRUD/>
      )}
    </div>
  );
}
