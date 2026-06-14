TARGET_STREAM = "rtmp://192.168.1.150:1935/live"
import React, { useState } from "react";

const SimulationController = ({ onToggleOutage }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleToggle = () => {
    setIsSimulating(!isSimulating);
    onToggleOutage(!isSimulating);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "2px dashed #dc3545",
        borderRadius: "10px",
      }}
    >
      <h4 style={{ color: "#dc3545", marginTop: 0 }}>
        DEMO: Grid Outage Simulator
      </h4>
      <p style={{ fontSize: "13px" }}>
        Simulate a total cellular/cloud failure to test Aigis resilience.
      </p>

      <button
        onClick={handleToggle}
        style={{
          backgroundColor: isSimulating ? "#dc3545" : "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isSimulating
          ? "STOP SIMULATION: RESTORE GRID"
          : "START SIMULATION: GRID OUTAGE"}
      </button>

      {isSimulating && (
        <div
          style={{
            marginTop: "10px",
            color: "#dc3545",
            fontWeight: "bold",
            animation: "pulse 1s infinite",
          }}
        >
          ⚠️ GRID OFFLINE: Lingo Mesh maintaining 360-degree safety net.
        </div>
      )}
    </div>
  );
};

export default SimulationController;
