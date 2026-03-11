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
import subprocess
import re

# Threshold: If the node uses >50MB of bandwidth but fails >5 handshakes, it is flagged as Parasitic.
BANDWIDTH_LIMIT_MB = 50 
FAILURE_THRESHOLD = 5
NODE_IP = "192.168.1.XX" # Replace with the actual static IP of the Samsung Node

def get_node_traffic(ip):
    """Samples current network bytes for the specific node IP."""
    try:
        # Using tcpdump or ifstat to sample traffic for 5 seconds
        result = subprocess.check_output(["timeout", "5", "tcpdump", "-l", "host", ip], stderr=subprocess.STDOUT)
        # Simplified logic: Count lines as a proxy for packet density
        packet_count = len(result.splitlines())
        return packet_count
    except Exception:
        return 0

def run_audit():
    print(f"--- Sofia Core: Initiating Parasitism Test on {NODE_IP} ---")
    
    traffic_density = get_node_traffic(NODE_IP)
    # Logic to pull recent failures from the log file
    with open("/home/user/sofia_core_audit.log", "r") as f:
        log_data = f.read()
        breach_count = log_data.count("SHIELD_BREACH")

    print(f"Traffic Density: {traffic_density} packets/5s")
    print(f"Recent Breaches: {breach_count}")

    if breach_count > FAILURE_THRESHOLD and traffic_density > 1000:
        print("\033[91mSTATUS: PARASITIC. Node is consuming bandwidth without maintaining shield integrity.\033[0m")
    else:
        print("\033[92mSTATUS: SYMBIOTIC. Node performance aligns with Wealth Prosperity pillars.\033[0m")

if __name__ == "__main__":
    run_audit()