import { TableRow } from "../TableRow/TableRow";
import "./Table.css";

export function Table({ list }) {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="rank">순위</th>
          <th className="field-company-name">기업 명</th>
          <th className="field-company-description">기업 소개</th>
          <th>카테고리</th>
          <th>누적 투자 금액</th>
          <th>매출액</th>
          <th>고용인원</th>
        </tr>
      </thead>

      <tbody>
        {list.map((item, index) => {
          return (
            <tr id={item.id} className="TableRow">
              <TableRow item={item} rank={index + 1} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
