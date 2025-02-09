// "use client";

// import { useEffect, useState } from "react";
// import dayjs from "dayjs";

// export default function PrintPage() {
//   const [sell, setSell] = useState<any>(null);

//   useEffect(() => {
//     const mockData = {
//       shopName: "At Home Dental Clinic",
//       shopAddress: "100/9 ถนนหลักสุข เขตสาทร กรุงเทพฯ 10120",
//       shopPhone: "099-908-6251",
//       licenseNo: "50130301964",
//       id: "INV-20250130-001",
//       date: new Date().toISOString(),
//       receivedFrom: "นายสมชาย ใจดี",
//       treatment: "โปรแกรมขูดหินปูน และเคลือบฟลูออไรด์",
//       amount: 1199,
//       discount: 0,
//       total: 1199,
//       paymentMethod: "เงินสด",
//       outstanding: 0,
//       cashier: "เจ้าหน้าที่คลินิก",
//     };

//     setTimeout(() => {
//       setSell(mockData);
//     }, 1000);
//   }, []);

//   const printDocument = () => {
//     const style = document.createElement("style");
//     style.textContent = `
//       @media print {
//           @page { size: A4 landscape; margin: 0; }
//           body { margin: 0; padding: 0; }
//           body * { visibility: hidden; }
//           #print-content, #print-content * { visibility: visible; }
//           #print-content { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
//           .content-header { display: none; }
//           table, th, td { border: 1px solid #000 !important; padding: 8px; text-align: left; }
//           .total-line { 
//             border-top: 2px solid #000 !important; 
//             padding-top: 10px;
//             font-weight: bold;
//           }
//       }
//     `;
//     document.head.appendChild(style);
//     setTimeout(() => window.print(), 300);
//   };

//   return (
//     <div className="bg-white p-8 rounded-md flex-1 m-4 shadow-md mt-1">
//       {sell && (
//         <div
//           id="print-content"
//           className="p-8 text-sm border border-gray-400 rounded-md"
//         >
//           <div className="text-center text-2xl font-bold mb-4">
//             ใบเสร็จรับเงิน
//           </div>
//           <div className="flex justify-between items-center mb-4">
//             <img src="/logo.png" alt="Clinic Logo" className="h-20" />
//             <div className="text-right">
//               <div className=" text-lg">{sell.shopName}</div>
//               <div>{sell.shopAddress}</div>
//               <div>โทร: {sell.shopPhone}</div>
//               <div>ใบอนุญาตเลขที่: {sell.licenseNo}</div>
//             </div>
//           </div>

//           <div className="border-t border-gray-400 pt-4">
//             <div className="flex justify-between">
//               <div>วันที่: {dayjs(sell.date).format("DD/MM/YYYY")}</div>
//               <div>เลขที่ใบเสร็จ: {sell.id}</div>
//             </div>
//             <div>รับเงินจาก: {sell.receivedFrom}</div>
//           </div>

//           <table className="w-full text-lg border-collapse mt-4 border border-black">
//             <thead>
//               <tr className="bg-gray-200 border border-black">
//                 <th className="py-2 px-4 border border-black">รายละเอียด</th>
//                 <th className="py-2 px-4 border border-black text-right">
//                   จำนวนเงิน (บาท)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-2 px-4 border border-black">
//                   {sell.treatment}
//                 </td>
//                 <td className="py-2 px-4 border border-black text-right">
//                   {sell.amount.toLocaleString()}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border border-black">ส่วนลด</td>
//                 <td className="py-2 px-4 border border-black text-right">
//                   {sell.discount.toLocaleString()}
//                 </td>
//               </tr>
//               <tr className="total-line">
//                 <td className="py-2 px-4 border border-black ">
//                   รวมทั้งหมด
//                 </td>
//                 <td className="py-2 px-4 border border-black text-right ">
//                   {sell.total.toLocaleString()}
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className=" mt-4">
//             <div>วิธีชำระเงิน: {sell.paymentMethod}</div>
//             <div>ยอดค้างชำระ: {sell.outstanding} บาท</div>
//             <div >ผู้รับเงิน: {sell.cashier}</div>
//           </div>

