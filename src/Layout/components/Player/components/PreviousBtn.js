import React from "react";
import { useDispatch } from "react-redux";
import Icon from "~/components/Icon";
import { playerActions } from "~/stores/playerSlice";
import { queueActions } from "~/stores/queueSlice";
const PreviousBtn = () => {
  const dispatch = useDispatch();
  const handlePrevSong = () => {
    dispatch(playerActions.pauseMusic());
    dispatch(queueActions.prev());
    dispatch(playerActions.setAutoplay(true));
    alert("hello");
  };
  return (
    <Icon
      size={32}
      iconSize={16}
      hover="bright"
      space={14}
      visible={false}
      className="player-btn prev hide-on-mobile"
      onClick={handlePrevSong}
    >
      <i className="ic-pre"></i>
    </Icon>
  );
};

export default PreviousBtn;
