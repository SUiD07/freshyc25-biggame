"use client";
import { useState } from "react";
import React from "react";
import { initialNodes } from "./constants/node";

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);

  const houseColorMap: Record<string, string> = {
    B1: "#ff5733",
    B2: "#fffc33",
    B3: "#33ff57",
    B4: "#33fff5",
    B5: "#3357ff",
    B6: "#8e33ff",
    B7: "#ff33ec",
    B8: "#ff3380",
    B9: "#ffa533",
    B10: "#a5ff33",
    B11: "#33ffa5",
    B12: "#33a5ff",
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updated = [...nodes];
    updated[index].value = newValue;
    setNodes(updated);
  };

  const handleCarChange = (index: number, newCar: string) => {
    const updated = [...nodes];
    updated[index].selectedCar = newCar;
    setNodes(updated);
  };

  return (
    <>
      <div className="text-3xl font-bold mb-4">Biggame 2025 Demo ver.</div>
      <ul className="mb-4 list-disc list-inside">
        <li>map ยังไม่ final</li>
        <li>rule ยังไม่ final</li>
      </ul>

      {/* 🗺️ Map Section */}
      <div className="relative w-full mb-10">
        <div className="w-full text-center">
          <img
            src="/map.png"
            alt="map"
            className="inline-block w-[90%] h-auto"
          />
        </div>

        {nodes.map((node, index) => (
          <div
            key={index}
            style={{
              backgroundColor: houseColorMap[node.selectedCar] || "transparent",
              fontSize: "1vw",
              padding: "0.5em",
              borderRadius: "0.5em",
              whiteSpace: "nowrap",
              top: node.top,
              left: node.left,
            }}
            className="absolute p-2 rounded-md transform -translate-x-1/2 -translate-y-1/2 text-[clamp(10px,2.5vw,16px)]"
          >
            {node.value} ({node.selectedCar})
          </div>
        ))}
      </div>

      {/* 📋 Table Section */}
      <div className="py-4 max-w-[900px] w-full overflow-auto mx-auto">
        <table className="whitespace-nowrap min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">node</th>
              <th className="px-4 py-2">จำนวนคน</th>
              <th className="px-4 py-2">บ้าน</th>
              <th className="px-4 py-2">ป้อม</th>
              <th className="px-4 py-2">เรือ</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{node.id}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="input border px-2 py-1 w-full"
                    placeholder="จำนวนคน"
                    value={node.value}
                    onChange={(e) =>
                      handleValueChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="select border px-2 py-1 w-full"
                    value={node.selectedCar}
                    onChange={(e) => handleCarChange(index, e.target.value)}
                  >
                    <option value="">Null</option>
                    {Object.keys(houseColorMap).map((house) => (
                      <option key={house} value={house}>
                        {house}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">{node.tower ?? "null"}</td>
                <td className="border px-4 py-2">{node.ship ?? "null"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
