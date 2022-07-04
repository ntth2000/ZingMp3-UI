import React from "react";
import TippyHeadless from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import Icon from "~/components/Icon";
import Media from "~/components/Media";
import { playerActions } from "~/stores/playerSlice";
import { queueActions } from "~/stores/queueSlice";
const NextBtn = () => {
  const dispatch = useDispatch();
  const { items, currentIndex, idList } = useSelector((state) => state.queue);
  const handleNextSong = () => {
    dispatch(playerActions.pauseMusic());
    dispatch(queueActions.next());
    dispatch(playerActions.setAutoplay(true));
  };
  return (
    <TippyHeadless
      placement="top"
      hideOnClick={false}
      arrow={true}
      render={(attrs) => (
        <div className="tippy-box player-next-song" tabIndex="-1" {...attrs}>
          <span className="player-next-song-title">Phát tiếp theo</span>
          <Media item={items[idList[currentIndex + 1]] || items[idList[0]]} />
          <div className="tippy-arrow" data-popper-arrow="tippy-6"></div>
        </div>
      )}
    >
      <Icon
        className="player-btn next hide-on-mobile"
        size={32}
        iconSize={16}
        space={7}
        hover="bright"
        onClick={handleNextSong}
      >
        <i className="ic-next"></i>
      </Icon>
    </TippyHeadless>
  );
};

export default NextBtn;
