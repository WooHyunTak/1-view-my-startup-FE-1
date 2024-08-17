import defaultImg from "../../assets/default_company_img.svg";

import "./TableRow.css";

export function TableRow({ item, rank }) {
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
  return (
    <>
      <td>{rank}</td>
      <td className="name">
        <div className="company-name">
          <div className="circle-crop">
            <img src={logoImg} alt={logoImg} />{" "}
          </div>
          <span>{item.name}</span>
        </div>
      </td>
      <td className="description">
        <span>{item.description}</span>
      </td>
      <td>{item.categories[0].name}</td>
      <td>{convertToUnit(item.actualInvestment)}</td>
      <td>{convertToUnit(item.revenue)}</td>
      <td>{item.totalEmployees}명</td>
    </>
  );
}
