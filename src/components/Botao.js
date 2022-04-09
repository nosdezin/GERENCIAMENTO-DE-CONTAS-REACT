import React from "react";

export default function Botao({ BtnText, BtnClick }) {
  return (
    <>
      <button className="BtnUI" onClick={BtnClick}>
        {BtnText}
      </button>
    </>
  );
}
