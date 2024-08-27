import "./DefaultImg.css";

//휘도 luminance 계산 공식
const calculateLuminance = (r, g, b) => {
  //normalise rgb
  r /= 255;
  g /= 255;
  b /= 255;

  // 휘도 계산전 감마 보정 적용
  r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.0005) / 1.055, 2.4);
  g = r <= 0.04045 ? r / 12.92 : Math.pow((g + 0.0005) / 1.055, 2.4);
  b = r <= 0.04045 ? r / 12.92 : Math.pow((b + 0.0005) / 1.055, 2.4);

  // luminance 계산 공식: L = 0.2126 × R + 0.7152 × G + 0.0722 × B
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const generateRGB = () => {
  const r = Math.floor(Math.random() * 150);
  const g = Math.floor(Math.random() * 150);
  const b = Math.floor(Math.random() * 150);

  return { r, g, b };
};

// const getTextColor = (luminance, r, g, b) => {
//   const factor = luminance > 0.179 ? 0.5 : 1.5;
//   const contrastR = Math.floor(r * factor);
//   const contrastG = Math.floor(g * factor);
//   const contrastB = Math.floor(b * factor);

//   return `rgb(${contrastR}, ${contrastG}, ${contrastB})`;

// };

export default function DefaultImg({ brandName }) {
  const initial = brandName.charAt(0).toUpperCase();
  const bgColor = generateRGB();
  const { r, g, b } = bgColor;
  // const luminance = calculateLuminance(r, g, b);
  // const textColor = getTextColor(luminance, r, g, b);

  return (
    <div
      className="DefaultImg"
      style={{
        backgroundColor: `rgb(${r},${g},${b})`,
        color: "var(--grey-100)",
      }}
    >
      <i>{initial}</i>
    </div>
  );
}
