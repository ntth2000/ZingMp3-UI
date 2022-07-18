import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import ArtistCard from "~/components/ArtistCard";
import DiscoverButton from "~/components/DiscoverBtn";
import MvCard from "~/components/MvCard";
import MySwiper from "~/components/MySwiper";
import Card from "~/components/Card";
import Media from "~/components/Media";
import { SearchLoader } from "~/components/PageLoader/Page";
import { search } from "~/apiServices/searchServices";
const SearchAll = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchSearch = async () => {
      const result = await search(searchText);
      setData(result);
      setIsLoading(false);
    };
    fetchSearch();
  }, [searchText]);
  return (
    <>
      {isLoading && (
        <div>
          {console.log("search loading")}
          <SearchLoader />
        </div>
      )}

      {!isLoading && data && (
        <>
          {!data ||
            (!data?.counter?.song &&
              !data?.counter?.video &&
              !data?.counter?.playlist &&
              !data?.counter?.artist && (
                <div className="no-content background">
                  <div
                    className="no-content-img song"
                    style={{
                      backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.31/static/media/dics-music-icon.3925fc01.svg')`,
                    }}
                  />
                  <p className="no-content-desc">
                    Không có kết quả được tìm thấy
                  </p>
                </div>
              ))}
          {!!data && (
            <div className="search-main">
              {!!data?.songs && (
                <section className="section song">
                  <header className="section-header">
                    <h3 className="section-title title">Bài hát</h3>
                    <DiscoverButton
                      to={`/tim-kiem/bai-hat${location.search}`}
                    />
                  </header>
                  <div className="section-content">
                    {data?.songs.map((item) => (
                      <Media
                        key={item.encodeId}
                        item={item}
                        showDesc={false}
                        showAlbum={true}
                        showBorderBottom={true}
                        showDuration={true}
                      />
                    ))}
                  </div>
                </section>
              )}
              {!!data?.playlists && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">Playlist/Album</h3>
                    <DiscoverButton
                      to={`/tim-kiem/playlist${location.search}`}
                    />
                  </header>
                  <div className="section-content">
                    <MySwiper
                      breakpoints={{
                        375: {
                          slidesPerView: 2,
                          slidesPerGroup: 2,
                          spaceBetween: 20,
                        },
                        740: {
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 28,
                        },
                      }}
                      navigation={false}
                      className={`search-playlist`}
                    >
                      {data?.playlists?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <Card data={item} showDesc={false} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
              {!!data.videos && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">MV</h3>
                    <DiscoverButton to={`/tim-kiem/video${location.search}`} />
                  </header>
                  <div className="section-content">
                    <MySwiper
                      breakpoints={{
                        375: {
                          slidesPerView: 1,
                          slidesPerGroup: 1,
                          spaceBetween: 20,
                        },
                        740: {
                          slidesPerView: 2,
                          slidesPerGroup: 2,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 3,
                          slidesPerGroup: 3,
                          spaceBetween: 28,
                        },
                      }}
                      navigation={false}
                      className={`search-video`}
                    >
                      {data.videos.map((item, index) => (
                        <SwiperSlide key={index}>
                          <MvCard data={item} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
              {!!data.artists && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">Nghệ Sĩ/OA</h3>
                    <DiscoverButton
                      to={`/tim-kiem/nghe-si${location.search}`}
                    />
                  </header>
                  <div className="section-content">
                    <MySwiper
                      breakpoints={{
                        375: {
                          slidesPerView: 2,
                          slidesPerGroup: 2,
                          spaceBetween: 20,
                        },
                        740: {
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 28,
                        },
                      }}
                      navigation={false}
                      className={`search-artist`}
                    >
                      {data?.artists?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <ArtistCard item={item} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchAll;
