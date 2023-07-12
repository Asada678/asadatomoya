import { type FC } from "react";

interface TableProps {
  header: string[];
  data: { title: string; value: string[]; left?: boolean }[];
}

const Table: FC<TableProps> = ({ header, data }: TableProps) => {
  return (
    <div className="font-16-20 overflow-x-scroll">
      <table className="md:block">
        <tbody>
          <tr>
            {header.map((th, i) => (
              <th
                key={i}
                className={`h-full w-1/5 min-w-[130px] bg-gray-200 p-2 text-center ${
                  i === 0 ? " sticky left-0 " : ""
                }`}
              >
                {th}
              </th>
            ))}
          </tr>
          {data.map((d) => (
            <tr key={d.title}>
              <th className="sticky left-0 h-full w-1/5 min-w-[130px] bg-gray-100 px-2 py-4 text-center">
                {d.title}
              </th>
              {d.value.map((v, j) => (
                <td
                  key={j}
                  className={`w-1/5 min-w-[130px] text-center ${j === 0 ? "font-bold text-yellow-500" : ""}`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
