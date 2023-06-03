import { useState } from "react";
import NewsContext from "./newsContext";

const NewsState = (props) => {
  const s1 = [
    {
      _id: "647b30ff7c9c57f82e08da23",
      user: "647a4b68475ee53635070e75",
      title: "The Hidden Dangers of the Decentralized Web",
      description:
        "From social networks to crypto, independently run servers are being touted as a solution to the internet’s problems. But they’re far from a magic bullet.",
      imageUrl:
        "https://media.wired.com/photos/6466a28c9ec11a2433532a66/191:100/w_1280,c_limit/Cons_Social.jpg",
      newsUrl:
        "https://www.wired.com/story/the-hidden-dangers-of-the-decentralized-web/",
      author: "Jessica Maddox",
      newsDate: "2023-05-19T12:00:00Z",
      source: "unknown",
      date: "2023-06-03T12:24:31.044Z",
      __v: 0,
    },
    {
      _id: "647b317c7c9c57f82e08da26",
      user: "647a4b68475ee53635070e75",
      title: "The Hidden Dangers of the Decentralized Web",
      description:
        "From social networks to crypto, independently run servers are being touted as a solution to the internet’s problems. But they’re far from a magic bullet.",
      imageUrl:
        "https://media.wired.com/photos/6466a28c9ec11a2433532a66/191:100/w_1280,c_limit/Cons_Social.jpg",
      newsUrl:
        "https://www.wired.com/story/the-hidden-dangers-of-the-decentralized-web/",
      author: "Jessica Maddox",
      newsDate: "2023-05-19T12:00:00Z",
      source: "unknown",
      date: "2023-06-03T12:26:36.085Z",
      __v: 0,
    },
  ];

  const [state, setState] = useState(s1);

  const addNews = (news) => {
    console.log("Adding a news!");
  };

  const deleteNews = (id) => {
    console.log("deleting a news!");
  };

  return (
    <NewsContext.Provider value={state}>{props.children}</NewsContext.Provider>
  );
};

export default NewsState;
