import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "~/stores/playerSlice";
const Audio = () => {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const { isPlaying, source, volume, currentTime, isLoop } = useSelector(
    (state) => state.player
  );
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: false,
          fetchingStatus: null,
        })
      );
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
  }, [volume]);
  useEffect(() => {
    audioRef.current.currentTime = currentTime;
  }, []);
  const handleTimeUpdate = (event) => {
    dispatch(playerActions.setCurrentTime(event.target.currentTime));
  };
  return (
    <audio
      onTimeUpdate={handleTimeUpdate}
      className="player-audio"
      preload="auto"
      src={source}
      ref={audioRef}
      loop={isLoop}
    />
  );
};

export default Audio;
