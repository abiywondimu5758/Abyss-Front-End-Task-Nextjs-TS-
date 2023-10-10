"use client";

import Image from "next/image";

import "./page.css";
import Header from "./components/Header";
import ContentArea, { ContentAreaRef } from "./components/ContentArea";
import { useState, useRef } from "react";

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const contentAreaRef = useRef<ContentAreaRef>(null);

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };
  const handleZoomChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel);
  };

  const handleRecenter = () => {
    if (contentAreaRef.current) {
      contentAreaRef.current.recenter();
    }
  };

  return (
    <div className="app">
      <Header
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
        zoomLevel={zoomLevel}
        onZoomChange={handleZoomChange}
      />
      <ContentArea ref={contentAreaRef} zoomLevel={zoomLevel} />
    </div>
  );
}
