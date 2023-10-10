import React, {
  useState,
  MouseEvent,
  useRef,
  useImperativeHandle,
  WheelEvent,
  useEffect,
} from "react";
import Card, { CardData } from "./Card";
import InputForm from "./InputForm";
import "./ZoomableContent.css";

interface ZoomableContentProps {
  zoomLevel: number;
}

export interface ZoomableContentRef {
  recenter: () => void;
}

const ZoomableContent: React.ForwardRefRenderFunction<
  ZoomableContentRef,
  ZoomableContentProps
> = ({ zoomLevel }, ref) => {
  // State and refs declarations
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [contentLineRefLength, setContentLineRefLength] = useState(0);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const contentLineRef = useRef<HTMLDivElement>(null);
  const [contentLineWidth, setContentLineWidth] = useState<string | number>(
    "auto"
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  // Function to handle mouse down event
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  // Function to handle mouse move event
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragRef.current) {
      const deltaX = e.clientX - dragRef.current.x;
      const deltaY = e.clientY - dragRef.current.y;
      setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
  };
  // Function to handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = null;
  };
  // Function to handle wheel event
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const newZoomLevel = zoomLevel + e.deltaY * -0.01;
    // Add any constraints on zoom level if needed
    // For example, you might want to prevent zooming too far in or out
    // if (newZoomLevel < minZoomLevel || newZoomLevel > maxZoomLevel) {
    //   return;
    // }
    setPosition((prev) => ({
      x: prev.x - e.clientX * 0.01 * (newZoomLevel - zoomLevel),
      y: prev.y - e.clientY * 0.01 * (newZoomLevel - zoomLevel),
    }));
  };
  // Function to recenter the content
  const recenter = () => {
    if (contentRef.current) {
      const parent = contentRef.current.parentElement;

      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const childRect = contentRef.current.getBoundingClientRect();

        const newX = parentRect.width / 2 - childRect.width * 2;
        const newY = parentRect.height / 2 - childRect.height;
        console.log(newX, newY);
        contentRef.current.style.transform = `translate(${childRect.width}px, ${childRect.height}px)`;
      }
    }
  };
  // Function to handle card submission
  const handleAddCardSubmit = (text: string, parentIdentifier?: string) => {
    const newCard: CardData = {
      text,
      identifier: Date.now().toString(),
      children: [],
    };

    if (parentIdentifier) {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        const parentCard = updatedCards.find(
          (card) => card.identifier === parentIdentifier
        );

        if (parentCard && parentCard.children) {
          parentCard.children.push(newCard);
        } else if (parentCard) {
          parentCard.children = [newCard];
        }

        return updatedCards;
      });
    } else {
      setCards([...cards, newCard]);
    }

    setIsAddingCard(false);
    setContentLineRefLength((prev) =>
      contentLineRef.current
        ? (prev = contentLineRef.current?.offsetWidth)
        : prev
    );
  };
  // Function to handle card deletion
  const handleDeleteCard = (identifier: string) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => {
        if (card.identifier === identifier) {
          if (card.children && card.children.length > 0) {
            // If the card has children, delete them as well
            return false;
          }
          return false;
        }
        return true;
      });
      return updatedCards;
    });
  };
  // Function to add child card
  const handleAddChild = (
    parentIdentifier: string,
    childText: string,
    type: string | undefined
  ) => {
    setCards((prevCards) => {
      console.log(childText);
      const updatedCards = prevCards.map((card) => {
        function findCardByIdentifier(
          identifier: string,
          card: CardData
        ): CardData | undefined {
          if (card.identifier === identifier) {
            const newChildIndex = card.children ? card.children.length : 0;
            const newChild: CardData = {
              text: childText,
              identifier: Date.now().toString(),
              children: [],
              type: type,
            };
            const updatedChildren = card.children
              ? [...card.children, newChild]
              : [newChild];
            return {
              ...card,
              children: updatedChildren,
            };
          }

          if (card.children) {
            const updatedChildren = card.children.map((child) => {
              const result = findCardByIdentifier(identifier, child);
              return result || child; // Keep the child unchanged if it's not the one we're looking for
            });

            return {
              ...card,
              children: updatedChildren,
            };
          }

          return card;
        }

        return findCardByIdentifier(parentIdentifier, card) || card;
      });

      return updatedCards;
    });
  };
  // Function to handle child deletion
  const handleDeleteChild = (
    parentIdentifier: string,
    childIdentifier: string
  ) => {
    if (parentIdentifier === childIdentifier) {
      handleDeleteCard(childIdentifier);
    }
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const parentCard = updatedCards.find(
        (card) => card.identifier === parentIdentifier
      );

      if (parentCard && parentCard.children) {
        parentCard.children = parentCard.children.filter(
          (child) => child.identifier !== childIdentifier
        );
      }

      return updatedCards;
    });
  };
  // Function to handle canceling card addition
  const handleCancelCard = () => {
    setIsAddingCard(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      recenter,
    }),
    [recenter]
  );
  // useEffect for updating content line width
  useEffect(() => {
    const width =
      contentLineRefLength * (cards.length - 1) + 30 * (cards.length - 1);

    setContentLineWidth(width);
  }, [cards.length, contentLineRefLength]);
  return (
    <div
      ref={contentRef}
      className={`zoomable-content ${isDragging ? "dragging" : ""}`}
      style={{
        transform: `scale(${zoomLevel})`,
        transformOrigin: "0 0",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div className="entity">
        <div className="Zoomable-text-line-container">
          <div className="zoomable-content-container">
            <div className="zoomable-text-container">
              <p>Categories</p>
            </div>
            {!isAddingCard ? (
              <button
                className="plus-button"
                onClick={() => setIsAddingCard(true)}
              >
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
            ) : (
              <button className="plus-button-b">
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
            )}
          </div>
          {cards.length > 0 ? <hr /> : <></>}
        </div>
        <div className="hr">
          {cards.length === undefined ||
          cards.length === 0 ||
          cards.length === 1 ? (
            <></>
          ) : (
            <hr style={{ width: `${contentLineWidth}px` }}></hr>
          )}
        </div>
      </div>

      <div className={`add-card`}>
        {cards.length === 0 && isAddingCard ? (
          <InputForm onSubmit={handleAddCardSubmit} />
        ) : (
          <></>
        )}
      </div>
      <div className="child">
        <div
          className={
            cards.length === 1
              ? `cards-container-1`
              : cards.length % 2 == 0
              ? `cards-container`
              : `cards-container-3`
          }
        >
          {cards.map((card) => (
            <div key={card.identifier} className="card-container">
              <div className="card" ref={contentLineRef}>
                <Card
                  data={card}
                  onDelete={(identifier: string) =>
                    handleDeleteChild(card.identifier, identifier)
                  }
                  onAddChild={(text: string, identifier: string) =>
                    handleAddChild(identifier, text, card.type?.toUpperCase())
                  }
                  level={1}
                  childrenLength={card.children.length}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-card-1">
          {cards.length != 0 && isAddingCard ? (
            <InputForm
              onSubmit={handleAddCardSubmit}
              onClose={handleCancelCard}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(ZoomableContent);
