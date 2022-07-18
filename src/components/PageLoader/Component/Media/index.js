import React from "react";
import "~/components/PageLoader/PageLoader.scss";
const Media = () => {
  return (
    <div className="media-loader">
      <div className="media-left">
        <div className="media-img loader"></div>
        <div className="media-info">
          <div className="half-width mb-10 loader title">&zwnj;</div>
          <div className="loader quarter-width title">&zwnj;</div>
        </div>
      </div>
      <div className="media-center">
        <div className="media-album loader title half-width">&zwnj;</div>
      </div>
      <div className="media-right">
        <div className="media-actions">
          <span className="icon loader circle"></span>
          <span className="icon loader circle"></span>
          <span className="icon loader circle"></span>
        </div>
      </div>
    </div>
  );
};

export default Media;
