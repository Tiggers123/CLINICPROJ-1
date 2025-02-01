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
      id: "INV-20250130-001",
      date: new Date().toISOString(),
      receivedFrom: "นายสมชาย ใจดี",
      treatment: "โปรแกรมขูดหินปูน และเคลือบฟลูออไรด์",
      amount: 1199,
      discount: 0,
      total: 1199,
      paymentMethod: "เงินสด",
      outstanding: 0,
      cashier: "เจ้าหน้าที่คลินิก",
    };

    setTimeout(() => {
      setSell(mockData);
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
          table, th, td { border: 1px solid #000 !important; padding: 8px; text-align: left; }
          .total-line { 
            border-top: 2px solid #000 !important; 
            padding-top: 10px;
            font-weight: bold;
          }
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
          <div className="text-center text-2xl font-bold mb-4">
            ใบเสร็จรับเงิน
          </div>
          <div className="flex justify-between items-center mb-4">
            <img src="/logo.png" alt="Clinic Logo" className="h-20" />
            <div className="text-right">
              <div className=" text-lg">{sell.shopName}</div>
              <div>{sell.shopAddress}</div>
              <div>โทร: {sell.shopPhone}</div>
              <div>ใบอนุญาตเลขที่: {sell.licenseNo}</div>
            </div>
          </div>

          <div className="border-t border-gray-400 pt-4">
            <div className="flex justify-between">
              <div>วันที่: {dayjs(sell.date).format("DD/MM/YYYY")}</div>
              <div>เลขที่ใบเสร็จ: {sell.id}</div>
            </div>
            <div>รับเงินจาก: {sell.receivedFrom}</div>
          </div>

          <table className="w-full text-lg border-collapse mt-4 border border-black">
            <thead>
              <tr className="bg-gray-200 border border-black">
                <th className="py-2 px-4 border border-black">รายละเอียด</th>
                <th className="py-2 px-4 border border-black text-right">
                  จำนวนเงิน (บาท)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-black">
                  {sell.treatment}
                </td>
                <td className="py-2 px-4 border border-black text-right">
                  {sell.amount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-black">ส่วนลด</td>
                <td className="py-2 px-4 border border-black text-right">
                  {sell.discount.toLocaleString()}
                </td>
              </tr>
              <tr className="total-line">
                <td className="py-2 px-4 border border-black ">
                  รวมทั้งหมด
                </td>
                <td className="py-2 px-4 border border-black text-right ">
                  {sell.total.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          <div className=" mt-4">
            <div>วิธีชำระเงิน: {sell.paymentMethod}</div>
            <div>ยอดค้างชำระ: {sell.outstanding} บาท</div>
            <div >ผู้รับเงิน: {sell.cashier}</div>
          </div>

          <div className="mt-6 text-center font-semibold">
            *** ขอบคุณที่ใช้บริการ ***
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          className="text-xl bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          onClick={printDocument}
        >
          <i className="fa-solid fa-print mr-3"></i>
          พิมพ์บิล
        </button>
      </div>
    </div>
  );
}
