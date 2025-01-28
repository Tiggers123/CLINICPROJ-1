// const Page = () => {
//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//       Page
//     </div>
//   );
// };

// export default Page;
"use client";

import { useEffect, useState } from "react";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page() {
  const [serial, setSerial] = useState("");
  const [price, setPrice] = useState(0);
  const [sells, setSells] = useState([]); // ข้อมูลทั้งหมด
  const [id, setId] = useState(0); // ข้อมูล id เอาไว้แก้ไข หรือลบรายการ
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  const handleSave = async () => {
    try {
      const payload = {
        serial: serial,
        price: price,
      };
      await axios.post(`${config.apiUrl}/sell/create`, payload);
      fetchData();
    } catch (error: any) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "ไม่พบรายการสินค้า",
          text: "ไม่พบรายการสินค้า หรือไม่มีในสต้อก",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error.message,
        });
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/list`);
      setSells(response.data);

      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        total += response.data[i].price;
      }
      setTotalAmount(total);
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

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        text: "ลบรายการนี้หรือไม่?",
        title: "คุณต้องการลบรายการนี้หรือไม่?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/sell/remove/${id}`);
        fetchData();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleConfirm = async () => {
    try {
      const button = await Swal.fire({
        text: "ยืนยันการขายหรือไม่?",
        title: "ยืนยันการขาย",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.get(`${config.apiUrl}/sell/confirm`);
        fetchData();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div className="content-header flex justify-between">
        <div>ขายสินค้า</div>
        <div>
          <button
            className="btn text-lg"
            onClick={() => router.push("/try/history")}
          >
            <i className="fa-solid fa-file-alt mr-3"></i>
            ประวัติการขาย
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <div className="w-full">
          <div>serial</div>
          <input type="text" onChange={(e) => setSerial(e.target.value)} />
        </div>
        <div className="">
          <div>ราคา</div>
          <input
            type="number"
            className="text-right"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <button className=" flex items-center" onClick={handleSave}>
            <i className="fa-solid fa-save mr-2"></i>
            บันทึก
          </button>
        </div>
      </div>

      <table className="table mt-5">
        <thead>
          <tr>
            <th className="text-left">serial</th>
            <th className="text-left">รายการสินค้า</th>
            <th className="text-right pr-0">ราคา</th>
            <th className="w-[50px]"></th>
          </tr>
        </thead>
        <tbody>
          {sells.map((item: any) => (
            <tr key={item.id}>
              <td>{item.product.serial}</td>
              <td>{item.product.name}</td>
              <td className="text-right">{item.price.toLocaleString()}</td>
              <td className="text-center">
                <button
                  className=""
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="fa-solid fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sells.length > 0 && (
        <>
          <div className="mt-5 flex justify-between">
            <div>ยอดรวมทั้งหมด</div>
            <div className="text-right font-bold bg-gray-300 px-4 py-2 rounded-md">
              {totalAmount.toLocaleString()}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button className="" onClick={handleConfirm}>
              <i className="fa-solid fa-check mr-2"></i>
              ยืนยันการขาย
            </button>
          </div>
        </>
      )}
    </div>
  );
}