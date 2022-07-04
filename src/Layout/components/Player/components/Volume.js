import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "~/components/Icon";
import { playerActions } from "~/stores/playerSlice";
const Volume = () => {
  const dispatch = useDispatch();
  const { volume } = useSelector((state) => state.player);
  //mute && unmute && adjust volume level
  useEffect(() => {
    const volumeBtn = document.querySelector(".player-btn.volume");

    volumeBtn.onclick = () => {
      if (volume === 0) {
        dispatch(playerActions.setVolume(20));
      } else {
        dispatch(playerActions.setVolume(0));
      }
    };
  }, [volume]);

  const handleChangeVolume = (e) => {
    dispatch(playerActions.setVolume(+e.target.value));
  };
  return (
    <div className={`player-volume hide-on-mobile`}>
      <Icon
        className="player-btn volume"
        size={32}
        iconSize={16}
        space={4}
        hover="bright"
        placement="top"
        visible={false}
      >
        {volume === 0 ? (
          <i className="ic-volume-mute"></i>
        ) : (
          <i className="ic-volume"></i>
        )}
      </Icon>

      <div className="player-volume-wrapper">
        <input
          onInput={handleChangeVolume}
          type="range"
          className="player-volume-bar"
          min={0}
          max={100}
          step={0.1}
          value={volume}
          style={{
            backgroundSize: `${volume}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Volume;
