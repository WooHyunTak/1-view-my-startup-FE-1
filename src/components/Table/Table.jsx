import { TableData } from "../TableData/TableData";
import { ColGroup } from "./ColGroup";
import "./Table.css";

export function Table({ list, tableHeaders }) {
  return (
    <div className="table-container">
      <table className="Table">
        <ColGroup columns={tableHeaders} />
        <thead>
          <tr>
            {tableHeaders.map((header) => {
              const fieldName = `field-${header.className}`;
              return <th className={fieldName}>{header.colName}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={item.id} className="table-row">
                {tableHeaders.map((header) => {
                  const fieldName = `field-${header.className}`;
                  return (
                    <td className={fieldName}>
                      <TableData item={item} rank={index + 1} header={header} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
