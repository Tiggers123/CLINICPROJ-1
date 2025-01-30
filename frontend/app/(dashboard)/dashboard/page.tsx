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
import FinanceChart from "@/app/components/FinanceChart";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [listYears, setListYears] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const prevYear = new Date().getFullYear() - 5;
    const years = Array.from({ length: 6 }, (_, index) => prevYear + index);
    setListYears(years);

    fetchData();
    renderChart();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/sell/dashboard/${currentYear}`
      );
      setTotalIncome(res.data.totalIncome || 0);
      setTotalExpense(res.data.totalExpense || 0);
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
    const data = months.map((month, index) => ({
      name: month,
      income: Math.floor(Math.random() * 10000),
      expense: Math.floor(Math.random() * 8000),
    }));

    setData(data);
  };

  const cardData = [
    { title: "ยอดขายทั้งหมด", value: `${totalIncome.toLocaleString()} บาท` },
    {
      title: "ค่าใช้จ่ายทั้งหมด",
      value: `${totalExpense.toLocaleString()} บาท`,
    },
    {
      title: "กำไรสุทธิ",
      value: `${(totalIncome - totalExpense).toLocaleString()} บาท`,
    },
    {
      title: "ยอดขายสุทธิเดือนนี้",
      value: `${totalSale.toLocaleString()} บาท`,
    },
  ];

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full  flex flex-col gap-8 -mt-3">
        <div className="w-full flex flex-col  ">
          {/*USECARD*/}
          <div className="flex gap-4 justify-between flex-wrap">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-4 flex-1 shadow-md flex-grow"
              >
                <h2 className="capitalize text-md text-black">{card.title}</h2>
                <span className="text-[15px] bg-gray-50 px-2 py-1 rounded-full text-black">
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/*CHART*/}
        <div className="flex gap-4 flex-col lg:flex-row -mt-3">
          <div className="w-full  h-[500px]">
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
                      fetchData();
                      renderChart();
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>
                  </button>
                </div>
              </div>
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
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
                      contentStyle={{
                        borderRadius: "10px",
                        borderColor: "lightgray",
                      }}
                    />
                    <Legend
                      align="center"
                      verticalAlign="top"
                      wrapperStyle={{
                        paddingTop: "20px",
                        paddingBottom: "40px",
                      }}
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
          </div>
        </div>
        {/* BOTTOM CHART ยังไม่ได้แก้*/}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
