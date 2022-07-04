import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "~/components/Media/Media.scss";
import "./Player.scss";

import Icon from "~/components/Icon";
import { playerActions } from "~/stores/playerSlice";

import { fetchSong, fetchStreaming } from "~/apiServices/playerServices";

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

const Player = () => {
  const $ = document.querySelector.bind(document);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isPlaying, volume, source, isFetching, error, autoplay } =
    useSelector((state) => state.player);
  const { user } = useSelector((state) => state.auth);
  const { items, currentSongId, repeatStatus, currentIndex, idList } =
    useSelector((state) => state.queue);

  const [currentTime, setCurrentTime] = useState(0);

  const [data, setData] = useState(items[currentSongId]);

  useEffect(() => {}, []);
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
        dispatch(playerActions.updateSource(null));
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

    !!user &&
      !error &&
      axios
        .put(
          `${process.env.REACT_APP_FETCH_URL}user/${user._id}/recentSongs`,
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
    if (autoplay) {
      dispatch(playerActions.playMusic());
    }
  }, [source]);

  useEffect(() => {
    setData(items[currentSongId]);
  }, [items, currentSongId]);

  useEffect(() => {
    const audio = $(".player-audio");
    const prevBtn = $(".player-btn.prev");
    const nextBtn = $(".player-btn.next");
    const playBtn = $(".player-btn.play");
    const volumeInput = $(".player-volume-bar");
    const process = $(".player-process-bar");
    volumeInput.oninput = (e) => {
      dispatch(playerActions.setVolume(+e.target.value));
    };
    process.oninput = (e) => {
      if (audio.duration) {
        const seekTime = (e.target.value * audio.duration) / 100;
        audio.currentTime = seekTime;
      }
    };

    playBtn.onclick = () => {
      if (source) {
        if (audio.paused) {
          dispatch(playerActions.playMusic());
        } else {
          dispatch(playerActions.pauseMusic());
        }
      }
    };

    audio.ontimeupdate = function () {
      setCurrentTime(this.currentTime);
      process.value = (this.currentTime / this.duration) * 100;
    };
    audio.onended = function () {
      if (
        repeatStatus === 1 ||
        (repeatStatus === 0 && currentIndex !== idList.length - 1)
      ) {
        dispatch(playerActions.pauseMusic());
        nextBtn.click();
      }
    };
  }, []);

  //mute && unmute && adjust volume level
  useEffect(() => {
    const volumeBtn = $(".player-btn.volume");
    const audio = $(".player-audio");
    volumeBtn.onclick = () => {
      if (volume === 0) {
        dispatch(playerActions.setVolume(20));
      } else {
        dispatch(playerActions.setVolume(0));
      }
    };
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = $(".player-audio");

    if (isPlaying) {
      audio.muted = false;
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

  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="player-left">
          <PlayerMedia data={data} />
        </div>

        <div className="player-center">
          <div className="player-control">
            <ShuffleBtn />
            <PreviousBtn />
            <PlayBtn isFetching={isFetching} isPlaying={isPlaying} />
            <NextBtn />
            <RepeatBtn />
          </div>
          <AudioProgress data={data} />
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
            className="player-btn  hide-on-mobile"
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
        <audio className="player-audio" muted preload="auto" src={source} />
      </div>
    </div>
  );
};

export default Player;
