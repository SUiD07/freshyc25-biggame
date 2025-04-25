"use client";
import { useState } from "react";
import React from "react";

// import { nodeList } from "./constants/node";
export default function Home() {
  const count = 5; //////////
  const [value1, setValue1] = useState("0");
  // const [value2, setValue2] = useState("0");
  // const [value3, setValue3] = useState("0");

  const [selectedCar, setSelectedCar] = useState<string>("");

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของการเลือก
  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCar(event.target.value);
  };

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

  const getBackgroundColor = () => {
    // ถ้า value เป็น code สีตรงๆ ก็ใช้ได้เลย
    if (selectedCar.startsWith("#")) return selectedCar;

    // ถ้า value เป็นชื่อบ้าน → map เป็นสี
    return houseColorMap[selectedCar] || "transparent";
  };

  // const CarSelector = () => {
  //   // สร้าง state สำหรับเก็บค่าที่เลือก
  //   const [selectedCar1, setSelectedCar1] = useState<string>('');

  //   // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของการเลือก
  //   const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedCar1(event.target.value);
  //   };

  return (
    <>
      <div className="text-3xl font-bold">Biggame 2025 Demo ver.</div>
      <li>map ยังไม่final</li>
      <li>rule ยังไม่final</li>

      <div className="relative w-full">
        <div className="w-full text-center">
          <img
            src="/map.png"
            alt="คำอธิบายรูป"
            className="inline-block w-[90%] h-auto"
          />
        </div>
        <div
          style={{
            // position: "absolute",
            // top: "500px",
            // left: "20px",
            backgroundColor: getBackgroundColor(),
            fontSize: "1vw", // ขนาดตัวอักษรสัมพันธ์กับขนาดจอ / ภาพ
            padding: "0.5em",
            borderRadius: "0.5em",
            whiteSpace: "nowrap",
          }}
          className="absolute top-[45%] left-[30%] p-2 rounded-md transform -translate-x-1/2 -translate-y-1/2 text-[clamp(10px,2.5vw,16px)]"
        >
          {value1} ( {selectedCar} )
        </div>
      </div>
      {/* ///////////////////// */}

      <div className="py-4 max-w-[900px] w-full overflow-auto">
        <table className="whitespace-nowrap min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th>node</th>
              <th>people</th>
              <th>node</th>
              <th>ป้อม</th>
              <th>เรือ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Node 1</td>
              <td>
                <fieldset className="fieldset">
                  {/* <legend className="fieldset-legend">Node 1</legend> */}
                  <input
                    type="text"
                    className="input"
                    placeholder="My awesome page"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  />
                  {/* <p className="label">Temporary</p> */}
                </fieldset>
              </td>
              <td>
                <label className="select">
                  <span className="label">Color</span>
                  <select value={selectedCar} onChange={handleCarChange}>
                    <option value="">Null</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B3">B3</option>
                    <option value="B4">B4</option>
                    <option value="B5">B5</option>
                    <option value="B6">B6</option>
                    <option value="B7">B7</option>
                    <option value="B8">B8</option>
                    <option value="B9">B9</option>
                    <option value="B10">B10</option>
                    <option value="B11">B11</option>
                    <option value="B12">B12</option>
                  </select>
                </label>
              </td>
              <td>
                null
              </td>
              <td>
                null
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
