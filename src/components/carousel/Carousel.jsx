import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadingImage/LazyLoadingImage";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genre/Genres";
import "./style.scss";
const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.Home);
  const navigate = useNavigate();
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth + 20
        : container.scrollLeft + container.offsetWidth + 20;
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = (index) => {
    return (
      <div className="skeletonItem" key={index}>
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data &&
              data.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div
                    className="carouselItem"
                    key={item.id}
                    onClick={() => {
                      navigate(`/${item.media_type || endPoint}/${item.id}`);
                    }}
                  >
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating rating={item?.vote_average.toFixed(1)} />
                      <Genres data={item?.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {[...Array(5)].map((data, index) => skItem(index))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default Carousel;
