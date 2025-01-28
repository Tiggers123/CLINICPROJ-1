// const Pagination = () => {
//   return (
//     <div className="p-4 flex items-center justify-between text-gray-500">
//       <button
//         disabled
//         className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Prev
//       </button>
//       <div className="flex items-center gap-2 text-sm">
//         <button className="px-2 rounded-sm bg-lamaPinky">1</button>
//         <button className="px-2 rounded-sm ">2</button>
//         <button className="px-2 rounded-sm ">3</button>
//         ...
//         <button className="px-2 rounded-sm ">10</button>
//       </div>
//       <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRows,
  onPageChange,
}) => {
  return (
    <div className="mt-5">
      {/* Display total rows and pages */}
      <div>รายการทั้งหมด {totalRows} รายการ</div>
      <div>
        หน้า {currentPage} จาก {totalPages}
      </div>
      {/* Pagination buttons */}
      <div className="flex gap-2 items-center justify-center">
        {/* First Page Button */}
        <button
          className="bg-red-200 p-2 rounded disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-caret-left mr-2"></i>
          หน้าแรก
        </button>

        {/* Previous Page Button */}
        <button
          className="bg-red-200 p-2 rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-caret-left"></i>
        </button>

        {/* Numbered Page Buttons */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`p-2 rounded ${
              i + 1 === currentPage ? "bg-red-300 font-bold" : "bg-gray-200"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          className="bg-red-200 p-2 rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>

        {/* Last Page Button */}
        <button
          className="bg-red-200 p-2 rounded disabled:opacity-50"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          หน้าสุดท้าย
          <i className="fa-solid fa-caret-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;