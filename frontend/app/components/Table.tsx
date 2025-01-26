const Table = ({
  columns,
  renderRow,
  data = [],
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any, index: number) => React.ReactNode;
  data?: any[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`px-6 py-4 text-left font-semibold ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              // Ensure the renderRow function handles key assignment
              return renderRow(item, index);
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
