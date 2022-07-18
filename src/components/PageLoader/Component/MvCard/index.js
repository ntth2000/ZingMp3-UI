import React from "react";
import "~/components/PageLoader/PageLoader.scss";
const MvCard = () => {
  return (
    <div className="mv-card-loader">
      <div className="mv-card-thumb loader"></div>
      <div className="mv-card-info">
        <div className="mv-card-artist-thumb circle loader"></div>
        <div className="mv-card-text">
          <div className="mv-card-title loader title mb-10 half-width">
            &zwnj;
          </div>
          <div className="mv-card-artists loader title quarter-width">
            &zwnj;
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvCard;
