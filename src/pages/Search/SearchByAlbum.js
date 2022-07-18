import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchByType } from "~/apiServices/searchServices";
import Card from "~/components/Card";
import { ListCardLoader } from "~/components/PageLoader/Component";

const SearchByAlbum = () => {
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
      const res = await searchByType(searchText, "playlist", page);
      setData(res.data.items);
      setIsLoading(false);
    };
    fetchSearch();
  }, [searchText]);

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading(true);
      const res = await searchByType(searchText, "playlist", page);
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
          <h3 className="search-type-title">Playlist/Album</h3>
          <div className="row">
            {data.map((item) => (
              <div className="col l-2-4 m-3 c-6" key={item.encodeId}>
                <Card data={item} />
              </div>
            ))}
            {isLoading && page > 1 && <ListCardLoader />}
          </div>
        </div>
      )}
      {isLoading && page === 1 && (
        <div className="row">
          <ListCardLoader />
        </div>
      )}
    </>
  );
};

export default SearchByAlbum;
