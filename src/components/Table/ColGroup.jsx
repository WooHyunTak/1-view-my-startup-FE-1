export function ColGroup({ columns }) {
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
