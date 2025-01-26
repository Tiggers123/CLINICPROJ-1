"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "@/app/components/modal";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Pagination from "@/app/components/Pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ExpensePage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [orderno, setOrderno] = useState("");
  const [optional, setOptional] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expense, setExpense] = useState([
    {
      id: 1,
      orderno: "001",
      optional: "งานติดตั้ง",
      amount: 1200,
      date: "2025-01-01",
    },
    {
      id: 2,
      orderno: "002",
      optional: "งานบำรุงรักษา",
      amount: 1500,
      date: "2025-01-10",
    },
    {
      id: 3,
      orderno: "003",
      optional: "งานซ่อมแซม",
      amount: 800,
      date: "2025-01-15",
    },
  ]);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/expense/list`);
      setExpense(res.data);
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
        orderno: orderno,
        amount: amount,
        optional: optional,
      };

      if (id !== "") {
        await axios.put(`${config.apiUrl}/expense/update/${id}`, payload);
      } else {
        await axios.post(`${config.apiUrl}/expense/create`, payload);
      }

      handleClearForm();
      handleCloseModal();
      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        icon: "question",
        title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/expense/remove/${id}`);
        fetchData();
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.message,
      });
    }
  };

   const handleEdit = (id: number) => {
     const expenses = expense.find((expense: any) => expense.id === id) as any;

     if (expenses) {
       setId(expenses.id);
       setOrderno(expenses.orderno);
       setAmount(expenses.amount);
       setOptional(expenses.optional);
       handleOpenModal();
     }
   };

  const filteredExpenses = expense.filter(
    (item) =>
      item.orderno.includes(searchQuery) || item.optional.includes(searchQuery)
  );

  const columns = [
    { header: "Order ID", accessor: "orderno" },
    {
      header: "Expense",
      accessor: "amount",
      className: "hidden md:table-cell",
    },
    {
      header: "Remark",
      accessor: "optional",
      className: "hidden md:table-cell",
    },
    {
      header: "Date/Time",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    { header: "Action", accessor: "actions", className: "text-center" },
  ];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* TOP SECTION */}
      <div className="flex justify-between items-center mt-2">
        <button
          className="bg-lamaError text-white px-4 py-2 rounded-md hover:bg-lamaPink transition"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มรายจ่าย
        </button>
        <TableSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* LIST SECTION */}
      <Table
        columns={columns}
        data={filteredExpenses}
        renderRow={(item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 text-center text-sm font-semibold">
              {item.orderno}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.amount.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.optional}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell ">
              {dayjs(item.date).format("DD/MM/YYYY")}
            </td>
            <td className="px-6 py-4 text-center">
              <button
                className="w-8 h-8  text-white bg-lamaError hover:bg-lamaPink px-3 py-1 rounded-full"
                onClick={() => handleEdit(item.id)}
              >
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-pen"></i>
                </div>
              </button>
              <button
                className="w-8 h-8 text-white bg-red-500 hover:bg-red-300 px-3 py-1 rounded-full ml-2"
                onClick={() => handleDelete(item.id)}
              >
                <div className="flex items-center justify-center"><i className="fa-solid fa-trash "></i></div>
                
              </button>
            </td>
          </tr>
        )}
      />
      {/* PAGINATION SECTION */}
      <div className="mt-4">
        <Pagination />
      </div>
      <Modal
        isOpen={isShowModal}
        title="บันทึกรายจ่าย"
        onClose={handleCloseModal}
      >
        <div>
          <div>เลขไอดี</div>
          <input
            type="text"
            value={orderno}
            onChange={(e) => setOrderno(e.target.value)}
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