//           <div className="mt-6 text-center font-semibold">
//             *** ขอบคุณที่ใช้บริการ ***
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end mt-4">
//         <button
//           className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition"
//           onClick={printDocument}
//         >
//           <i className="fa-solid fa-print mr-3"></i>
//           พิมพ์บิล
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PrintPage() {
  const [sell, setSell] = useState<any>(null);

  useEffect(() => {
    const mockData = {
      shopName: "มงคลคีรีคลีนิค",
      shopAddress: "100/9 ถนนหลักสุข เขตสาทร กรุงเทพฯ 10120",
      shopPhone: "099-908-6251",
      licenseNo: "50130301964",
      id: "22/1267-11756",
      barcode: "6500807",
      date: new Date().toISOString(),
      receivedFrom: "นาย A",
      receivedFromAddress: "มหาวิทยาลัยเชียงใหม่",
      receivedFromPhone: "123456789",
      treatments: [
        { id: 1, name: "ชื่อรายการที่ 1", amount: 100 },
        { id: 2, name: "ชื่อรายการที่ 2", amount: 200 },
        { id: 3, name: "ชื่อรายการที่ 3", amount: 600 },
        { id: 4, name: "ชื่อรายการที่ 4", amount: 1000 },
        { id: 5, name: "ชื่อรายการที่ 5", amount: 500 },
        { id: 6, name: "ชื่อรายการที่ 6", amount: 900 },
      ],
      discount: 0,
      paymentMethod: "เงินสด",
      outstanding: 0,
      cashier: "เจ้าหน้าที่คลินิก",
      dentist: "นายแพทย์ โอม ห้าหก",
    };
    setTimeout(() => {
      setSell(mockData);
    }, 1000);
  }, []);

  const totalAmount =
    sell?.treatments.reduce(
      (sum: number, item: { id: number; name: string; amount: number }) =>
        sum + item.amount,
      0
    ) || 0;

  const printDocument = () => {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-hidden, header, footer, nav, .next-app-header, .next-app-footer { display: none !important; }
        a[href]:after { content: none !important; }
        @page { margin: 0; }
        body { margin: 0; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-hidden, header, footer, nav, .next-app-header { display: none !important; }
        a[href]:after { content: none !important; }
        @page { size: A4 landscape; margin: 0; }
        body { margin: 0; padding: 0; }
        body * { visibility: hidden; }
        #print-content, #print-content * { visibility: visible; }
        #print-content { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
        header, footer, nav, .print-hidden { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="bg-white p-8 rounded-md flex-1 m-4 shadow-md mt-1">
      {sell && (
        <div id="print-content" className="p-8 ">
          <div className="flex items-center mb-4 w-full ">
            <img src="/logo.png" alt="Clinic Logo" className="h-20 " />
            <div className="text-center flex-1 text-3xl font-bold ">
              ใบเสร็จรับเงิน
            </div>
          </div>

          <div className="text-left mb-2 hidden sm:block">
            {sell.shopAddress} Tel: {sell.shopPhone}
          </div>

          <div className="flex justify-between items-center mb-2 hidden sm:flex">
            <div>ใบอนุญาตเลขที่ (License No.):{sell.licenseNo}</div>
            <div>เลขที่: {sell.id}</div>
          </div>
          <div className="flex justify-between items-center mb-4 hidden sm:flex">
            <div>รับเงินจาก (Received from): {sell.receivedFrom}</div>
            <div>วันที่: {dayjs(sell.date).format("DD/MM/YYYY")}</div>
          </div>
          <div className="-mt-2 hidden sm:block">
            ที่อยู่: {sell.receivedFromAddress} Tel: {sell.receivedFromPhone}
          </div>

          <table className="w-full text-lg border-collapse mt-4 border border-black">
            <thead>
              <tr className="bg-[#FFC9D6] text-black">
                <th className="py-2 px-4 border border-black">รหัส</th>
                <th className="py-2 px-4 border border-black">รายการ</th>
                <th className="py-2 px-4 border border-black text-right">
                  จำนวนเงิน
                </th>
                <th className="py-2 px-4 border border-black text-right">
                  ส่วนลด
                </th>
                <th className="py-2 px-4 border border-black text-right">
                  จำนวนเงินสุทธิ
                </th>
              </tr>
            </thead>
            <tbody>
              {sell.treatments.map(
                (item: { id: number; name: string; amount: number }) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border border-black text-center">
                      {item.id}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border border-black text-right">
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border border-black text-right">
                      0.00
                    </td>
                    <td className="py-2 px-4 border border-black text-right">
                      {item.amount.toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr className=" bg-[#FFC9D6] text-black">
                <td
                  className="py-2 px-4 border border-black text-center"
                  colSpan={4}
                >
                  รวมเป็นเงิน
                </td>
                <td className="py-2 px-4 border border-black text-right">
                  {totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="mt-4 text-sm hidden sm:block">
            <div>เจ้าหน้าที่ : {sell.dentist}</div>
            <div className="mt-2">
              ผู้ชำระเงิน (Payer): _______________________ ผู้รับเงิน (Cashier):
              _______________________
            </div>
            <div className="mt-2">
              วันที่ (Date): _______________________ เวลา (Time):
              _______________________
            </div>
          </div>
          <div className="flex justify-end mt-4 print-hidden">
            <button
              className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition"
              onClick={printDocument}
            >
              <i className="fa-solid fa-print mr-3"></i>พิมพ์บิล
            </button>
          </div>
        </div>
      )}
    </div>
  );
}