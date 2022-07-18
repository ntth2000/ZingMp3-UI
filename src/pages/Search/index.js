import { NavLink, Route, Routes, useLocation } from "react-router-dom";

import "./Search.scss";
import SearchAll from "./SearchAll";
import SearchByAlbum from "./SearchByAlbum";
import SearchByArtist from "./SearchByArtist";
import SearchBySong from "./SearchBySong";
import SearchByVideo from "./SearchByVideo";

const Search = () => {
  const location = useLocation();

  return (
    <div className="search">
      <header className="search-header">
        <h2 className="search-title title hide-on-tablet-mobile">
          Kết quả tìm kiếm
        </h2>
        <nav className="search-nav">
          <ul className="search-links">
            <NavLink to={`tat-ca${location.search}`} className="search-link">
              Tất cả
            </NavLink>
            <NavLink to={`bai-hat${location.search}`} className="search-link">
              Bài hát
            </NavLink>
            <NavLink to={`playlist${location.search}`} className="search-link">
              Playlist/album
            </NavLink>
            <NavLink to={`nghe-si${location.search}`} className="search-link">
              Nghệ sĩ/OA
            </NavLink>
            <NavLink to={`video/${location.search}`} className="search-link">
              MV
            </NavLink>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route element={<SearchAll />} path="tat-ca" />
        <Route element={<SearchByAlbum />} path="playlist" />
        <Route element={<SearchBySong />} path="bai-hat" />
        <Route element={<SearchByArtist />} path="nghe-si" />
        <Route element={<SearchByVideo />} path="video" />
      </Routes>
    </div>
  );
};
export default Search;
