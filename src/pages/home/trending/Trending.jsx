import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchingTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endPoint}`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchingTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
