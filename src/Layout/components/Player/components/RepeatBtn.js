import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { queueActions } from "~/stores/queueSlice";
import Icon from "~/components/Icon";

const RepeatBtn = () => {
  const dispatch = useDispatch();
  const { repeatStatus } = useSelector((state) => state.queue);

  const [repeatTippyText, setRepeatTippyText] = useState("Bật phát lại tất cả");

  useEffect(() => {
    switch (repeatStatus) {
      case 0:
        setRepeatTippyText("Bật phát lại tất cả");
        break;
      case 1:
        setRepeatTippyText("Bật phát lại một bài");
        break;
      case 2:
        setRepeatTippyText("Tắt phát lại");
        break;
      default:
        setRepeatTippyText("Bật phát lại tất cả");
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
