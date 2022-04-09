import React from "react";

export default function InputText({ funcState, ValueState, placeholderText }) {
  return (
    <>
      <input
        className="InputUI"
        onChange={(e) => {
          funcState(e.target.value);
        }}
        value={ValueState}
        type="text"
        placeholder={placeholderText}
      />
    </>
  );
}
