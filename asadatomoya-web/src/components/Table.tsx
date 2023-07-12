import { type FC, HTMLAttributes } from "react";

import { text } from "stream/consumers";

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  header: string[];
  data: { title: string; value: string[]; left?: boolean }[];
  scrollX?: boolean;
}

const Table: FC<TableProps> = ({ header, data, className, style, scrollX = true }: TableProps) => {
  return (
    <div className={`${className} ${scrollX ? "overflow-x-auto" : ""}`} style={style}>
      <div>
        <div className="flex font-bold">
          {header.map((th, i) => (
            <div
              key={i}
              className={`h-auto min-w-[130px] bg-gray-200 p-2 text-center md:basis-1/3 ${
                i === 0 ? " sticky left-0 " : ""
              }`}
            >
              {th}
            </div>
          ))}
        </div>
        {data.map((d) => (
          <div key={d.title} className="flex">
            <div className="sticky left-0 h-full min-w-[130px] bg-gray-100 px-2 py-4 text-center md:basis-1/3">
              {d.title}
            </div>
            {d.value.map((v, j) => (
              <div
                key={j}
                className={`flex min-w-[130px] items-center justify-center text-center md:basis-1/3 ${
                  j === 0 ? "font-bold text-yellow-500" : ""
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
