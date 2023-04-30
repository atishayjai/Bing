import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import Img from "../../../components/lazyLoadingImage/LazyLoadingImage";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";
const HeroBanner = () => {
  const [backgroundImg, setBackgroundImg] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.Home);
  const { data, loading } = useFetch("/movie/upcoming");
  const navigate = useNavigate();
  const keyPressHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroundImg(bg);
  }, [data]);
  return (
    <div className="wrapper">
      {!loading && (
        <div className="backdrop-img">
          <Img src={backgroundImg}></Img>
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="banner-content">
          <span className="title"> Welcome.</span>
          <span className="subtitle">
            Millions of Movies, Tv shows and Exclusive content. Explore now.
          </span>
          <div className="serachBar">
            <input
              type="text"
              placeholder="Search your content here..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(event) => keyPressHandler(event)}
            />
            <button> Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
