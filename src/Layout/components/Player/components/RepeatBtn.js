import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { queueActions } from "~/stores/queueSlice";
import Icon from "~/components/Icon";
import { playerActions } from "~/stores/playerSlice";

const RepeatBtn = () => {
  const dispatch = useDispatch();
  const { repeatStatus } = useSelector((state) => state.queue);

  const [repeatTippyText, setRepeatTippyText] = useState("Bật phát lại tất cả");

  useEffect(() => {
    switch (repeatStatus) {
      case 0:
        setRepeatTippyText("Bật phát lại tất cả");
        dispatch(playerActions.setLoop(false));
        break;
      case 1:
        setRepeatTippyText("Bật phát lại một bài");
        dispatch(playerActions.setLoop(false));
        break;
      case 2:
        setRepeatTippyText("Tắt phát lại");
        dispatch(playerActions.setLoop(true));
        break;
      default:
        setRepeatTippyText("Bật phát lại tất cả");
        dispatch(playerActions.setLoop(false));
    }
  }, [repeatStatus]);

  const changeRepeatMode = () => {
    dispatch(queueActions.updateRepeatStatus());
  };
  return (
    <Icon
      size={32}
      iconSize={16}
      hover="bright"
      placement="top"
      hideOnClick={false}
      content={repeatTippyText}
      space={14}
      className={clsx(
        "player-btn",
        repeatStatus > 0 && "active",
        "hide-on-mobile"
      )}
      onClick={changeRepeatMode}
    >
      {repeatStatus < 2 && <i className="ic-repeat"></i>}
      {repeatStatus === 2 && <i className="ic-repeat-one"></i>}
    </Icon>
  );
};

export default RepeatBtn;
