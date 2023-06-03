import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";
import Spinner from "../components/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [bookmarked, setBookmarked] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [changed, setChanged] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Daily Digest`;
    updateNews();
    fetchallnews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&apiKey=${props.apiKey}&page=${
        page + 1
      }&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      if (data) {
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchallnews = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    let body = {};

    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    try {
      const response = await axios.get(
        //post request to the backend
        "http://localhost:5000/api/news/fetchallnews",
        config,
        body
      );
      if (response.data.success === true) {
        const allBookmarked = response.data.data;
        // const titles = allBookmarked.map((obj) => obj.title);
        const titles = allBookmarked.map(({ title, _id }) => ({ title, _id }));
        setBookmarked(titles);
      } else {
        // console.log(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchallnews();
  }, [changed]);

  return (
    <div className={`${props.darkMode === true ? "bg-dark text-light" : ""}`}>
      <h1
        className="text-center"
        style={{ padding: "35px 0px", paddingTop: "90px" }}
      >
        Daily Digest - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      {!loading && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults - 1}
          loader={<Spinner />}
        >
          <div className="container ">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      darkMode={props.darkMode}
                      bookmarked={bookmarked}
                      loggedIn={props.loggedIn}
                      changed={changed}
                      setChanged={setChanged}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
