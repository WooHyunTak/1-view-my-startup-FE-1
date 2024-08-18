// import { useState } from "react";
// import prevBtnIcon from "../../assets/icon/ic_arrow_left.svg";
// import nextBtnIcon from "../../assets/icon/ic_arrow_right.svg";

// import "./Pagination.css";

// export function Pagination({ cursor, setCursor, nextCursor }) {

//   return (
//     <ol className="Pagination">
//       <li>
//         <button>
//           <img src={prevBtnIcon} alt="left button" />
//         </button>
//       </li>
//       {pageNumbers.map((pageNum) => {
//         return (
//           <li key={pageNum}>
//             <button onClick={(pageNum) => handlePageClick}>{pageNum}</button>
//           </li>
//         );
//       })}
//       <li>
//         <button>
//           {" "}
//           <img src={nextBtnIcon} alt="right button" />{" "}
//         </button>
//       </li>
//     </ol>
//   );
// }
