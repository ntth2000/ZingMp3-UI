import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "~/assets/icons";
const PlayBtn = ({ isFetching, isPlaying }) => {
  return (
    <button className="player-btn play">
      {!isFetching && isPlaying && (
        <i className="ic-pause-circle-outline player-icon"></i>
      )}
      {!isFetching && !isPlaying && (
        <i className="ic-play-circle-outline player-icon"></i>
      )}
      {isFetching && (
        <span className="player-spinner is-circle">
          <Spinner />
        </span>
      )}
    </button>
  );
};
PlayBtn.propTypes = {
  isFetching: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
};
export default PlayBtn;
