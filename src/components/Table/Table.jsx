import { TableData } from "../TableData/TableData";
import "./Table.css";

export function Table({ list, tableHeaders }) {
  return (
    <table className="Table">
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
                return (
                  <TableData item={item} rank={index + 1} header={header} />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
