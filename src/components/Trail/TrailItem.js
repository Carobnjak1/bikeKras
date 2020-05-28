import React from "react";
import { Link } from "react-router-dom";

import easy from "../../styles/easy.png";
import hard from "../../styles/hard.png";
import medium from "../../styles/medium.png";

function LinkItem({
  trail: { id, title, difficulty, time, length, locationsDB },
}) {
  if (locationsDB === []) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading</div>
    );
  } else {
    return (
      <div className="profile bg-light">
        {
          {
            Easy: <img src={easy} alt="" className="round-img" />,
            Medium: <img src={medium} alt="" className="round-img" />,
            Hard: <img src={hard} alt="" className="round-img" />,
          }[difficulty]
        }
        <div className="desc">
          <h2>{title}</h2>
          <p>Dolžina: {length}km</p>
          <p>Čas, {time}h</p>
          <Link to={`/trails/${id}`} className="btn btn-primary">
            Podrobnosti
          </Link>
        </div>

        <ul>
          <h2 className="my-1">Potek poti</h2>
          {locationsDB.slice(0, 4).map((location, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-map-pin mr"></i> {location}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LinkItem;
