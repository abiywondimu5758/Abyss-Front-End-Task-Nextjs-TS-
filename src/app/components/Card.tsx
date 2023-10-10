import React, { useState, useEffect, useRef } from "react";
import InputForm from "./InputForm";
import "./Card.css";

interface CardProps {
  data: CardData; // Data of the card including text, children, identifier, and type
  onDelete: (identifier: string) => void; // Function to handle card deletion
  onAddChild: (text: string, parentIdentifier: string, type?: string) => void; // Function to add child card
  level: number; // Depth level of the card in the hierarchy
  childrenLength: number | undefined; // Number of children for this card (if any)
}

export interface CardData {
  text: string; // Text content of the card
  children: CardData[]; // Array of child cards
  identifier: string; // Unique identifier for the card
  type?: string; // Type of the card (optional)
}
const Card: React.FC<CardProps> = ({
  data,
  onDelete,
  onAddChild,
  level,
  childrenLength,
}) => {
  // State variables
  const [showInput, setShowInput] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [inputValue, setInputValue] = useState(data.text);
  const [choice, setChoice] = useState(false);
  const [addChoice, setAddChoice] = useState("");
  const contentLineRef = useRef<HTMLDivElement>(null);
  const [contentLineWidth, setContentLineWidth] = useState<string | number>(
    "auto"
  );
  const [contentLineRefLength, setContentLineRefLength] = useState(0);

  // Function to save changes
  const handleSave = () => {
    setShowInput(false);
  };
  // Function to cancel card addition
  const handleCancelCard = () => {
    setIsAddingCard(false);
  };
  // Function to delete card
  const handleDelete = () => {
    if (data.children && data.children.length > 0) {
      data.children.forEach((child) => {
        onAddChild(child.text, child.identifier, child.type); // Add child to the parent
      });
    }
    onDelete(data.identifier);
  };
  // Function to add a child card
  const handleAddChild = () => {
    setChoice(true);
  };
  // Function to add a category
  const handleAddCategory = () => {
    setChoice(false);
    setAddChoice("Category");
    setIsAddingCard(true);
  };
  // Function to add a service
  const handleAddService = () => {
    setChoice(false);
    setAddChoice("Service");
    setIsAddingCard(true);
  };
  // Function to edit child
  const handleEditChild = () => {
    setShowInput(true);
  };
  // Function to handle child submission
  const handleAddChildSubmit = (childText: string) => {
    let x = data.identifier;
    setIsAddingCard(false);
    onAddChild(childText, x, addChoice);
    setContentLineRefLength((prev) =>
      contentLineRef.current
        ? (prev = contentLineRef.current?.offsetWidth)
        : prev
    );
  };

  useEffect(() => {
    const width = contentLineRefLength * (data.children.length - 1);
    console.log(width);
    setContentLineWidth(width);
  }, [contentLineRefLength, data.children.length]);

  return (
    <>
      <div className="cards">
        <div className="card-entity">
          <div className="card">
            {showInput ? (
              <InputForm onSubmit={handleSave} Value={data.text} />
            ) : (
              <>
                <div className="card-container">
                  <div className="card-content-line-container">
                    <hr></hr>
                    <div
                      className={`card-content ${
                        data.children && data.children.length > 0
                          ? "has-children"
                          : ""
                      } ${level === 1 ? "level-1" : ""} ${
                        level === 2 ? "level-2" : ""
                      } ${level === 3 ? "level-3" : ""}`}
                    >
                      <p>{inputValue}</p>
                    </div>
                    {data.children.length > 0 ? <hr></hr> : <></>}
                  </div>
                </div>

                <div
                  className={
                    data.children.length === 0
                      ? `button-container-1`
                      : `button-container`
                  }
                >
                  <button className="edit-button" onClick={handleEditChild}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.285-1.286l1-3a1 1 0 0 1 .242-.39l9-9zM12 2l2 2-9 9-2-2 9-9z" />
                      <path
                        fillRule="evenodd"
                        d="M0 11.5v2a1 1 0 0 1 1 1h6a1 1 0 0 1 1-1H1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z"
                      />
                    </svg>
                  </button>
                  <button className="add-button" onClick={handleAddChild}>
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
                  <button className="delete-button" onClick={handleDelete}>
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
                </div>
              </>
            )}
          </div>
          <div className="hr">
            {childrenLength === undefined ||
            childrenLength === 0 ||
            childrenLength === 1 ? (
              <></>
            ) : (
              <hr style={{ width: `${contentLineWidth}px` }}></hr>
            )}
          </div>
        </div>
        <div className={`add-card`}>
          {data.children.length === 0 && isAddingCard ? (
            <InputForm
              onSubmit={handleAddChildSubmit}
              onClose={handleCancelCard}
            />
          ) : (
            <></>
          )}
        </div>
        {data.children && (
          <div className="child">
            <div className="children">
              {data.children.map((child, index) => (
                <div
                  key={index}
                  className="child-container"
                  ref={contentLineRef}
                >
                  <Card
                    data={child}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                    level={level + 1}
                    childrenLength={child.children.length}
                  />
                </div>
              ))}
            </div>
            <div className="add-card-1">
              {data.children.length != 0 && isAddingCard ? (
                <InputForm
                  onSubmit={handleAddChildSubmit}
                  onClose={handleCancelCard}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      {choice ? (
        <div className="modal-container">
          <p>
            <strong>What do you want to create</strong>
          </p>
          <div className="modal-button-container">
            <button onClick={handleAddCategory}>CATEGORY</button>
            <button onClick={handleAddService}>SERVICE</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Card;
