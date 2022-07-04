import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import ArtistName from "~/components/ArtistName";
import Icon from "~/components/Icon";
import { PlayerMediaMenu } from "~/components/Menus";
import useToast from "~/components/Toast";
import { useSelector } from "react-redux";
const PlayerMedia = () => {
  const toast = useToast();
  const { items, currentSongId } = useSelector((state) => state.queue);
  const data = items[currentSongId];
  const [like, setLike] = useState(false);
  const handleLikeSong = () => {
    setLike((prev) => !prev);
    if (like) {
      toast("Đã xóa bài hát khỏi thư viện");
    } else {
      toast("Đã thêm bài hát vào thư viện");
    }
  };
  return (
    <div className="media">
      <div className="media-img">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="media-thumbnail"
        />
      </div>
      <div className="media-info">
        <h4 className="media-name">{data?.title}</h4>
        <p className="media-singers">
          {data?.artists ? (
            data?.artists.map((artist, index) => (
              <span key={index}>
                <ArtistName artist={artist} />
                {index < data?.artists.length - 1 ? ", " : ""}
              </span>
            ))
          ) : (
            <span>{data?.artistsNames ? data?.artistsNames : ""}</span>
          )}
        </p>
      </div>
      <div className="media-actions">
        <Icon
          placement="top"
          content={like ? "Xoá khỏi thư viện" : "Thêm vào thư viện"}
          size={32}
          iconSize={16}
          hover="bright"
          className="hide-on-mobile"
          space={4}
          onClick={handleLikeSong}
        >
          {like ? (
            <i className="ic-like-full"></i>
          ) : (
            <i className="ic-like"></i>
          )}
        </Icon>

        <TippyHeadless
          trigger="click"
          placement="right-start"
          appendTo={() => document.body}
          interactive={true}
          hideOnClick={true}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <PlayerMediaMenu item={data} />
            </div>
          )}
        >
          <Icon
            size={32}
            iconSize={16}
            hover="bright"
            placement="top"
            content="Xem thêm"
            space={4}
            className="hide-on-tablet-mobile"
          >
            <i className="ic-more"></i>
          </Icon>
        </TippyHeadless>
      </div>
    </div>
  );
};

export default PlayerMedia;
