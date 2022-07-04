import { useState } from "react";
import PropTypes from "prop-types";
const AudioProgress = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const formatTime = (time) => {
    return (
      `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(time % 60)
        .toString()
        .padStart(2, "0")}` || 0
    );
  };
  return (
    <div className="player-process hide-on-mobile">
      <span className="player-current-time">
        {data && formatTime(currentTime)}
      </span>
      <input
        type="range"
        className="player-process-bar"
        min={0}
        max={100}
        step={0.1}
        value={data ? (currentTime * 100) / data?.duration : 0}
        style={{
          backgroundSize: `${data ? (currentTime * 100) / data?.duration : 0}%`,
        }}
      />
      <span className="player-song-length">
        {data && formatTime(data?.duration)}
      </span>
    </div>
  );
};
AudioProgress.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AudioProgress;
