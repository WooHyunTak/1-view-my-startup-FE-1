export default function ColGroup({ columns }) {
  // 컬럼 너비 커스텀을 위해 colgroup 추가. rank, name, description, amount(투자금액), comment 투자자 코멘트는 고정 너비.
  return (
    <colgroup>
      {columns.map((column, index) => {
        if (
          column.field === "rank" ||
          column.field === "name" ||
          column.field === "description" ||
          column.field === "amount" ||
          column.filed === "comment"
        ) {
          return (
            <col key={column.field} className={`col-${column.className}`} />
          );
        } else {
          return <col key={`rest-${index}`} className="col-rest" />;
        }
      })}
    </colgroup>
  );
}
