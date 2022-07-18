import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchByType } from "~/apiServices/searchServices";
import Media from "~/components/Media";
import { ListMediaLoader } from "~/components/PageLoader/Component";

const SearchBySong = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const layoutContent = document.querySelector(".layout-content");
    layoutContent.addEventListener("scroll", (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollHeight - scrollTop <= clientHeight + 60) {
        setPage((prev) => prev + 1);
      }
    });
  }, []);
  useEffect(() => {
    setData([]);
    setPage(1);
    const fetchSearch = async () => {
      setIsLoading(true);
      const res = await searchByType(searchText, "song", page);
      setData(res.data.items);
      setIsLoading(false);
    };
    fetchSearch();
  }, [searchText]);

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading(true);
      const res = await searchByType(searchText, "song", page);
      setData((prev) => {
        return [...prev, ...res.data.items];
      });
      setIsLoading(false);
    };
    fetchSearch();
  }, [page]);
  return (
    <>
      {data.length > 0 && (
        <div className="search-main">
          <h3 className="search-type-title">Bài hát</h3>
          {data.map((item) => (
            <Media item={item} showBorderBottom showAlbum key={item.encodeId} />
          ))}
        </div>
      )}
      {isLoading && (
        <div>
          <ListMediaLoader />
        </div>
      )}
    </>
  );
};

export default SearchBySong;
