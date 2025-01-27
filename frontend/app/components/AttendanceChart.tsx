"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { config } from "../.././app/config";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AttendanceChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [listYears, setListYears] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const prevYear = new Date().getFullYear() - 5;
    const years = Array.from({ length: 6 }, (_, index) => prevYear + index);
    setListYears(years);

    // fetchData();
    renderChart();
  }, []);

  //  const fetchData = async () => {
  //    try {
  //      const res = await axios.get(
  //        ${config.apiUrl}/sell/dashboard/${currentYear}
  //      );
  //    } catch (error: any) {
  //      Swal.fire({
  //        icon: "error",
  //        title: "ผิดพลาด",
  //        text: error.message,
  //      });
  //    }
  //  };

  const renderChart = () => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const data = months.map((month, index) => ({
      name: month,
      income: Math.floor(Math.random() * 10000),
      expense: Math.floor(Math.random() * 8000),
    }));

    setData(data);
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full shadow-md overflow-hidden">
      <h1 className="text-lg mb-4">รายรับ-รายจ่ายแต่ละเดือน</h1>
      <div className="flex items-center justify-between">
        <div></div> {/* เว้นพื้นที่ด้านซ้ายว่างไว้ */}
        <div className="flex items-center">
          <div className="text-lg mr-2 ">เลือกปี</div>

          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="form-control mr-4"
            style={{ width: "100px" }}
          >
            {listYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              // fetchData();
              renderChart();
            }}
          >
            <i className="fa-solid fa-magnifying-glass mr-2"></i>
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="income"
            fill="#fec9d5"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
