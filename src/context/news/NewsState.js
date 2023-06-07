import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewsContext from "./newsContext";
import { toast } from "react-toastify";

const NewsState = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarked, setBookmarked] = useState();
  const navigate = useNavigate();

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
        process.env.REACT_APP_URL + "/api/news/fetchallnews",
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

  const handleAddBookmark = async (note) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.error("log in first");
      return;
    }

    let { title, description, imageUrl, newsUrl, author, date, source } = note;

    let body = JSON.stringify({
      //body of the request
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      newsDate: date,
      source,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    try {
      const response = await axios.post(
        //post request to the backend
        process.env.REACT_APP_URL + "/api/news/addnews",
        body,
        config
      );
      if (response.data.success === true) {
        setIsBookmarked(true);
        console.log(response.data.msg);
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchId = (note) => {
    if (bookmarked) {
      const matchingObject = bookmarked.find(
        (item) => item.title === note.title
      );
      if (matchingObject) {
        setIsBookmarked(true);
        if (!note.id) {
          return (note.id = matchingObject._id);
        }
      }
    }
  };

  const handleRemoveBookmark = async (id) => {
    if (!id) {
      id = fetchId();
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      alert("log in first");
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
      const response = await axios.delete(
        //post request to the backend
        process.env.REACT_APP_URL + "/api/news/deletenews/" + id,
        config,
        body
      );
      if (response.data.success === true) {
        setIsBookmarked(false);
        console.log(response.data.msg);
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <NewsContext.Provider value={{ handleAddBookmark, handleRemoveBookmark }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
