import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "~/stores/uiSlice";
import Icon from "~/components/Icon";
const QueueBtn = () => {
  const dispatch = useDispatch();
  const { showQueue } = useSelector((state) => state.ui);
  const handleToggleQueueBtn = () => {
    dispatch(uiActions.toggleQueue());
  };
  return (
    <Icon
      className={clsx("player-btn", "playlist", showQueue && "active")}
      size={30}
      iconSize={16}
      space={4}
      hover="bright"
      placement="top"
      content={"Danh sách phát"}
      onClick={handleToggleQueueBtn}
    >
      <i className="ic-list-music"></i>
    </Icon>
  );
};

export default QueueBtn;
