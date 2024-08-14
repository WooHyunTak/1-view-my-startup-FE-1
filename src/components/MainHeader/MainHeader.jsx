import { Link, NavLink } from "react-router-dom";

import logoImg from "../../assets/logo_desktop.svg";

import "./MainHeader.css";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#fff" : "var(--grey-200)",
  };
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/my-comparison"} style={getLinkStyle}>
            나의 기업 비교
          </NavLink>
        </li>
        <li>
          <NavLink to={"/comparison-status"} style={getLinkStyle}>
            비교 현황
          </NavLink>
        </li>
        <li>
          <NavLink to={"/investment-status"} style={getLinkStyle}>
            투자 현황
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export function MainHeader() {
  return (
    <header className="MainHeader">
      <div className="header-container">
        <Link to="/">
          <img className="logo" src={logoImg} alt="view my startup logo" />
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default MainHeader;
