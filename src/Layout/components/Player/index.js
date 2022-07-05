import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "~/components/Media/Media.scss";
import "./Player.scss";

import Icon from "~/components/Icon";
import { playerActions } from "~/stores/playerSlice";

import useToast from "~/components/Toast";
import { request } from "~/utils/request";
import PlayerMedia from "./components/PlayerMedia";
import QueueBtn from "./components/QueueBtn";
import Volume from "./components/Volume";
import AudioProgress from "./components/AudioProgress";
import RepeatBtn from "./components/RepeatBtn";
import ShuffleBtn from "./components/ShuffleBtn";
import PlayBtn from "./components/PlayBtn";
import NextBtn from "./components/NextBtn";
import PreviousBtn from "./components/PreviousBtn";
import Audio from "./components/Audio";

const Player = () => {
  const $ = document.querySelector.bind(document);
  const dispatch = useDispatch();
  const toast = useToast();
  const { source, error, autoplay } = useSelector((state) => state.player);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { currentSongId, repeatStatus, currentIndex, idList } = useSelector(
    (state) => state.queue
  );

  useEffect(() => {
    dispatch(playerActions.pauseMusic());
  }, []);

  useEffect(() => {
    const fetchAudio = async () => {
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: true,
          error: null,
        })
      );
      try {
        const res = await request.get("streaming/" + currentSongId);
        dispatch(playerActions.updateSource(res.data["128"]));
        dispatch(
          playerActions.setFetchingStatus({
            isFetching: false,
            error: null,
          })
        );
      } catch (error) {
        dispatch(playerActions.pauseMusic());
        dispatch(playerActions.setCurrentTime(0));
        dispatch(playerActions.updateSource(""));
        dispatch(
          playerActions.setFetchingStatus({
            isFetching: false,
            error: true,
          })
        );
        toast(error.response.data.msg);
        dispatch(playerActions.pauseMusic());
      }
    };
    fetchAudio();

    isLoggedIn &&
      !error &&
      request
        .put(
          `user/${user._id}/recentSongs`,
          { songId: currentSongId, action: "add" },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => console.log(error));
  }, [currentSongId]);

  useEffect(() => {
    if (autoplay && !!source) {
      dispatch(playerActions.playMusic());
    }
  }, [source]);

  useEffect(() => {
    const audio = $(".player-audio");
    const nextBtn = $(".player-btn.next");
    const process = $(".player-process-bar");
    process.oninput = (e) => {
      if (audio.duration && source) {
        const seekTime = (e.target.value * audio.duration) / 100;
        audio.currentTime = seekTime;
      }
    };

    audio.onended = function () {
      dispatch(playerActions.setCurrentTime(0));
      if (
        repeatStatus === 1 ||
        (repeatStatus === 0 && currentIndex !== idList.length - 1)
      ) {
        dispatch(playerActions.pauseMusic());
        nextBtn.click();
      } else if (repeatStatus === 0 && currentIndex === idList.length - 1) {
        dispatch(playerActions.pauseMusic());
      }
    };
  }, []);

  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="player-left">
          <PlayerMedia />
        </div>

        <div className="player-center">
          <div className="player-control">
            <ShuffleBtn />
            <PreviousBtn />
            <PlayBtn />
            <NextBtn />
            <RepeatBtn />
          </div>
          <AudioProgress />
        </div>
        <div className="player-right">
          <Icon
            className="player-btn hide-on-mobile"
            size={36}
            iconSize={20}
            space={4}
            hover="bright"
            placement="top"
            disabled={true}
            content={"Xem MV"}
          >
            <i className="ic-mv"></i>
          </Icon>
          <Icon
            className="player-btn hide-on-mobile"
            size={32}
            iconSize={16}
            space={4}
            hover="bright"
            placement="top"
            content={"Xem lời bài hát"}
            disabled
          >
            <i className="ic-karaoke"></i>
          </Icon>
          <Icon
            className="player-btn hide-on-mobile"
            size={32}
            iconSize={16}
            space={4}
            hover="bright"
            placement="top"
            content={"Chế độ cửa sổ"}
          >
            <i className="ic-restore"></i>
          </Icon>
          <Volume />
          <QueueBtn />
        </div>
        <Audio />
      </div>
    </div>
  );
};

export default Player;
