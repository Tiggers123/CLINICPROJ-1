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

interface Bill {
  date: string;
  name: string;
  totalamount: number;
}




const BillRecord = () => {
  const [sellList, setSellList] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  /*pagination*/
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

   useEffect(() => {
     fetchData();
   }, [page]);

  const fetchData = async () => {
    try {
      // const res = await axios.get(`${config.apiUrl}/sell/history`);
      // setSellList(res.data);
      // const resp = await axios.get(`${config.apiUrl}/sell/list/${page}`);
      // setSellList(resp.data.sellList);
      // setTotalRows(resp.data.totalRows);
      // setTotalPage(resp.data.totalPages);
      const { data } = await axios.get(`${config.apiUrl}/sell/list/${page}`);
      setSellList(data.sellList);
      setTotalRows(data.totalRows);
      setTotalPage(data.totalPages);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  const data: Bill[] = [
    { date: "01/01/2023 ", name: "หมายเหตุ 1", totalamount: 100 },
    { date: "02/05/2023 ", name: "หมายเหตุ 2", totalamount: 200 },
    { date: "03/04/2023 ", name: "หมายเหตุ 3", totalamount: 300 },
  ];

  const filteredData = data.filter((item) =>
    dayjs(item.date.trim()).format("DD/MM/YYYY").includes(searchQuery.trim())
  );

  const columns = [
    { header: "วันที่", accessor: "date" },
    {
      header: "รายการ",
      accessor: "optional",
      className: "hidden md:table-cell",
    },
    { header: "ราคา", accessor: "amount", className: "hidden md:table-cell" },
    { header: "พิมพ์บิล", accessor: "action", className: "text-center" },
  ];

  // return (
  //   <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
  //     {/* TOP SECTION */}
  //     <div className="flex items-center justify-end mb-4">
  //       <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mr-2">
  //         <TableSearch
  //           value={searchQuery}
  //           onChange={(e) => setSearchQuery(e.target.value)}
  //           placeholder="ค้นหาวันที่ (DD/MM/YYYY)"
  //         />
  //       </div>
  //     </div>
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* TOP SECTION */}
      <div className="flex items-center justify-end mb-4">
        <TableSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาวันที่ (DD/MM/YYYY)"
        />
      </div>

      {/* LIST SECTION */}
      <Table
        columns={columns}
        data={filteredData}
        renderRow={(item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-center ">
              {/* {dayjs(item.payDate).format("DD/MM/YYYY")} */}
              {item.date}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {item.name}
            </td>
            <td className="px-6 py-4 text-center hidden md:table-cell">
              {/* {item.toLocaleString()} */}
              {item.totalamount.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex justify-center">
                <a
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 text-white"
                  target="_blank"
                  // href={`manage/print?id=${item.id}`}
                  href={`/manage/print?id=${item.id}`}
                >
                  <i className="fa-solid fa-print"></i>
                </a>
              </div>
            </td>
          </tr>
        )}
      />
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
    </div>
  );
};

export default BillRecord;
