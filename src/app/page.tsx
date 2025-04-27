"use client";
import { useState } from "react";
import React from "react";
import { initialNodes } from "./constants/node";
import Navbar from "./components/Navbar";

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

  // เพิ่มเรือ
  const addShip = (id: string, selectedCar: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              ship: node.ship
                ? [...node.ship, `${selectedCar}`]
                : [`Ship 1 from ${selectedCar}`],
            }
          : node
      )
    );
  };

  const removeShip = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              ship:
                node.ship && node.ship.length > 1 ? node.ship.slice(0, -1) : [],
            }
          : node
      )
    );
  };

  // เพิ่มการสู้
  const addFight = (id: string, house: string, count: number) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              fight: node.fight
                ? [...node.fight, { house, count }]
                : [{ house, count }],
            }
          : node
      )
    );
  };

  const removeFight = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              fight:
                node.fight && node.fight.length > 1
                  ? node.fight.slice(0, -1)
                  : [],
            }
          : node
      )
    );
  };

  return (
    <>
      <Navbar />
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
            {node.value} {node.value !== "0" && "("}

            {node.selectedCar}
            {node.value !== "0" && ")"}

          </div>
        ))}

        {nodes.map((node) => (
          <React.Fragment key={node.id}>
            {/* ป้อม */}
            <img
              src="/fortress.svg"
              alt="fortress"
              className="absolute"
              style={{
                top: `${parseFloat(node.top) + 3}%`,
                left: node.left,
                opacity: node.tower ? 1 : 0,
                transform: "translate(-50%, -50%)",
                transition: "opacity 0.3s",
                zIndex: 10,
                width: "3vw",
                height: "3vw",
              }}
            />
            {/* เรือ */}
            {node.ship &&
              node.ship.map((ship, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: node.top,
                    left: `${parseFloat(node.left) - 4 + index * 2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img src="/boat.svg" alt="ship" className="w-8 h-8" />
                  <div className="text-center text-black text-xs mt-1">
                    {ship}
                  </div>
                </div>
              ))}

            {/* การสู้ */}
            {node.fight &&
              node.fight.map((f, idx) => (
                <>
                  {idx === 0 && (
                    <img
                      src="/sword.svg"
                      alt="fight"
                      className="w-8 h-8 absolute"
                      style={{
                        top: `${parseFloat(node.top) + 1 + idx * 2}%`,
                        left: `${parseFloat(node.left) + 5}%`,
                        transform: "translate(-50%, -50%)",
                        width: "3vw",
                        height: "3vw",
                      }}
                    />
                  )}
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      top: `${parseFloat(node.top) + 5 + idx * 2}%`,
                      left: `${parseFloat(node.left) + 5}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="text-center text-red-600 font-bold text-xs mt-1">
                      {f.house} ({f.count})
                    </div>
                  </div>
                </>
              ))}
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
              <th className="px-4 py-2">fight</th>
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
                <td className="border px-4 py-2">
                  <div className="flex flex-col space-y-2">
                    {node.fight &&
                      node.fight.map((f, idx) => (
                        <div key={idx} className="text-xs">
                          {f.house} ({f.count})
                        </div>
                      ))}
                    {/* เพิ่มฟอร์มเลือกบ้านและจำนวน */}
                    <div className="flex space-x-1 mt-1">
                      <select
                        className="select border px-2 py-1"
                        onChange={(e) => {
                          const house = e.target.value;
                          if (house) addFight(node.id, house, 1);
                        }}
                      >
                        <option value="">เลือกบ้าน</option>
                        {Object.keys(houseColorMap).map((house) => (
                          <option key={house} value={house}>
                            {house}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        defaultValue={1}
                        className="input border px-2 py-1 w-16"
                        onBlur={(e) => {
                          const count = parseInt(e.target.value);
                          if (
                            !isNaN(count) &&
                            node.fight &&
                            node.fight.length > 0
                          ) {
                            const updated = [...nodes];
                            const idx = updated.findIndex(
                              (n) => n.id === node.id
                            );
                            if (idx !== -1) {
                              updated[idx].fight[
                                updated[idx].fight.length - 1
                              ].count = count;
                              setNodes(updated);
                            }
                          }
                        }}
                      />
                    </div>
                    {node.fight && node.fight.length > 0 && (
                      <button
                        className="px-2 py-1 bg-red-200 rounded mt-2 text-xs"
                        onClick={() => removeFight(node.id)}
                      >
                        ลดการสู้
                      </button>
                    )}
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className={`px-2 py-1 rounded ${
                      node.tower ? "bg-green-300" : "bg-gray-200"
                    }`}
                    onClick={() => toggleTower(node.id)}
                  >
                    {node.tower ? "🛡️ ปิดป้อม" : "⚔️ เปิดป้อม"}
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col">
                    {node.ship &&
                      node.ship.map((ship, index) => (
                        <div key={index} className="px-2 py-1 text-sm">
                          {ship}
                        </div>
                      ))}
                  </div>
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <select
                    className="select border px-2 py-1 w-[150px]"
                    onChange={(e) => addShip(node.id, e.target.value)}
                  >
                    <option value="">เลือกบ้านสำหรับเรือ</option>
                    {Object.keys(houseColorMap).map((house) => (
                      <option key={house} value={house}>
                        {house}
                      </option>
                    ))}
                  </select>
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
