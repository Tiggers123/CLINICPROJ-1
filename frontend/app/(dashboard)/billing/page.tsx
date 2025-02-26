"use client";

import { useEffect, useState } from "react";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Table from "@/app/components/Table";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Page = () => {
  const [code, setCode] = useState("");
  const [quantity, setQty] = useState(0);
  const [sells, setSells] = useState([]); // ข้อมูลทั้งหมด
  const [discount, setDiscount] = useState(0); // ส่วนลด %
  const [finalAmount, setFinalAmount] = useState(0); // ราคาหลังหักส่วนลด
  const [totalAmount, setTotalAmount] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [id, setId] = useState(0);
  const router = useRouter();

  const fetchStockDetails = async (stock_id: string): Promise<number> => {
    try {
      if (!stock_id) return 0;
      const response = await axios.get(
        `${config.apiUrl}/api/stocks?stock_id=${stock_id}`
      );

      if (response.data && response.data.length > 0) {
        const stock = response.data.find(
          (item: any) => item.stock_id === Number(stock_id)
        );

        if (!stock) {
          setProductPrice(0);
          console.log("Stock not found for code:", stock_id);
          return 0;
        }

        const unitPrice = parseFloat(stock.unit_price);
        console.log("Fetched unitPrice:", unitPrice); // ตรวจสอบค่าที่ดึงมา

        if (!isNaN(unitPrice)) {
          setProductPrice(unitPrice);
        } else {
          setProductPrice(0);
        }
        return unitPrice;
      }

      setProductPrice(0);
      return 0;
    } catch (error) {
      setProductPrice(0);
      console.error("Error fetching stock details:", error);
      return 0;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/bill/list`);
      setSells(response.data);

      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        total += parseFloat(response.data[i].subtotal);
      }
      setTotalAmount(total);
      calculateDiscount(total, discount);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  const calculateDiscount = (total: number, discount: number): void => {
    const discountedPrice = total - (total * discount) / 100;
    setFinalAmount(discountedPrice);
  };

  const handleSave = async () => {
    try {
      if (!code || quantity <= 0) {
        Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกรหัสสินค้าและจำนวนให้ถูกต้อง",
        });
        return;
      }

      const totalPrice = productPrice * quantity;

      setTotalAmount(totalPrice);

      const payload = {
        items: [
          {
            stock_id: code,
            quantity: quantity,
            price: totalPrice,
          },
        ],
      };

      await axios.post(`${config.apiUrl}/api/bill/create`, payload);
      setCode("");
      setQty(0);
      setProductPrice(0);
      fetchData();
    } catch (error: any) {
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "ไม่พบรายการสินค้า",
          text: "ไม่พบรายการสินค้า หรือไม่มีในสต็อก",
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
        await axios.delete(`${config.apiUrl}/api/bill/remove/${id}`);
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
        const payload = {
          final_amount: finalAmount,
          discount: discount,
        };

        await axios.post(`${config.apiUrl}/api/bill/confirm`, payload);
        setSells([]);
        setDiscount(0);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (code) {
      fetchStockDetails(code);
    } else {
      setProductPrice(0);
    }
  }, [code]);

  useEffect(() => {
    if (totalAmount && discount >= 0) {
      const discountedPrice = totalAmount - (totalAmount * discount) / 100;
      setFinalAmount(discountedPrice);
    } else {
      setFinalAmount(totalAmount);
    }
  }, [totalAmount, discount]);

  const columns = [
    { header: "รหัส", accessor: "stock_id", className: "text-center text-lg" },
    {
      header: "รายการ",
      accessor: "drug_name",
      className: "text-center hidden sm:table-cell text-lg ",
    },
    {
      header: "จำนวน",
      accessor: "quantity",
      className: "text-center hidden sm:table-cell text-lg",
    },
    {
      header: "ราคา/หน่วย",
      accessor: "unit_price",
      className: "text-center text-lg",
    },
    {
      header: "ลบข้อมูล",
      accessor: "actions",
      className: "text-center text-lg",
    },
  ];
  //ไม่แน่ใจว่า tr key ต้อง index ไหม
  const renderRow = (item: any) => (
    <tr key={item.id} className="text-center hover:bg-gray-50">
      <td className="px-6 py-4">{item.stock_id}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{item.drug_name}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{item.quantity}</td>
      <td className="px-6 py-4 ">{item.unit_price.toLocaleString()}</td>
      <td className="px-6 py-4 ">
        <button
          className="w-8 h-8 text-white bg-lamared hover:bg-red-500  rounded-full "
          onClick={() => handleDelete(item.bill_item_id)}
        >
          <i className="fa-solid fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      <div className="flex justify-end">
        <button
          className=" bg-lamaPink text-white text-xl px-4 py-2.5 rounded-md  hover:bg-lamahover transition"
          onClick={() => router.push("/manage")}
        >
          <i className="fa-solid fa-file-alt mr-3 "></i>
          ประวัติการขาย
        </button>
      </div>
      <div className="flex gap-2 items-end">
        <div className="w-full">
          <h2 className="ml-1 text-xl mb-1">รหัส</h2>
          <input
            className="p-3 rounded-md border border-gray-600 w-full text-sm"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
          />
        </div>
        <div className="w-full">
          <h2 className=" ml-1 text-xl">จำนวน</h2>
          <input
            className="p-3 rounded-md border border-gray-600 w-full text-sm"
            type="number"
            value={quantity}
            onChange={(e) => setQty(Number(e.target.value))}
            placeholder="จำนวน"
          />
        </div>
        <div className="w-full ">
          <h2 className=" ml-1 text-xl">ราคา</h2>
          <input
            className="p-3 rounded-md border border-gray-600 w-full text-sm "
            type="number"
            value={productPrice}
            readOnly
          />
        </div>

        <button
          className="bg-lamaPink text-lg text-white px-4 py-2.5 rounded-md hover:bg-lamahover transition flex items-center gap-2"
          onClick={handleSave}
        >
          <i className="fa-solid fa-save"></i>
          <span>บันทึก</span>
        </button>
      </div>
      <Table columns={columns} data={sells} renderRow={renderRow} />
      {sells.length > 0 && (
        <>
          <div className=" ml-2 mr-2 mt-4 flex justify-between items-center">
            <div>ยอดเงินทั้งหมด</div>
            <div className="font-bold bg-gray-100 px-4 py-2 rounded-md">
              {totalAmount.toLocaleString()}
            </div>
          </div>
          {/*ส่วนลดเดี่ยวมาแก้*/}
          <div className="ml-2 mr-2 mt-2 flex justify-between items-center">
            <div>ส่วนลด (%)</div>
            <input
              className="p-2 rounded-md border border-gray-600 w-20 text-center"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="%"
            />
          </div>

          <div className="ml-2 mr-2 mt-2 flex justify-between items-center">
            <div>จำนวนเงิน</div>
            <div className="font-bold bg-gray-100 px-4 py-2 rounded-md">
              {finalAmount.toLocaleString()}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              className="bg-lamaPink text-white px-4 py-2.5 rounded-md text-xl hover:bg-lamahover transition"
              onClick={handleConfirm}
            >
              <i className="fa-solid fa-check mr-2"></i>
              ยืนยันการขาย
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
