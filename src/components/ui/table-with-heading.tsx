import React from 'react';

interface TableProps {
  headings: string[];
  data: { [key: string]: string | number }[];
}

export const TableWithHeading: React.FC<TableProps> = ({ headings, data }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          {headings.map((heading) => (
            <th key={heading} className="py-2 px-4 bg-gray-200 border-b">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headings.map((heading) => (
              <td key={heading} className="py-2 px-4 border-b">
                {item[heading.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

