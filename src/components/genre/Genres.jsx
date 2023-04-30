import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => {
    return state.Home;
  });
  return (
    <div className="genres">
      {data?.map((id) => (
        <div className="genre" key={id}>
          {genres[id]?.name ?? "N/A"}
        </div>
      ))}
    </div>
  );
};

export default Genres;
