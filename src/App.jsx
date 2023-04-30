import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { fetchConfigurationData, fetchAllGenres } from "./store/homeSlice";
import SearchResult from "./pages/searchResult/SearchResult";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/404/NotFound";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchApiConfig();
    getGenre();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(fetchConfigurationData(url));
    });
  };

  const getGenre = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((endpoint) => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    });
    let data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(fetchAllGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
