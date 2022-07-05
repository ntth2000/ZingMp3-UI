import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Media from "~/components/Media";
import { ListMediaLoader } from "~/components/PageLoader/Component";
import { request } from "~/utils/request";
const Song = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    request
      .get(`user/${user?._id}/recentSongs`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setError(null);
        setData(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setIsFetching(false);
      });
  }, []);
  const handleDelete = (songEncodeId) => {
    request
      .put(
        `user/${user?._id}/recentSongs`,
        { songId: songEncodeId, action: "delete" },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        const newData = data.filter((item) => item.encodeId !== songEncodeId);
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="history-library-song">
      {!isFetching && data.length > 0 && (
        <ul className="list">
          {data?.map((item, index) => {
            return (
              <Media
                showBorderBottom
                showAlbum
                showDuration
                index={index}
                item={item}
                showDelete
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      )}
      {!isFetching && !data.length && (
        <div className="no-content background">
          <div
            className="no-content-img song"
            style={{
              backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/music-icon.cfa4aa91.svg')`,
            }}
          />
          <p className="no-content-desc">Không có bài hát nghe gần đây</p>
        </div>
      )}
      {isFetching && <ListMediaLoader />}
    </div>
  );
};

export default Song;
