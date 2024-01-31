import React from 'react';

interface TableProps {
    data: {
        headings: string[];
        rows: 
            {
                value: string;
                colIndex: number;
                id?: number;
            }[]
        
    }
}

export const TableWithoutHeading: React.FC<TableProps> = ({ data }) => {
    return (
        <table className="min-w-full border border-gray-300">
            <tbody>
                {data.rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {data.headings.map(() =>(
                            <td key={row.colIndex} className="py-2 px-4 border-b">
                                {row.value}
                            {/* <input
                                type="text"
                                value={row.value}
                            // onChange={(e) =>
                            //     handleInputChange(rowIndex, row.colIndex, e.target.value)
                            // }
                            /> */}
                        </td>
                        ))}
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

