"use client";

import { useState } from "react";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Pagination from "@/app/components/Pagination";
import InteractiveRow from "@/app/components/InteractiveRow";

type Bill = {
  id: number;
  date: string;
  optional: string;
  amount: number;
};

const BillRecord = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const data: Bill[] = [
    { id: 1, date: "2023-01-01 10:00", optional: "Note 1", amount: 100 },
    { id: 2, date: "2023-01-02 14:30", optional: "Note 2", amount: 200 },
    { id: 3, date: "2023-01-03 16:15", optional: "Note 3", amount: 300 },
  ];

  const filteredData = data.filter((bill) =>
    bill.id.toString().includes(searchQuery)
  );

  const columns = [
    { header: "Order ID", accessor: "id" },
    {
      header: "Date/Time",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Optional",
      accessor: "optional",
      className: "hidden md:table-cell",
    },
    { header: "Income", accessor: "amount", className: "hidden md:table-cell" },
    { header: "Action", accessor: "action", className: "text-center" },
  ];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 shadow-md mt-1">
      {/* TOP SECTION */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mr-2">
          <TableSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* LIST SECTION */}
      <Table
        columns={columns}
        data={filteredData}
        renderRow={(item) => <InteractiveRow key={item.id} item={item} />}
      />

      {/* PAGINATION SECTION */}
      <div className="mt-4">
        <Pagination />
      </div>
    </div>
  );
};

export default BillRecord;
