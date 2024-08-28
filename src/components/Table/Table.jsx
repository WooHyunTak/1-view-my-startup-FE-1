import { useNavigate } from "react-router-dom";
import TableData from "../TableData/TableData";
import ColGroup from "./ColGroup";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./Table.css";

export default function Table({
  list,
  tableHeaders,
  tableName,
  isCompanyTable = true,
}) {
  const navigate = useNavigate();

  //list가 null, undefined, !array 이면 error msg
  if (!Array.isArray(list)) {
    return <ErrorMsg errorMsg="No available Data, No list nor Array" />;
  }

  const handleRowClick = (id) => {
    if (isCompanyTable) {
      navigate(`/companies/${id}`);
    }
  };

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
          {list.length > 0 &&
            list.map((item) => {
              // 상세페이지 링크해야하는지 boolean으로 받음
              //isCompanyTable = true면 onClick 이벤트 더해짐
              const isLinkToDetailPage = isCompanyTable;
              return (
                <tr
                  key={item.id}
                  className={`table-row ${
                    isLinkToDetailPage ? "link-to-detail-page" : ""
                  }`}
                  onClick={
                    isLinkToDetailPage ? () => handleRowClick(item.id) : null
                  }
                >
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

      {list.length === 0 && (
        <div className="empty-list">
          <p>해당 기업이 없어요.</p>
        </div>
      )}
    </div>
  );
}
