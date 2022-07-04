import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { queueActions } from "~/stores/queueSlice";
import Icon from "~/components/Icon";

const ShuffleBtn = () => {
  const dispatch = useDispatch();
  const { shuffle } = useSelector((state) => state.queue);
  const handleToggleShuffle = () => {
    dispatch(queueActions.toggleShuffle());
  };
  return (
    <Icon
      size={32}
      iconSize={16}
      hover="bright"
      placement="top"
      hideOnClick={false}
      className={clsx(
        "player-btn",
        "random",
        shuffle && "active",
        "hide-on-mobile"
      )}
      content={shuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
      space={14}
      onClick={handleToggleShuffle}
    >
      <i className="ic-shuffle"></i>
    </Icon>
  );
};

export default ShuffleBtn;
