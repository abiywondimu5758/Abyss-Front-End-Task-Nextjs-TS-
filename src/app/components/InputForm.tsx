import React, { useState } from "react";
import "./InputForm.css";

interface InputFormProps {
  Value?: string; // Initial value for the input (if any)
  onSubmit: (text: string) => void; // Function to handle form submission
  onClose?: () => void; // Optional function to handle form closing
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, Value, onClose }) => {
  const [inputValue, setInputValue] = useState(Value || "");

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onSubmit(inputValue);
      setInputValue("");
    }
  };
  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Category name"
      />{" "}
      <div className="buttons">
        <button className="delete-button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M10.586 9.95 14.879 13.1a1 1 0 0 1 0 1.414.998.998 0 0 1-1.414 0L9.172 11.364 4.88 15.657a.998.998 0 0 1-1.414 0 1 1 0 0 1 0-1.414l4.293-4.293L3.464 4.879a.998.998 0 0 1 0-1.414 1 1 0 0 1 1.414 0L8.95 7.636l4.293-4.293a1 1 0 0 1 1.414 0 .998.998 0 0 1 0 1.414L10.586 9.95z" />
          </svg>
        </button>
        <button className="add-button" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M7 0h2v16H7z" />
            <path d="M0 7v2h16V7z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InputForm;
