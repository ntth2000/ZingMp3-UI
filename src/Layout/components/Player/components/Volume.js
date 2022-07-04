import React from "react";
import { useSelector } from "react-redux";
import Icon from "~/components/Icon";
const Volume = () => {
  const { volume } = useSelector((state) => state.player);
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
