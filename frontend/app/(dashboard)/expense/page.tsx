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

interface Expense {
  id: number;
  orderid: string;
  name: string;
  totalprice: number;
  date: string;
  qty: string;
}

const ExpensePage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [orderid, setOrderid] = useState("");
  const [name, setName] = useState("");
  const [totalprice, setTotalprice] = useState("");
  const [qty, setQty] = useState("");
  const [id, setId] = useState(0); // id เอาไว้แก้ไขรายการ
  const [searchQuery, setSearchQuery] = useState("");
  const [expense, setExpense] = useState<Expense[]>([]);

  /*PAGINATION*/
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page]); //เพิ่ม dependencies ให้กับ useEffect เมื่อไหร่ค่าของ page เปลี่ยนให้ไปดึงข้อมูลใหม่ทันที

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/expense/list/${page}`);
      setExpense(res.data.expense);
      setTotalRows(res.data.totalRows);
      setTotalPage(res.data.totalPages);
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

  const handleClear = () => {
    setTotalprice("");
    setName("");
    setId(0);
    setQty("");
  };

  const handleSave = async () => {
    try {
      const newOrderId =
        expense.length > 0
          ? (parseInt(expense[expense.length - 1].orderid) + 1)
              .toString()
              .padStart(4, "0")
          : "0001"; // ถ้าหากไม่มีรายการ ก็เริ่มที่ 0001

      const payload = {
        orderid: newOrderId,
        totalprice: totalprice,
        name: name,
        qty: qty,
        date: dayjs().format("YYYY-MM-DD"),
      };

      if (id === 0) {
        // เพิ่มรายการ
        await axios.post(`${config.apiUrl}/expense/create`, payload);
      } else {
        // แก้ไขรายการ
        await axios.put(`${config.apiUrl}/expense/update/${id}`, payload);
        setId(0);
      }
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        text: "ข้อมูลถูกบันทึกเรียบร้อย",
        timer: 2000,
      });

      handleCloseModal();
      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
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
        renumberOrderIds(); // รีเซ็ต orderid หลังลบรายการ
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

    const renumberOrderIds = async () => {
      try {
        // รีเซ็ต orderid หลังจากลบ
        const updatedExpenses = expense.map((item, index) => ({
          ...item,
          orderid: (index + 1).toString().padStart(4, "0"), // รีเซ็ต orderid ให้ต่อเนื่อง
        }));

        // อัปเดตฐานข้อมูลด้วย orderid ใหม่
        const updatePromises = updatedExpenses.map((item) =>
          axios.put(`${config.apiUrl}/expense/update/${item.id}`, item)
        );
        await Promise.all(updatePromises);
        fetchData(); // รีเฟรชข้อมูลหลังจากอัปเดต orderid
      } catch (error: any) {
        console.error("Error renumbering order IDs:", error.message);
      }
    };

  const handleEdit = (id: number) => {
    const expenses = expense.find((expense: any) => expense.id === id) as any;
    if (expenses) {
      setId(expenses.id);
      setTotalprice(expenses.totalprice);
      setQty(expenses.qty);
      setName(expenses.name ?? "");
      handleOpenModal();
    }
  };

 const filteredExpenses = expense.filter(
    (item) =>
      item.orderid.includes(searchQuery) || item.name.includes(searchQuery)
  );

  const columns = [
    { header: "เลขไอดี", accessor: "orderid" },
    {
      header: "รายการสินค้า",
      accessor: "name",
      className: "hidden md:table-cell",
    },

    {
      header: "จำนวน",
      accessor: "qty",
      className: "hidden md:table-cell",
    },
    {
      header: "ราคารวม",
      accessor: "totalprice",
      className: "hidden md:table-cell",
    },
    {
      header: "วันที่ทำการซื้อ",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    { header: "แก้ไข/ลบ", accessor: "actions", className: "text-center" },
  ];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* TOP SECTION */}
      <div className="flex justify-between items-center mt-2 gap-x-4 sm:gap-x-2">
        <button
          className="bg-lamaError text-white p-2 flex items-center justify-center rounded-md hover:bg-pink-400 transition"
          onClick={() => {
            handleClear();
            handleOpenModal();
          }}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          <span className="hidden sm:inline">เพิ่มรายจ่าย</span>
        </button>
        <TableSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Order ID..."
        />
      </div>
      {/* LIST SECTION */}
      <Table
        columns={columns}
        data={filteredExpenses}
        renderRow={(item, index) => (
          <tr className="hover:bg-gray-50" key={index}>
            <td className="px-6 py-4 text-center text-sm ">{item.orderid}</td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.name}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.qty}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.totalprice.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell ">
              {dayjs(item.date).format("DD/MM/YYYY")}
            </td>
            <td className="px-6 py-4 text-center">
              <button
                className="w-8 h-8  text-white bg-lamaError hover:bg-pink-400  rounded-full"
                onClick={() => handleEdit(item.id)}
              >
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-pen"></i>
                </div>
              </button>
              <button
                className="w-8 h-8 text-white bg-red-500 hover:bg-red-300  rounded-full ml-2"
                onClick={() => handleDelete(item.id)}
              >
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-trash "></i>
                </div>
              </button>
            </td>
          </tr>
        )}
      />
      {/* PAGINATION SECTION */}
      <div className="mt-4 ml-1">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={(newPage) =>
            setPage(Math.max(1, Math.min(newPage, totalPage)))
          }
          totalRows={totalRows}
        />
      </div>

      <Modal
        isOpen={isShowModal}
        title="บันทึกรายจ่าย"
        onClose={handleCloseModal}
      >
        <div>
          <div>รายการสินค้า</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <div>จำนวน</div>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <div>ราคารวม</div>
          <input
            type="number"
            value={totalprice}
            onChange={(e) => setTotalprice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mt-4 text-right">
          <button
            className="bg-lamaError text-white px-4 py-2 rounded-md hover:bg-pink-400"
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

/*
"apiEndpoints": {
    "getExpenseList": {
      "method": "GET",
      "url": "/expense/list/{page}",
      "description": "Fetches a paginated list of expenses"
    },
    "createExpense": {
      "method": "POST",
      "url": "/expense/create",
      "description": "Creates a new expense record"
    },
    "updateExpense": {
      "method": "PUT",
      "url": "/expense/update/{id}",
      "description": "Updates an existing expense record"
    },
    "deleteExpense": {
      "method": "DELETE",
      "url": "/expense/remove/{id}",
      "description": "Deletes an expense record"
    },
     "states": {
    "isShowModal": false,
    "orderid": "",
    "name": "",
    "totalprice": "",
    "qty": "",
    "id": 0,
    "searchQuery": "",
    "expense": [],
    "page": 1,
    "totalPage": 1,
    "totalRows": 0
  }
      */