"use client";

import axios from "axios";
import { useState, useEffect } from "react";
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
import { config } from "../../config";
import Swal from "sweetalert2";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
  const [listYears, setListYears] = useState<number[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const prevYear = new Date().getFullYear() - 5;
    const years = Array.from({ length: 6 }, (_, index) => prevYear + index);
    setListYears(years);

    fetchData();
    renderChart();
  }, [currentYear]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/sell/dashboard/${currentYear}`
      );
      setTotalIncome(res.data.totalIncome || 0);
      setTotalRepair(res.data.totalRepair || 0);
      setTotalSale(res.data.totalSale || 0);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

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
    const chartData = months.map((month) => ({
      name: month,
      income: Math.floor(Math.random() * 10000), // Replace with real data later
    }));

    setData(chartData);
  };

  const Box = ({
    color,
    title,
    value,
  }: {
    color: string;
    title: string;
    value: string;
  }) => (
    <div
      className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}
    >
      <div className="text-2xl">{title}</div>
      <div className="text-4xl">{value}</div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      <h1 className="content-header">Dashboard</h1>

      <div className="flex gap-4 mb-3 items-center">
        <div className="w-[50px] text-right">เลือกปี</div>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          className="form-control"
          style={{ width: "200px" }}
        >
          {listYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          className="btn flex items-center w-[161px]"
          onClick={() => {
            fetchData();
            renderChart();
          }}
        >
          <i className="fa-solid fa-magnifying-glass mr-3"></i>
          แสดงรายการ
        </button>
      </div>

      <div className="flex gap-4">
        <Box
          color="bg-purple-600"
          title="ยอดขายทั้งหมด"
          value={`${totalIncome.toLocaleString()} บาท`}
        />
        <Box
          color="bg-orange-500"
          title="งานรับซ่อม"
          value={`${totalRepair.toLocaleString()} งาน`}
        />
        <Box
          color="bg-blue-500"
          title="รายการขาย"
          value={`${totalSale.toLocaleString()} รายการ`}
        />
      </div>

      <div className="text-center mb-4 mt-5 text-xl font-bold">
        รายได้แต่ละเดือน
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
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
    </div>
  );
};

export default Page;
