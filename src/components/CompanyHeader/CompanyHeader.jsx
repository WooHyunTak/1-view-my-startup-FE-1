import default_logo from "../../assets/default_logo_companyDetail.svg";
import "./CompanyHeader.css";

function CompanyHeader({ name, categoryNames }) {
  const categories = categoryNames.map((category) => category.name).join(", ");

  return (
    <div className="CompanyHeader">
      <img src={default_logo} alt="logo" />
      <div className="name-category">
        <span className="name">{name}</span>
        <span className="category">{categories}</span>
      </div>
    </div>
  );
}

export default CompanyHeader;
