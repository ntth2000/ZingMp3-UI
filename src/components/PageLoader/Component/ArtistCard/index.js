import React from "react";

const ArtistCard = () => {
  return (
    <div className="artist-card">
      <div className="loader circle artist-card-thumb"></div>
      <div className="loader full-width artist-card-name mb-10 title">
        &zwnj;
      </div>
      <div className="loader half-width artist-card-follow title">&zwnj;</div>
      <div className="loader full-width button">&zwnj;</div>
    </div>
  );
};

export default ArtistCard;
