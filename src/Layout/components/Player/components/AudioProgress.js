import { useEffect } from "react";
import { useSelector } from "react-redux";
import formatTime from "~/utils/formatTime";
const AudioProgress = () => {
  const { currentTime } = useSelector((state) => state.player);
  const { items, currentSongId } = useSelector((state) => state.queue);
  const data = items[currentSongId];
  useEffect(() => {
    const audioInput = document.querySelector(".player-process-bar");
    audioInput.value = (currentTime / data.duration) * 100 || 0;
  }, [currentTime]);
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

export default AudioProgress;
