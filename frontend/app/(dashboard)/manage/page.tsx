import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Link from "next/link";

type Bill = {
  id: number;
  date: string;
  optional: string;
  amount: number;
};

const columns = [
  { header: "Order ID", accessor: "id" },
  { header: "Date/Time", accessor: "date", className: "hidden md:table-cell" },
  {
    header: "Optional",
    accessor: "optional",
    className: "hidden md:table-cell",
  },
  { header: "Amount", accessor: "amount", className: "hidden md:table-cell" },
  { header: "Action", accessor: "action", className: "text-center" },
];

const BillRecord = () => {
  const data: Bill[] = [
    { id: 1, date: "2023-01-01 10:00", optional: "Note 1", amount: 100 },
    { id: 2, date: "2023-01-02 14:30", optional: "Note 2", amount: 200 },
    { id: 3, date: "2023-01-03 16:15", optional: "Note 3", amount: 300 },
  ];

  const renderRow = (item: Bill) => (
    <tr key={item.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-semibold">{item.id}</td>
      <td className="px-6 py-4 hidden md:table-cell">{item.date}</td>
      <td className="px-6 py-4 hidden md:table-cell">{item.optional}</td>
      <td className="px-6 py-4 hidden md:table-cell">{item.amount}</td>
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center gap-2">
          <Link href={`/list/bills/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-bold">Bill Records</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaError">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaError">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaError">
              <Image src="/plus.png" alt="Add" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table columns={columns} data={data} renderRow={renderRow} />

      {/* PAGINATION SECTION */}
      <div className="mt-4">
        <Pagination />
      </div>
    </div>
  );
};

export default BillRecord;
