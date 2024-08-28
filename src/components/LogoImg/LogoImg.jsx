import "./LogoImg.css";

const bgColors = {
  PURPLE: "#4E31AA",
  BLUE: "#295F98",
  RED: "#A02334",
  GREEN: "#116D6E",
  YELLOW: "#F7B633",
  ORANGE: "#DB590D",
  WHITE: "#F7F9F2",
};

const textColors = {
  PURPLE: "#F0F0F0",
  BLUE: "#F0F0F0",
  RED: "#F0F0F0",
  GREEN: "#FFF6B8",
  YELLOW: "#03346E",
  ORANGE: "#F0F0F0",
  WHITE: "#04046E",
};

function DefaultImg({ brandName, brandColor }) {
  const initial = brandName.charAt(0).toUpperCase();
  const color = {
    backgroundColor: bgColors[brandColor],
    color: textColors[brandColor],
  };

  return (
    <div className="DefaultImg" style={color}>
      <i>{initial}</i>
    </div>
  );
}

export default function LogoImg({ size, brandImg, brandName, brandColor }) {
  return (
    <div className={`LogoImg ${size}`}>
      {brandImg ? (
        <img src={brandImg} alt={`${brandImg} logo`} />
      ) : (
        <DefaultImg brandName={brandName} brandColor={brandColor} size={size} />
      )}
    </div>
  );
}
