import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "~/assets/icons";
import { playerActions } from "~/stores/playerSlice";
const PlayBtn = () => {
  const dispatch = useDispatch();
  const { source, isPlaying, isFetching } = useSelector(
    (state) => state.player
  );
  const handleClick = () => {
    if (source) {
      if (isPlaying) {
        dispatch(playerActions.pauseMusic());
      } else {
        dispatch(playerActions.playMusic());
      }
    }
  };
  return (
    <button className="player-btn play" onClick={handleClick}>
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
};
export default PlayBtn;
