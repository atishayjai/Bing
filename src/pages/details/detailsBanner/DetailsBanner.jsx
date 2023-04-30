import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadingImage/LazyLoadingImage";
// import CircleRating from "../../../components/circleRating/CircleRating";
import PosterFallback from "../../../assets/no-poster.png";
import Genres from "../../../components/genre/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import playbtn from "./PlayBtn";
import Playbtn from "./PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.Home);
  const _genres = data?.genres?.map((genre) => genre.id);

  const director = crew?.filter((item) => item.job === "Director");
  const writer = crew?.filter(
    (item) =>
      item.job === "Screenplay" || item.job === "Story" || item.job === "Writer"
  );
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className={"posterImg"}
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img
                        className={"posterImg"}
                        src={url.backdrop + PosterFallback}
                      />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{` ${
                      data.name || data.title
                    } (${dayjs(data.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <Playbtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <div className="text bold">Status: </div>
                          <div className="text ">{data.status}</div>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <div className="text bold">Release Date: </div>
                          <div className="text ">
                            {dayjs(data.release_date).format("MMM D YYYY")}
                          </div>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <div className="text bold">Runtime: </div>
                          <div className="text ">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {director?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {writer?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {data?.created_by?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
