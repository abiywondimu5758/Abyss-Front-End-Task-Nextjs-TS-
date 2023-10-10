import React, { useRef, useImperativeHandle } from "react";
import "./ContentArea.css";
import ZoomableContent, { ZoomableContentRef } from "./ZoomableContent";

interface ContentAreaProps {
  zoomLevel: number;
}

export interface ContentAreaRef {
  recenter: () => void;
}

const ContentArea: React.ForwardRefRenderFunction<
  ContentAreaRef,
  ContentAreaProps
> = ({ zoomLevel }, ref) => {
  const zoomableContentRef = useRef<ZoomableContentRef>(null);

  const recenter = () => {
    if (zoomableContentRef.current) {
      zoomableContentRef.current.recenter();
    }
  };
  

  useImperativeHandle(
    ref,
    () => ({
      recenter,
    }),
    []
  );

  return (
    <div className="content-area">
      <div className="button-top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />{" "}
        </svg>
      </div>
      <div className="button-bottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-up"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
          />{" "}
        </svg>
      </div>
      <div className="button-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />{" "}
        </svg>
      </div>
      <div className="button-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />{" "}
        </svg>
      </div>
      <ZoomableContent ref={zoomableContentRef} zoomLevel={zoomLevel} />
    </div>
  );
};

export default React.forwardRef(ContentArea);
