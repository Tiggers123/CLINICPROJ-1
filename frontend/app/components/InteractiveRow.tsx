
"use client";

import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.css";

type Bill = {
  id: number;
  date: string;
  optional: string;
  amount: number;
};

const handleDelete = async (id: number) => {
  try {
    const button = await Swal.fire({
      icon: "question",
      title: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (button.isConfirmed) {
      
      // await axios.delete(`${config.apiUrl}/service/remove/${id}`);
      Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
      });
    }
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "ผิดพลาด",
      text: err.message,
    });
  }
};

const InteractiveRow = ({ item }: { item: Bill }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 text-center text-sm font-semibold">{item.id}</td>
    <td className="px-6 py-4 text-center hidden md:table-cell">{item.date}</td>
    <td className="px-6 py-4 text-center hidden md:table-cell">
      {item.optional}
    </td>
    <td className="px-6 py-4 text-center hidden md:table-cell">{item.amount}</td>
    <td className="px-6 py-4 text-center">
      <div className="flex justify-center gap-2">
        {/* Edit Button */}
        {/* <button
          className="w-6 h-6 flex items-center justify-center rounded-md bg-lamaError hover:bg-pink-500 text-white"
          title="Edit"
        >
          <i className="fa-solid fa-pen"></i>
        </button> */}
        {/* Delete Button */}
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 text-white"
          title="Delete"
          onClick={() => handleDelete(item.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </td>
  </tr>
);


export default InteractiveRow;
