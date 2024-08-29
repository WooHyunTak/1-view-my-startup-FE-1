import LogoImg from "../LogoImg/LogoImg";

import "./CompanyHeader.css";

function CompanyHeader({ name, categoryNames, brandColor, brandImage }) {
  const categories = categoryNames.map((category) => category.name).join(", ");
  return (
    <div className="CompanyHeader">
      <LogoImg
        size="large"
        brandImg={brandImage}
        brandName={name}
        brandColor={brandColor}
      />

      <div className="name-category">
        <span className="name">{name}</span>
        <span className="category">{categories}</span>
      </div>
    </div>
  );
}

export default CompanyHeader;
