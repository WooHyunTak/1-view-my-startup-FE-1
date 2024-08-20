import { TableData } from "../TableData/TableData";
import { ColGroup } from "./ColGroup";
import "./Table.css";

export function Table({ list, tableHeaders, tableName }) {
  //list가 없거나 array 아니면 data unavailable
  if (!list || !Array.isArray(list)) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-container">
      <table className={`Table ${tableName}`}>
        <ColGroup columns={tableHeaders} />
        <thead>
          <tr>
            {tableHeaders.map((header) => {
              const fieldName = `field-${header.className}`;
              return (
                <th key={`theader-${header.field}`} className={fieldName}>
                  {header.colName}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id} className="table-row">
                {tableHeaders.map((header) => {
                  const fieldName = `field-${header.className}`;
                  return (
                    <td key={`td-${header.field}`} className={fieldName}>
                      <TableData item={item} header={header} />
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
