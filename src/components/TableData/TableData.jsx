import { convertToUnit } from "../../utils/convertToUnit";
import defaultImg from "../../assets/default_company_img.svg";
import DetailPageDropdown from "../DropDown/DetailPageDropdown";
import "./TableData.css";

export function TableData({ item, header }) {
  const logoImg = item.brandImg ? item.brandImage : defaultImg;

  // 테이블 필드마다 필요한 디자인이 다르기 때문에 어느 필드냐에 따라 다르게 렌더.
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

      case "virtual-investment":
      case "actual-investment":
      case "revenue":
        return `${convertToUnit(value)} 원`;

      case "investment-amount":
        return convertToUnit(value);

      case "total-employees":
        return `${value}명`;

      case "selected-count":
      case "compared-count":
        return value.toLocaleString();

      case "investment-comment":
        return (
          <div className={className}>
            <span>{value}</span>
            <DetailPageDropdown id={item.id} password={item.password} amount={item.amount} comment={item.comment} />
          </div>
        );

      //카테고리가 빈배열이거나 undefined, null 이면 n/a
      case "category":
        return item.categories && item.categories.length > 0 ? item.categories[0] : "N/A";

      default:
        return typeof value === "number" ? value.toLocaleString() : value;
    }
  };

  // 테이블 헤더에 순위가 정의된 테이블이면 rank 필드도 렌더 아니면 스킵
  return <>{header.field === "rank" ? `${item.rank}위` : renderTableData(header.className, header.field)}</>;
}
