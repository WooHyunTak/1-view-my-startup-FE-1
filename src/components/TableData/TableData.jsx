import defaultImg from "../../assets/default_company_img.svg";

import "./TableData.css";

export function TableData({ item, rank, header }) {
  const logoImg = item.brandImg ? item.brandImage : defaultImg;

  const convertToUnit = (value) => {
    const amount = Number(value);
    if (amount || !NaN) {
      if (amount >= 100000000) {
        return amount / 100000000 + "억";
      } else if (amount >= 10000000) {
        return amount / 10000000 + "천만원";
      }
    } else {
      return "N/A";
    }
  };

  const renderTableData = (className, field) => {
    const value = item[field];
    if (value === undefined || value === null) {
      return "N/A";
    }

    switch (className) {
      case "company-name":
        return (
          <div className="company-name-container">
            <div className="circle-crop">
              <img src={logoImg} alt={`${value} logo`} />
            </div>
            <span>{value}</span>
          </div>
        );

      case "company-description":
        return (
          <div className={className}>
            <span>{value}</span>
          </div>
        );

      case "actual-investment":
      case "revenue":
        return convertToUnit(value);

      case "total-employees":
        return `${value}명`;

      default:
        return field === "categories" && item.categories[0].name;
    }
  };

  return (
    <>
      {header.field === "rank"
        ? rank
        : renderTableData(header.className, header.field)}
    </>
  );
}
