// "use client";

// import { useEffect, useState } from "react";
// import { config } from "../../config";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import Table from "@/app/components/Table";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Page = () => {
//   const [code, setCode] = useState("");
//   const [price, setPrice] = useState(0);
//   const [qty, setQty] = useState(0);
//   const [sells, setSells] = useState([]); // ข้อมูลทั้งหมด
//   const [id, setId] = useState(0); // ข้อมูล id เอาไว้แก้ไข หรือลบรายการ
//   const [discount, setDiscount] = useState(0); // ส่วนลด %
//   const [finalAmount, setFinalAmount] = useState(0); // ราคาหลังหักส่วนลด
//   const [totalAmount, setTotalAmount] = useState(0);
//   const router = useRouter();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${config.apiUrl}/sell/list`);
//       setSells(response.data);

//       let total = 0;
//       for (let i = 0; i < response.data.length; i++) {
//         total += response.data[i].price;
//       }
//       setTotalAmount(total);
//       calculateDiscount(total, discount);
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "เกิดข้อผิดพลาด",
//         text: error.message,
//       });
//     }
//   };

//   const calculateDiscount = (total: number, discount: number): void => {
//     const discountedPrice = total - (total * discount) / 100;
//     setFinalAmount(discountedPrice);
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         code: code,
//         price: price,
//         qty: qty,
//       };
//       await axios.post(`${config.apiUrl}/sell/create`, payload);
//       fetchData();
//     } catch (error: any) {
//       if (error.response.status === 400) {
//         Swal.fire({
//           icon: "error",
//           title: "ไม่พบรายการสินค้า",
//           text: "ไม่พบรายการสินค้า หรือไม่มีในสต้อก",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "เกิดข้อผิดพลาด",
//           text: error.message,
//         });
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const button = await Swal.fire({
//         text: "ลบรายการนี้หรือไม่?",
//         title: "คุณต้องการลบรายการนี้หรือไม่?",
//         icon: "question",
//         showCancelButton: true,
//         showConfirmButton: true,
//       });

//       if (button.isConfirmed) {
//         await axios.delete(`${config.apiUrl}/sell/remove/${id}`);
//         fetchData();
//       }
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "เกิดข้อผิดพลาด",
//         text: error.message,
//       });
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       const button = await Swal.fire({
//         text: "ยืนยันการขายหรือไม่?",
//         title: "ยืนยันการขาย",
//         icon: "question",
//         showCancelButton: true,
//         showConfirmButton: true,
//       });

//       if (button.isConfirmed) {
//         await axios.get(`${config.apiUrl}/sell/confirm`);
//         fetchData();
//       }
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "เกิดข้อผิดพลาด",
//         text: error.message,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     calculateDiscount(totalAmount, discount);
//   }, [discount, totalAmount]);

//   const columns = [
//     { header: "Code", accessor: "product.code", className: "text-center" },
//     {
//       header: "รายการ",
//       accessor: "product.name",
//       className: "text-center hidden sm:table-cell ",
//     },
//     {
//       header: "จำนวน",
//       accessor: "qty",
//       className: "text-center hidden sm:table-cell",
//     },
//     { header: "ราคา/หน่วย", accessor: "price", className: "text-center" },
//     { header: "ลบข้อมูล", accessor: "actions", className: "text-center" },
//   ];
//   //ไม่แน่ใจว่า tr key ต้อง index ไหม
//   const renderRow = (item: any, index: number) => (
//     <tr key={item.id} className="text-center hover:bg-gray-50">
//       <td className="px-6 py-4">{item.product.code}</td>
//       <td className="px-6 py-4 hidden sm:table-cell">{item.product.name}</td>
//       <td className="px-6 py-4 hidden sm:table-cell">{item.qty}</td>
//       <td className="px-6 py-4 ">{item.price.toLocaleString()}</td>
//       <td className="px-6 py-4 ">
//         <button
//           className="w-8 h-8 text-white bg-red-500 hover:bg-red-300  rounded-full "
//           onClick={() => handleDelete(item.id)}
//         >
//           <i className="fa-solid fa-trash-alt"></i>
//         </button>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
//       <div className="flex justify-end">
//         <button
//           className=" bg-lamaError text-white px-2 py-2 rounded-md mb-1  hover:bg-pink-400 transition"
//           onClick={() => router.push("/manage")}
//         >
//           <i className="fa-solid fa-file-alt mr-3 "></i>
//           ประวัติการขาย
//         </button>
//       </div>
//       <div className="flex gap-2 items-end">
//         <div className="w-full">
//           <div>รหัส</div>
//           <input
//             className="p-2 rounded-md border border-gray-600 w-full text-sm"
//             type="text"
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Code"
//           />
//         </div>
//         <div className="w-full">
//           <div>จำนวน</div>
//           <input
//             className="p-2 rounded-md border border-gray-600 w-full text-sm"
//             type="number"
//             onChange={(e) => setQty(Number(e.target.value))}
//             placeholder="จำนวน"
//           />
//         </div>
//         <div className="w-full">
//           <div>ราคา</div>
//           <input
//             className="p-2 rounded-md border border-gray-600 w-full text-sm "
//             type="number"
//             onChange={(e) => setPrice(Number(e.target.value))}
//             placeholder="ราคา"
//           />
//         </div>

//         <button
//           className="bg-lamaError text-white px-4 py-2.5 rounded-md text-sm hover:bg-pink-400 transition flex items-center gap-2"
//           onClick={handleSave}
//         >
//           <i className="fa-solid fa-save"></i>
//           <span>บันทึก</span>
//         </button>
//       </div>
//       <Table columns={columns} data={sells} renderRow={renderRow} />
//       {sells.length > 0 && (
//         <>
//           <div className=" ml-2 mr-2 mt-4 flex justify-between items-center">
//             <div>ยอดเงินทั้งหมด</div>
//             <div className="font-bold bg-gray-100 px-4 py-2 rounded-md">
//               {totalAmount.toLocaleString()}
//             </div>
//           </div>
//           {/*ส่วนลดเดี่ยวมาแก้*/}
//           <div className="ml-2 mr-2 mt-2 flex justify-between items-center">
//             <div>ส่วนลด (%)</div>
//             <input
//               className="p-2 rounded-md border border-gray-600 w-20 text-center"
//               type="number"
//               value={discount}
//               onChange={(e) => setDiscount(Number(e.target.value))}
//               placeholder="%"
//             />
//           </div>

//           <div className="ml-2 mr-2 mt-2 flex justify-between items-center">
//             <div>จำนวนเงิน</div>
//             <div className="font-bold bg-gray-100 px-4 py-2 rounded-md">
//               {finalAmount.toLocaleString()}
//             </div>
//           </div>

//           <div className="mt-5 text-center">
//             <button
//               className="bg-lamaError text-white px-6 py-2 rounded-md  hover:bg-pink-400 transition"
//               onClick={handleConfirm}
//             >
//               <i className="fa-solid fa-check mr-2"></i>
//               ยืนยันการขาย
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;
 
"use client";

import { useEffect, useState } from "react";
import Table from "@/app/components/Table";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Page = () => {
  const [code, setCode] = useState("");
  const [qty, setQty] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [sells, setSells] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [currentBillId, setCurrentBillId] = useState(crypto.randomUUID());

  const fetchProductPrice = async (productCode) => {
    try {
      if (!productCode) return;
      const response = await axios.get(
        `${config.apiUrl}/product/search?query=${productCode}`
      );
      if (response.data && response.data.length > 0) {
        const product = response.data.find((p) => p.code === productCode);
        if (product) {
          setProductPrice(product.price);
          return product.price;
        }
      }
      setProductPrice(0);
      return 0;
    } catch (error) {
      console.error("Error fetching product price:", error);
      setProductPrice(0);
      return 0;
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/sell/list`);
      const currentBillItems =
        res.data.find((group) => group[0]?.billId === currentBillId) || [];
      setSells(currentBillItems);

      let total = 0;
      currentBillItems.forEach((sale) => {
        total += sale.price;
      });
      setTotalAmount(total);
      calculateDiscount(total, discount);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  const calculateDiscount = (total, discount) => {
    const discountedPrice = total - (total * discount) / 100;
    setFinalAmount(discountedPrice);
  };

  const handleSave = async () => {
    try {
      if (!code || qty <= 0) {
        Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกรหัสสินค้าและจำนวนให้ถูกต้อง",
        });
        return;
      }

      const currentPrice = await fetchProductPrice(code);
      if (!currentPrice) {
        Swal.fire({
          icon: "error",
          title: "ไม่พบสินค้า",
          text: "กรุณาตรวจสอบรหัสสินค้า",
        });
        return;
      }

      const payload = {
        code: code,
        qty: qty,
        price: currentPrice,
        billId: currentBillId,
      };

      await axios.post(`${config.apiUrl}/sell/create`, payload);
      setCode("");
      setQty(0);
      setProductPrice(0);
      fetchData();
    } catch (error) {
      if (error.response?.status === 400) {
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

  const handleDelete = async (id) => {
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
    } catch (error) {
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
        // ส่งราคาหลังหักส่วนลดไปยัง backend
        await axios.post(`${config.apiUrl}/sell/confirm`, {
          billId: currentBillId,
          totalAmount: finalAmount, // ส่งราคาหลังหักส่วนลด
        });

        setCurrentBillId(crypto.randomUUID());
        setSells([]);
        setTotalAmount(0);
        setDiscount(0);
        setFinalAmount(0);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (code) {
      fetchProductPrice(code);
    }
  }, [code]);

  useEffect(() => {
    fetchData();
  }, [currentBillId]);

  useEffect(() => {
    calculateDiscount(totalAmount, discount);
  }, [discount, totalAmount]);

  const columns = [
    { header: "Code", accessor: "product.code", className: "text-center" },
    {
      header: "รายการ",
      accessor: "product.name",
      className: "text-center hidden sm:table-cell",
    },
    {
      header: "จำนวน",
      accessor: "qty",
      className: "text-center hidden sm:table-cell",
    },
    { header: "ราคา/หน่วย", accessor: "price", className: "text-center" },
    { header: "ลบข้อมูล", accessor: "actions", className: "text-center" },
  ];

  const renderRow = (item, index) => (
    <tr key={item.id} className="text-center hover:bg-gray-50">
      <td className="px-6 py-4">{item.product.code}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{item.product.name}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{item.qty}</td>
      <td className="px-6 py-4">{(item.price / item.qty).toLocaleString()}</td>
      <td className="px-6 py-4">
        <button
          className="w-8 h-8 text-white bg-red-500 hover:bg-red-300 rounded-full"
          onClick={() => handleDelete(item.id)}
        >
          <i className="fa-solid fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* Input Section for Creating Sale */}
      <div className="flex gap-2 items-end mb-4">
        <div className="w-full">
          <div>รหัสสินค้า</div>
          <input
            className="p-2 rounded-md border border-gray-600 w-full text-sm"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
          />
        </div>
        <div className="w-full">
          <div>จำนวน</div>
          <input
            className="p-2 rounded-md border border-gray-600 w-full text-sm"
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            placeholder="จำนวน"
          />
        </div>
        <div className="w-full">
          <div>ราคา/หน่วย</div>
          <input
            className="p-2 rounded-md border border-gray-600 w-full text-sm bg-gray-100"
            type="number"
            value={productPrice}
            readOnly
            placeholder="ราคา/หน่วย"
          />
        </div>
        <button
          className="bg-lamaError text-white px-4 py-2.5 rounded-md text-sm hover:bg-pink-400 transition"
          onClick={handleSave}
        >
          <i className="fa-solid fa-save"></i>
        </button>
      </div>

      {/* Table for displaying sales */}
      <Table columns={columns} data={sells} renderRow={renderRow} />

      {/* Total and Discount Section */}
      <div className="mt-4 ml-2 mr-2 flex justify-between items-center">
        <div>ยอดเงินทั้งหมด</div>
        <div className="font-bold bg-gray-100 px-4 py-2 rounded-md">
          {totalAmount.toLocaleString()}
        </div>
      </div>

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

      {/* Confirm Sale */}
      {sells.length > 0 && (
        <div className="mt-5 text-center">
          <button
            className="bg-lamaError text-white px-6 py-2 rounded-md hover:bg-pink-400 transition"
            onClick={handleConfirm}
          >
            <i className="fa-solid fa-check mr-2"></i>
            ยืนยันการขาย
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
