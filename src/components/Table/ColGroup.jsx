export function ColGroup({ columns }) {
  // 컬럼 너비 커스텀을 위해 colgroup 추가. rank, name, description은 고정 너비.
  return (
    <colgroup>
      {columns.map((column, index) => {
        if (
          column.field === "rank" ||
          column.field === "name" ||
          column.field === "description"
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
