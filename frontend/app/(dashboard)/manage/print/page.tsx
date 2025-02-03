"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PrintPage() {
  const [sell, setSell] = useState<any>(null);

  useEffect(() => {
    const mockData = {
      shopName: "At Home Dental Clinic",
      shopAddress: "100/9 ถนนหลักสุข เขตสาทร กรุงเทพฯ 10120",
      shopPhone: "099-908-6251",
      licenseNo: "50130301964",
      id: "22/1267-11756",
      barcode: "6500807",
      date: "22/12/2567",
      receivedFrom: "คุณไทเกอร์ แทนเนอร์",
      receivedFromId: "6500807",
      receivedFromAddress: "139 ลำทอง, เชียงคำ, พะเยา",
      receivedFromPhone: "0909608251",
      treatments: [
        { id: 1, name: "ชื่อรายการที่ 1", amount: 100 },
        { id: 2, name: "ชื่อรายการที่ 2", amount: 200 },
        { id: 3, name: "ชื่อรายการที่ 3", amount: 600 },
        { id: 4, name: "ชื่อรายการที่ 4", amount: 1000 },
        { id: 5, name: "ชื่อรายการที่ 5", amount: 500 },
        { id: 6, name: "ชื่อรายการที่ 6", amount: 600 },
      ],
      discount: 0,
      paymentMethod: "เงินสด",
      outstanding: 0,
      cashier: "เจ้าหน้าที่คลินิก",
      dentist: "ทพญ.ธิดารัตน์ โสภาศรี",
    };
    setSell(mockData);
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
        <div
          id="print-content"
          className="p-8 text-sm border border-gray-400 rounded-md"
        >
          <div className="flex justify-between items-center mb-4">
            <img src="/logo.png" alt="Clinic Logo" className="h-20" />
            <div className="text-center w-full text-2xl font-bold pr-8">
              {sell.shopName}
            </div>
          </div>
          <div className="text-left mb-4">
            {sell.shopAddress} Tel: {sell.shopPhone}
          </div>
          <div className="text-center w-full text-xl font-bold mb-4 pl-4">
            ใบเสร็จรับเงิน
          </div>
          <div className="flex justify-between items-center mb-2">
            <div>
              ใบอนุญาตเลขที่ (License No.): <strong>{sell.licenseNo}</strong>
            </div>
            <div>
              เลขที่: <strong>{sell.id}</strong>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              รับเงินจาก (Received from):{" "}
              <strong>
                {sell.receivedFrom} ({sell.receivedFromId})
              </strong>
            </div>
            <div>
              วันที่ (Date): <strong>{sell.date}</strong>
            </div>
          </div>
          <div>
            ที่อยู่: <strong>{sell.receivedFromAddress}</strong> Tel:{" "}
            <strong>{sell.receivedFromPhone}</strong>
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
              <tr className="font-bold bg-[#FFC9D6] text-black">
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
          <div className="mt-4 text-sm">
            <div>หมอฟัน (Dentist): {sell.dentist}</div>
            <div>
              ผู้ชำระเงิน (Payer): _______________________ ผู้รับเงิน (Cashier):
              _______________________
            </div>
            <div>
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
