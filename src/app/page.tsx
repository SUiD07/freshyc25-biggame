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

  const toggleTower = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, tower: !node.tower } : node
      )
    );
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

  // เพิ่มเรือโดยเลือกบ้านจาก select option
  const addShip = (id: string, selectedCar: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              ship: node.ship ? [...node.ship, `${selectedCar}`] : [`Ship 1 from ${selectedCar}`],
            }
          : node
      )
    );
  };

  // ลบเรือ
  const removeShip = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              ship: node.ship && node.ship.length > 1 ? node.ship.slice(0, -1) : [], // ถ้ามีเรือมากกว่าหนึ่งลำให้ลบลำสุดท้าย
            }
          : node
      )
    );
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

        {nodes.map((node) => (
          <React.Fragment key={node.id}>
            {/* ป้อม */}
            <img
              src="/fortress.svg"
              alt="fortress"
              className="absolute border-white"
              style={{
                top: `${parseFloat(node.top) + 3}%`,
                left: node.left,
                opacity: node.tower ? 1 : 0.2,
                transform: "translate(-50%, -50%)",
                transition: "opacity 0.3s",
                zIndex: 10,
                width: "3vw",
                height: "3vw",
              }}
            />
            {/* เรือ */}
            {node.ship && node.ship.map((ship, index) => (
              <div
                key={index}
                className="absolute w-8 h-8 bg-blue-500 rounded-full border-2 border-white"
                style={{
                  top: `${parseFloat(node.top) + 8 + index * 4}%`, // Adjust position for multiple ships
                  left: node.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-center text-black text-xs">{ship}</div>
              </div>
            ))}
            {/* ข้อความใต้ภาพเรือ */}
            {/* {node.ship && node.ship.map((ship, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: `${parseFloat(node.top) + 12 + index * 4}%`,
                  left: node.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-black text-xs">{ship}</p>
              </div>
            ))} */}
          </React.Fragment>
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
              <th className="px-4 py-2">เพิ่ม/ลด เรือ</th>
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
                    onChange={(e) => handleValueChange(index, e.target.value)}
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
                <td>
                  <button
                    className={`px-2 py-1 rounded ${node.tower ? "bg-green-300" : "bg-gray-200"}`}
                    onClick={() => toggleTower(node.id)}
                  >
                    {node.tower ? "🛡️ ปิดป้อม" : "⚔️ เปิดป้อม"}
                  </button>
                </td>
                <td>
                  <div className="flex flex-col">
                    {node.ship && node.ship.map((ship, index) => (
                      <div key={index} className="px-2 py-1 text-sm">
                        {ship}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  {/* Select สำหรับเลือกบ้านที่จะเพิ่มเรือจาก */}
                  <select
                    className="select border px-2 py-1 w-full"
                    onChange={(e) => addShip(node.id, e.target.value)}
                  >
                    <option value="">เลือกบ้านสำหรับเรือ</option>
                    {Object.keys(houseColorMap).map((house) => (
                      <option key={house} value={house}>
                        {house}
                      </option>
                    ))}
                  </select>
                  {/* ปุ่มลดเรือ */}
                  {node.ship && node.ship.length > 0 && (
                    <button
                      className="px-2 py-1 bg-red-200 rounded mt-2"
                      onClick={() => removeShip(node.id)}
                    >
                      ลดเรือ
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
