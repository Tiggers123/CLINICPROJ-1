// "use client";

// import { useEffect, useState } from "react";
// import Table from "@/app/components/Table";
// import TableSearch from "@/app/components/TableSearch";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { config } from "../../config";
// import dayjs from "dayjs";
// import { useRouter } from "next/navigation";
// import "@fortawesome/fontawesome-free/css/all.css";
// import Pagination from "@/app/components/Pagination";

// interface Bill {
//   date: string;
//   name: string;
//   totalamount: number;
// }

// const BillRecord = () => {
//   const [sellList, setSellList] = useState<Bill[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   /*pagination*/
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);

//    useEffect(() => {
//      fetchData();
//    }, [page]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${config.apiUrl}/sell/history`);
//       setSellList(res.data);
//        const lires = await axios.get(`${config.apiUrl}/sell/list/${page}`);
//       setSellList(lires.data.sellList);
//       setTotalRows(lires.data.totalRows);
//       setTotalPage(lires.data.totalPages);
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "เกิดข้อผิดพลาด",
//         text: error.message,
//       });
//     }
//   };


//   const filteredData = sellList.filter((item) =>
//     dayjs(item.date.trim()).format("DD/MM/YYYY").includes(searchQuery.trim())
//   );

//   const columns = [
//     { header: "วันที่", accessor: "date" },
//     {
//       header: "รายการ",
//       accessor: "optional",
//       className: "hidden md:table-cell",
//     },
//     { header: "ราคา", accessor: "amount", className: "hidden md:table-cell" },
//     { header: "พิมพ์บิล", accessor: "action", className: "text-center" },
//   ];

//   // return (
//   //   <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//   //     {/* TOP SECTION */}
//   //     <div className="flex items-center justify-end mb-4">
//   //       <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mr-2">
//   //         <TableSearch
//   //           value={searchQuery}
//   //           onChange={(e) => setSearchQuery(e.target.value)}
//   //           placeholder="ค้นหาวันที่ (DD/MM/YYYY)"
//   //         />
//   //       </div>
//   //     </div>
//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//       {/* TOP SECTION */}
//       <div className="flex items-center justify-end mb-4">
//         <TableSearch
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="ค้นหาวันที่ (DD/MM/YYYY)"
//         />
//       </div>

//       {/* LIST SECTION */}
//       <Table
//         columns={columns}
//         data={filteredData}
//         renderRow={(item) => (
//           <tr key={item.id} className="hover:bg-gray-50">
//             <td className="px-6 py-4 text-center ">
//               {/* {dayjs(item.payDate).format("DD/MM/YYYY")} */}
//               {item.date}
//             </td>
//             <td className="px-6 py-4 text-center hidden md:table-cell">
//               {item.name}
//             </td>
//             <td className="px-6 py-4 text-center hidden md:table-cell">
//               {/* {item.toLocaleString()} */}
//               {item.totalamount.toLocaleString()}
//             </td>
//             <td className="px-6 py-4 text-center">
//               <div className="flex justify-center">
//                 <a
//                   className="w-7 h-7 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 text-white"
//                   target="_blank"
//                   // href={`manage/print?id=${item.id}`}
//                   href={`/manage/print?id=${item.id}`}
//                 >
//                   <i className="fa-solid fa-print"></i>
//                 </a>
//               </div>
//             </td>
//           </tr>
//         )}
//       />
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
//     </div>
//   );
// };

// export default BillRecord;

"use client";

import { useEffect, useState } from "react";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.css";
import Pagination from "@/app/components/Pagination";

interface SaleItem {
  id: string;
  productName: string;
  productCode: string;
  qty: number;
  price: number;
}

interface Bill {
  billId: string;
  date: string;
  items: SaleItem[];
  totalAmount: number;
}

const BillRecord = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/sell/history`);
      setBills(res.data);

      // Calculate pagination
      const itemsPerPage = 10;
      const totalItems = res.data.length;
      setTotalRows(totalItems);
      setTotalPage(Math.ceil(totalItems / itemsPerPage));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter bills based on search query
  const filteredBills = bills.filter((bill) => {
    const searchDate = dayjs(bill.date).format("DD/MM/YYYY");
    const searchBillId = bill.billId.toLowerCase();
    const searchStr = searchQuery.toLowerCase().trim();

    return searchDate.includes(searchStr) || searchBillId.includes(searchStr);
  });

  // Pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBills = filteredBills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const columns = [
    {
      header: "เลขที่บิล",
      accessor: "billId",
      className: "text-center w-1/5",
    },
    {
      header: "วันที่",
      accessor: "date",
      className: "text-center w-1/5",
    },
    {
      header: "จำนวนรายการ",
      accessor: "itemCount",
      className: "text-center hidden md:table-cell w-1/5",
    },
    {
      header: "ยอดรวม",
      accessor: "totalAmount",
      className: "text-center hidden md:table-cell w-1/5",
    },
    {
      header: "จัดการ",
      accessor: "actions",
      className: "text-center w-1/5",
    },
  ];


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* Search Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">รายการบิล</h1>
        <div className="w-64">
          <TableSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาตามเลขที่บิล หรือ วันที่"
          />
        </div>
      </div>

      {/* Bills Table */}
      <Table
        columns={columns}
        data={paginatedBills}
        renderRow={(bill) => (
          <tr key={bill.billId} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-center">{bill.billId}</td>
            <td className="px-6 py-4 text-center">
              {dayjs(bill.date).format("DD/MM/YYYY HH:mm")}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {bill.items.length} รายการ
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              ฿{bill.totalAmount.toLocaleString()}
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-center gap-2">
                
                <a
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                  href={`/manage/print?id=${bill.billId}`}
                  target="_blank"
                  title="พิมพ์บิล"
                >
                  <i className="fas fa-print"></i>
                </a>
              </div>
            </td>
          </tr>
        )}
      />

      {/* Show message when no data */}
      {paginatedBills.length === 0 && (
        <div className="text-center py-8 text-gray-500">ไม่พบข้อมูลบิล</div>
      )}

      {/* Pagination */}
      {paginatedBills.length > 0 && (
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
      )}
    </div>
  );
};

export default BillRecord;