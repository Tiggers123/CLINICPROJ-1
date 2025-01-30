// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { config } from "../../../config";
// import { useSearchParams } from "next/navigation";
// import dayjs from "dayjs";

// export default function PrintPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [sell, setSell] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (id) {
//       fetchData();
//     }
//   }, [id]);

//   const fetchData = async (): Promise<void> => {
//     try {
//       const res = await axios.get(`${config.apiUrl}/sell/info/${id}`);
//       setSell(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const printDocument = () => {
//     const style = document.createElement("style");
//     style.textContent = `
//       @media print {
//           @page { 
//               size: A4 landscape;
//               margin: 0;
//           }
//           body {
//               margin: 0;
//               padding: 0;
//           }
//           body * {
//               visibility: hidden;
//           }
//           #print-content, #print-content * {
//               visibility: visible;
//           }
//           #print-content {
//               position: absolute;
//               left: 0;
//               top: 0;
//               width: 100%;
//               height: auto;
//           }
//           .content-header {
//               display: none;
//           }
//           table, th, td {
//               border: none !important;
//           }
//       }
//     `;
//     document.head.appendChild(style);

//     setTimeout(() => {
//       window.print();
//     }, 300);
//   };

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//       {/* ปุ่มพิมพ์ชิดขวา และเป็นสีชมพู */}
//       <div className="content-header flex justify-end mb-4">
//         <button
//           className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition"
//           onClick={printDocument}
//         >
//           <i className="fa-solid fa-print mr-3"></i>
//           พิมพ์บิล
//         </button>
//       </div>

//       {/* แสดง Loading ขณะโหลดข้อมูล */}
//       {loading ? (
//         <div className="text-center py-6 text-gray-500">กำลังโหลดข้อมูล...</div>
//       ) : (
//         <div id="print-content" className="p-8 text-sm">
//           {/* หัวข้อใบเสร็จ */}
//           <div className="text-center text-2xl font-bold mb-4">
//             ใบเสร็จรับเงิน
//           </div>

//           {/* ข้อมูลร้านค้า */}
//           <div className="pb-4 mb-4 border-b border-gray-300 flex justify-between">
//             <div>
//               <div>ร้าน: {sell?.shopName || "มงคลคีย์คลีนิค"}</div>
//               <div>ที่อยู่: {sell?.shopAddress || "ไม่ระบุ"}</div>
//               <div>โทร: {sell?.shopPhone || "ไม่ระบุ"}</div>
//             </div>
//             <div className="text-right">
//               <div>เลขที่ใบเสร็จ: {sell?.id || "-"}</div>
//               <div>
//                 วันที่ออกบิล:{" "}
//                 {sell?.date ? dayjs(sell.date).format("DD/MM/YYYY") : "-"}
//               </div>
//               <div>ลูกค้า: {sell?.customerName || "-"}</div>
//             </div>
//           </div>

//           {/* รายการสินค้า */}
//           <table className="w-full text-lg border-collapse print:border-none">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2 text-left print:border-none">
//                   รายการ
//                 </th>
//                 <th className="px-4 py-2 text-center print:border-none">
//                   จำนวน
//                 </th>
//                 <th className="px-4 py-2 text-right print:border-none">ราคา</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sell?.items && sell.items.length > 0 ? (
//                 sell.items.map((item: any, index: number) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 print:border-none">{item.name}</td>
//                     <td className="px-4 py-2 text-center print:border-none">
//                       {item.quantity || 1}
//                     </td>
//                     <td className="px-4 py-2 text-right print:border-none">
//                       {item.price.toLocaleString()} บาท
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={3}
//                     className="px-4 py-2 text-center text-gray-500 print:border-none"
//                   >
//                     ไม่มีรายการสินค้า
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* ราคารวม */}
//           <div className="pt-4 mt-4 text-right text-2xl font-bold border-t border-gray-300 print:border-none">
//             รวมทั้งหมด: {sell?.total ? sell.total.toLocaleString() : "0"} บาท
//           </div>

