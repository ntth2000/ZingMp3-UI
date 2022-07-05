import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "~/components/Card";
import ListCardLoader from "~/components/PageLoader/Component/ListCard";
import { request } from "~/utils/request";
const Song = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    request
      .get(`user/${user?._id}/recentPlaylists`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  }, []);
  return (
    <div className="history-library-playlist">
      {!isFetching && data?.length > 0 && (
        <div className="row">
          {data?.map((item) => {
            return (
              !!item && (
                <div className="col l-2-4 m-4 c-6" key={item.encodeId}>
                  <Card
                    data={item}
                    showDesc={false}
                    showArtists={true}
                    showDate={false}
                  />
                </div>
              )
            );
          })}
        </div>
      )}
      {!isFetching && !data.length && (
        <div className="no-content background">
          <div
            className="no-content-img"
            style={{
              backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/dics-music-icon.3925fc01.svg')`,
            }}
          />
          <p className="no-content-desc">Không có Podcast nghe gần đây</p>
        </div>
      )}
      {isFetching && <ListCardLoader />}
    </div>
  );
};

export default Song;
