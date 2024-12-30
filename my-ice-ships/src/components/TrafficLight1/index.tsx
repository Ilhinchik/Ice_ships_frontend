import { useState, useEffect } from "react";

const TrafficLight1 = () => {
  const [currentColor, setCurrentColor] = useState("red");

  useEffect(() => {
    if (currentColor === "red") {
      setTimeout(() => {
        setCurrentColor("yellow");
      }, 2000); 
    }

    if (currentColor === "yellow") {
      setTimeout(() => {
        setCurrentColor("none");
      }, 2000); 
    }
  }, [currentColor]);


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {currentColor !== "none" && (
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: currentColor,
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            marginBottom: "20px",
          }}
        />
      )}
    </div>
  );
};

export default TrafficLight1;
