import React from "react";

export default function UserCard({ user, handleSection }) {
  return (
    <div onClick={handleSection}>
      <strong>Nome: </strong> {user.nome} - <strong>Senha: </strong>
      {user.senha} - <strong>Tipo de Usuario: </strong>
      {user.UserType} - <strong>ID:</strong>
      {user.id}
    </div>
  );
}
