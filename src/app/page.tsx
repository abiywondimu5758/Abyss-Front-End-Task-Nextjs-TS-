// Importing necessary modules and components
"use client";
import Image from "next/image";
import "./page.css";
import Header from "./components/Header";
import ContentArea, { ContentAreaRef } from "./components/ContentArea";
import { useState, useRef } from "react";

// Define the main functional component for the Home page
export default function Home() {
  // State to manage zoom level
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reference to ContentArea component
  const contentAreaRef = useRef<ContentAreaRef>(null);

  // Function to handle zooming in
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  // Function to handle zooming out
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };

  // Function to handle zoom level change
  const handleZoomChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel);
  };

  // Function to recenter the ContentArea
  const handleRecenter = () => {
    if (contentAreaRef.current) {
      contentAreaRef.current.recenter();
    }
  };

  return (
    <div className="app">
      {/* Rendering the Header component */}
      <Header
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
        zoomLevel={zoomLevel}
        onZoomChange={handleZoomChange}
      />

      {/* Rendering the ContentArea component */}
      <ContentArea ref={contentAreaRef} zoomLevel={zoomLevel} />
    </div>
  );
}