//           {/* ข้อความขอบคุณ */}
//           <div className="mt-6 text-center text-lg font-semibold">
//             *** ขอบคุณที่ใช้บริการ ***
//           </div>

//           {/* ซ่อนเส้นกรอบตอนพิมพ์ */}
//           <style jsx>{`
//             @media print {
//               table,
//               th,
//               td {
//                 border: none !important;
//               }
//             }
//           `}</style>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PrintPage() {
  const [sell, setSell] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const mockData = {
      shopName: "มงคลคีย์คลีนิค",
      shopAddress: "123 ถนนสุขใจ กรุงเทพฯ",
      shopPhone: "081-234-5678",
      id: "INV-20250130-001",
      date: new Date().toISOString(),
      customerName: "นายสมชาย ใจดี",
      items: [
        { name: "ทำฟันขูดหินปูน", quantity: 1, price: 800 },
        { name: "อุดฟันสีเหมือนฟัน", quantity: 2, price: 1500 },
        { name: "ถอนฟันคุด", quantity: 1, price: 3000 },
      ],
      total: 800 + 1500 * 2 + 3000, // คำนวณราคารวม
    };

    setTimeout(() => {
      setSell(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const printDocument = () => {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0; padding: 0; }
          body * { visibility: hidden; }
          #print-content, #print-content * { visibility: visible; }
          #print-content { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
          .content-header { display: none; }
          table, th, td { border: none !important; }
          /* เพิ่มเส้นใต้เหนือ "รวมทั้งหมด" */
          .total-line { 
            border-top: 1px solid #D1D5DB !important; 
            padding-top: 10px;
          }
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* ปุ่มพิมพ์สีชมพู ชิดขวา */}
      <div className="content-header flex justify-end mb-4">
        <button
          className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          onClick={printDocument}
        >
          <i className="fa-solid fa-print mr-3"></i>
          พิมพ์บิล
        </button>
      </div>

      {/* แสดง Loading ขณะโหลดข้อมูล */}
      {loading ? (
        <div className="text-center py-6 text-gray-500">กำลังโหลดข้อมูล...</div>
      ) : (
        <div id="print-content" className="p-8 text-sm">
          {/* หัวข้อใบเสร็จ */}
          <div className="text-center text-2xl font-bold mb-4">
            ใบเสร็จรับเงิน
          </div>

          {/* ข้อมูลร้านค้า */}
          <div className="pb-4 mb-4 border-b border-gray-300 flex justify-between">
            <div>
              <div>ร้าน: {sell.shopName}</div>
              <div>ที่อยู่: {sell.shopAddress}</div>
              <div>โทร: {sell.shopPhone}</div>
            </div>
            <div className="text-right">
              <div>เลขที่ใบเสร็จ: {sell.id}</div>
              <div>วันที่ออกบิล: {dayjs(sell.date).format("DD/MM/YYYY")}</div>
              <div>ลูกค้า: {sell.customerName}</div>
            </div>
          </div>

          {/* รายการสินค้า */}
          <table className="w-full text-lg border-collapse print:border-none">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left print:border-none">
                  รายการ
                </th>
                <th className="px-4 py-2 text-center print:border-none">
                  จำนวน
                </th>
                <th className="px-4 py-2 text-right print:border-none">ราคา</th>
              </tr>
            </thead>
            <tbody>
              {sell.items.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2 print:border-none">{item.name}</td>
                  <td className="px-4 py-2 text-center print:border-none">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-right print:border-none">
                    {item.price.toLocaleString()} บาท
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ราคารวม พร้อมเส้นใต้ */}
          <div className="pt-4 mt-4 text-right text-2xl font-bold border-t border-gray-300 print:border-none total-line">
            รวมทั้งหมด: {sell.total.toLocaleString()} บาท
          </div>

          {/* ข้อความขอบคุณ */}
          <div className="mt-6 text-center text-lg font-semibold">
            *** ขอบคุณที่ใช้บริการ ***
          </div>

          {/* ซ่อนเส้นกรอบตอนพิมพ์ */}
          <style jsx>{`
            @media print {
              table,
              th,
              td {
                border: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
