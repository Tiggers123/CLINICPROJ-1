// "use client";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import Modal from "@/app/components/modal";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { config } from "../../config";
// import Table from "@/app/components/Table";
// import TableSearch from "@/app/components/TableSearch";
// import Pagination from "@/app/components/Pagination";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// interface Expense {
//   id: number;
//   orderid: string;
//   name: string;
//   totalprice: number;
//   date: string;
//   qty: string;
// }

// const ExpensePage = () => {
//   const [isShowModal, setIsShowModal] = useState(false);
//   // const [orderid, setOrderid] = useState("");
//   const [name, setName] = useState("");
//   const [totalprice, setTotalprice] = useState("");
//   const [qty, setQty] = useState("");
//   const [id, setId] = useState(0); // id เอาไว้แก้ไขรายการ
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expense, setExpense] = useState<Expense[]>([]);

//   /*PAGINATION*/
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);

//   useEffect(() => {
//     fetchData();
//   }, [page]); //เพิ่ม dependencies ให้กับ useEffect เมื่อไหร่ค่าของ page เปลี่ยนให้ไปดึงข้อมูลใหม่ทันที

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${config.apiUrl}/expense/list/${page}`);
//       setExpense(res.data.expense);
//       setTotalRows(res.data.totalRows);
//       setTotalPage(res.data.totalPages);
//     } catch (err: any) {
//       Swal.fire({
//         icon: "error",
//         title: "ข้อผิดพลาด",
//         text: err.message,
//       });
//     }
//   };

//   const handleOpenModal = () => {
//     setIsShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsShowModal(false);
//   };

//   const handleClear = () => {
//     setTotalprice("");
//     setName("");
//     setId(0);
//     setQty("");
//   };

//   const handleSave = async () => {
//     try {
//       const newOrderId =
//         expense.length > 0
//           ? (parseInt(expense[expense.length - 1].orderid) + 1)
//               .toString()
//               .padStart(4, "0")
//           : "0001"; // ถ้าหากไม่มีรายการ ก็เริ่มที่ 0001

//       const payload = {
//         orderid: newOrderId,
//         totalprice: totalprice,
//         name: name,
//         qty: qty,
//         date: dayjs().format("YYYY-MM-DD"),
//       };

//       if (id === 0) {
//         // เพิ่มรายการ
//         await axios.post(`${config.apiUrl}/expense/create`, payload);
//       } else {
//         // แก้ไขรายการ
//         await axios.put(`${config.apiUrl}/expense/update/${id}`, payload);
//         setId(0);
//       }
//       Swal.fire({
//         icon: "success",
//         title: "บันทึกข้อมูลเรียบร้อย",
//         text: "ข้อมูลถูกบันทึกเรียบร้อย",
//         timer: 2000,
//       });

//       handleCloseModal();
//       fetchData();
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "ผิดพลาด",
//         text: error.message,
//       });
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const button = await Swal.fire({
//         icon: "question",
//         title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
//         showCancelButton: true,
//         showConfirmButton: true,
//       });

//       if (button.isConfirmed) {
//         await axios.delete(`${config.apiUrl}/expense/remove/${id}`);
//         renumberOrderIds(); // รีเซ็ต orderid หลังลบรายการ
//         fetchData();
//       }
//     } catch (err: any) {
//       Swal.fire({
//         icon: "error",
//         title: "ผิดพลาด",
//         text: err.message,
//       });
//     }
//   };

//     const renumberOrderIds = async () => {
//       try {
//         // รีเซ็ต orderid หลังจากลบ
//         const updatedExpenses = expense.map((item, index) => ({
//           ...item,
//           orderid: (index + 1).toString().padStart(4, "0"), // รีเซ็ต orderid ให้ต่อเนื่อง
//         }));

//         // อัปเดตฐานข้อมูลด้วย orderid ใหม่
//         const updatePromises = updatedExpenses.map((item) =>
//           axios.put(`${config.apiUrl}/expense/update/${item.id}`, item)
//         );
//         await Promise.all(updatePromises);
//         fetchData(); // รีเฟรชข้อมูลหลังจากอัปเดต orderid
//       } catch (error: any) {
//         console.error("Error renumbering order IDs:", error.message);
//       }
//     };

//   const handleEdit = (id: number) => {
//     const expenses = expense.find((expense: any) => expense.id === id) as any;
//     if (expenses) {
//       setId(expenses.id);
//       setTotalprice(expenses.totalprice);
//       setQty(expenses.qty);
//       setName(expenses.name ?? "");
//       handleOpenModal();
//     }
//   };

//  const filteredExpenses = expense.filter(
//     (item) =>
//       item.orderid.includes(searchQuery) || item.name.includes(searchQuery)
//   );

//   const columns = [
//     { header: "เลขไอดี", accessor: "orderid" },
//     {
//       header: "รายการสินค้า",
//       accessor: "name",
//       className: "hidden md:table-cell",
//     },

//     {
//       header: "จำนวน",
//       accessor: "qty",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "ราคารวม",
//       accessor: "totalprice",
//       className: "hidden md:table-cell",
//     },
//     {
//       header: "วันที่ทำการซื้อ",
//       accessor: "date",
//       className: "hidden md:table-cell",
//     },
//     { header: "แก้ไข/ลบ", accessor: "actions", className: "text-center" },
//   ];

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//       {/* TOP SECTION */}
//       <div className="flex justify-between items-center mt-2 gap-x-4 sm:gap-x-2">
//         <button
//           className="bg-lamaError text-white p-2 flex items-center justify-center rounded-md hover:bg-pink-400 transition"
//           onClick={() => {
//             handleClear();
//             handleOpenModal();
//           }}
//         >
//           <i className="fa-solid fa-plus mr-2"></i>
//           <span className="hidden sm:inline">เพิ่มรายจ่าย</span>
//         </button>
//         <TableSearch
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search Order ID..."
//         />
//       </div>
//       {/* LIST SECTION */}
//       <Table
//         columns={columns}
//         data={filteredExpenses}
//         renderRow={(item, index) => (
//           <tr className="hover:bg-gray-50" key={index}>
//             <td className="px-6 py-4 text-center text-sm ">{item.orderid}</td>
//             <td className="px-6 py-4 text-center hidden md:table-cell">
//               {item.name}
//             </td>
//             <td className="px-6 py-4 text-center hidden md:table-cell">
//               {item.qty}
//             </td>
//             <td className="px-6 py-4 text-center hidden md:table-cell">
//               {item.totalprice.toLocaleString()}
//             </td>
//             <td className="px-6 py-4 text-center hidden md:table-cell ">
//               {dayjs(item.date).format("DD/MM/YYYY")}
//             </td>
//             <td className="px-6 py-4 text-center">
//               <button
//                 className="w-8 h-8  text-white bg-lamaError hover:bg-pink-400  rounded-full"
//                 onClick={() => handleEdit(item.id)}
//               >
//                 <div className="flex items-center justify-center">
//                   <i className="fa-solid fa-pen"></i>
//                 </div>
//               </button>
//               <button
//                 className="w-8 h-8 text-white bg-red-500 hover:bg-red-300  rounded-full ml-2"
//                 onClick={() => handleDelete(item.id)}
//               >
//                 <div className="flex items-center justify-center">
//                   <i className="fa-solid fa-trash "></i>
//                 </div>
//               </button>
//             </td>
//           </tr>
//         )}
//       />
//       {/* PAGINATION SECTION */}
//       <div className="mt-4 ml-1">
//         <Pagination
//           currentPage={page}
//           totalPages={totalPage}
//           onPageChange={(newPage) =>
//             setPage(Math.max(1, Math.min(newPage, totalPage)))
//           }
//           totalRows={totalRows}
//         />
//       </div>

//       <Modal
//         isOpen={isShowModal}
//         title="บันทึกรายจ่าย"
//         onClose={handleCloseModal}
//       >
//         <div>
//           <div>รายการสินค้า</div>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           />
//         </div>
//         <div className="mt-4">
//           <div>จำนวน</div>
//           <input
//             type="number"
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           />
//         </div>
//         <div className="mt-4">
//           <div>ราคารวม</div>
//           <input
//             type="number"
//             value={totalprice}
//             onChange={(e) => setTotalprice(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//           />
//         </div>

//         <div className="mt-4 text-right">
//           <button
//             className="bg-lamaError text-white px-4 py-2 rounded-md hover:bg-pink-400"
//             onClick={handleSave}
//           >
//             บันทึก
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ExpensePage;


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
  id: string;
  orderid: string;
  name: string;
  totalprice: number;
  datetime: string;
  quantity: number;
}

const ExpensePage = () => {
  // State management
  const [isShowModal, setIsShowModal] = useState(false);
  const [name, setName] = useState("");
  const [totalprice, setTotalprice] = useState("");
  const [quantity, setQty] = useState("");
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expense, setExpense] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  // Fetch data on component mount and page change
  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  // Fetch expense data from API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${config.apiUrl}/expense/list/${page}`);
      if (res.data.success && Array.isArray(res.data.expenses)) {
        setExpense(res.data.expenses);
        setTotalRows(res.data.totalRows);
        setTotalPage(res.data.totalPages); // Set total pages from response
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Modal handlers
  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => {
    setIsShowModal(false);
    handleClear();
  };

  // Clear form fields
  const handleClear = () => {
    setTotalprice("");
    setName("");
    setId("");
    setQty("");
  };

  // Save the data (Create or Edit)
  const handleSave = async () => {
    try {
      if (!name || !totalprice || !quantity) {
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }

      const payload = {
        name: name.trim(),
        totalprice: parseInt(totalprice),
        quantity: parseInt(quantity),
        datetime: dayjs().format("YYYY-MM-DD"),
      };

      const response = id
        ? await axios.put(`${config.apiUrl}/expense/update/${id}`, payload)
        : await axios.post(`${config.apiUrl}/expense/create`, payload);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลเรียบร้อย",
          text: response.data.message,
          timer: 2000,
        });

        handleCloseModal();
        fetchData();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  // Delete an expense
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
        text: "การดำเนินการนี้ไม่สามารถย้อนกลับได้",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        await axios.delete(`${config.apiUrl}/expense/remove/${id}`);
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลเรียบร้อย",
          timer: 1500,
        });
        fetchData(); // รีเฟรชข้อมูลหลังจากลบและรีเซ็ต orderid
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.message,
      });
    }
  };

  // Edit an expense
  const handleEdit = (id: string) => {
    const expenseItem = expense.find((item) => item.id === id);
    if (expenseItem) {
      setId(expenseItem.id);
      setTotalprice(expenseItem.totalprice.toString());
      setQty(expenseItem.quantity.toString());
      setName(expenseItem.name);
      handleOpenModal();
    }
  };

  // Table columns configuration
  const columns = [
    { header: "เลขที่", accessor: "orderid" },
    { header: "รายการ", accessor: "name", className: "hidden md:table-cell" },
    {
      header: "จำนวน",
      accessor: "quantity",
      className: "hidden md:table-cell",
    },
    {
      header: "ราคารวม",
      accessor: "totalprice",
      className: "hidden md:table-cell",
    },
    {
      header: "วันที่",
      accessor: "datetime",
      className: "hidden md:table-cell",
    },
    { header: "จัดการ", accessor: "actions", className: "text-center" },
  ];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          รายการค่าใช้จ่าย
        </h1>
      </div>

      {/* Action buttons and search */}
      <div className="flex justify-between items-center mb-4 gap-x-4">
        <button
          className="bg-lamaError hover:bg-pink-400 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          onClick={() => {
            handleClear();
            handleOpenModal();
          }}
        >
          <i className="fas fa-plus"></i>
          <span className="hidden sm:inline">เพิ่มรายการ</span>
        </button>
        <TableSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหารายการ..."
        />
      </div>

      {/* Table section */}
      {isLoading ? (
        <div className="text-center py-4">กำลังโหลดข้อมูล...</div>
      ) : (
        <Table
          columns={columns}
          data={expense}
          renderRow={(item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center">{item.orderid}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.name}</td>
              <td className="px-6 py-4 text-center hidden md:table-cell">
                {item.quantity}
              </td>
              <td className="px-6 py-4 text-right hidden md:table-cell">
                {item.totalprice.toLocaleString()} บาท
              </td>
              <td className="px-6 py-4 text-center hidden md:table-cell">
                {dayjs(item.datetime).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-lamaError hover:bg-pink-400 text-white p-2 rounded-full mr-2 h-10 w-10"
                  onClick={() => handleEdit(item.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full h-10 w-10"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {/* Pagination section */}
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={(newPage) =>
            setPage(Math.max(1, Math.min(newPage, totalPage)))
          }
          totalRows={totalRows}
        />
      </div>

      {/* Modal for create/edit */}
      <Modal
        isOpen={isShowModal}
        title={id ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รายการ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="ชื่อรายการ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวน
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="จำนวน"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ราคารวม
            </label>
            <input
              type="number"
              value={totalprice}
              onChange={(e) => setTotalprice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="ราคารวม"
              min="0"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={handleCloseModal}
            >
              ยกเลิก
            </button>
            <button
              className="px-4 py-2 text-white rounded-md bg-lamaError hover:bg-pink-400"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExpensePage;
