"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "@/app/components/modal";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";

const ExpensePage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [ids, setId] = useState("");
  const [optional, setOptional] = useState("");
  const [amount, setAmount] = useState("");
  const [bill, setbill] = useState([
    {
      ids: "001",
      optional: "งานติดตั้ง",
      amount: 1200,
      date: "2025-01-01",
    },
    {
      ids: "002",
      optional: "งานบำรุงรักษา",
      amount: 1500,
      date: "2025-01-10",
    },
    {
      ids: "003",
      optional: "งานซ่อมแซม",
      amount: 800,
      date: "2025-01-15",
    },
  ]);

  useEffect(() => {
    // Uncomment the following line if you want to fetch data from the server.
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/bill/list`);
      setbill(res.data);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: err.message,
      });
    }
  };

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleClearForm = () => {
    setId("");
    setAmount("");
    setOptional("");
  };

  const handleSave = async () => {
    try {
      const payload = {
        ids: ids,
        optional: optional,
        amount: parseFloat(amount),
        date: dayjs().format("YYYY-MM-DD"),
      };
      setbill([...bill, payload]); // Add new data locally
      handleClearForm();
      handleCloseModal();
      // Uncomment the following line if you want to save data on the server
      // await axios.post(`${config.apiUrl}/bill/create`, payload);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: err.message,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      <h1 className="text-lg font-bold mb-4">งานบริการ</h1>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มงานบริการ
        </button>
        <table className="table mt-5">
          <thead>
            <tr>
              <th className="text-left">ชื่องานบริการ</th>
              <th className="text-right">ราคา</th>
              <th className="text-left">หมายเหตุ</th>
              <th className="text-left">วันที่บันทึก</th>
              <th className="w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {bill.map((bill) => (
              <tr key={bill.ids}>
                <td>{bill.ids}</td>
                <td className="text-right">{bill.amount.toLocaleString()}</td>
                <td>{bill.optional}</td>
                <td>{dayjs(bill.date).format("DD/MM/YYYY")}</td>
                <td className="text-center">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md ml-2">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isShowModal}
        title="บันทึกงานบริการ"
        onClose={handleCloseModal}
      >
        <div>
          <div>เลขไอดี</div>
          <input
            type="text"
            value={ids}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <div>ราคา</div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <div>หมายเหตุ</div>
          <input
            type="text"
            value={optional}
            onChange={(e) => setOptional(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mt-4 text-right">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={handleSave}
          >
            บันทึก
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExpensePage;
