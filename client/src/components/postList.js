import React, { useEffect } from "react";
const authToken = localStorage.getItem("auth_token");

export const PostList = () => {
  let posts = null;
  useEffect(() => {
    fetch("/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then((res) =>
      res.json().then((postData) => {
        posts = postData.map((post, index) => {
          return (
            <li key={index}>
              <p>{post.user}</p>
              <p>{post.content}</p>
            </li>
          );
        });
      })
    );
  }, []);
  if (authToken) {
    return <ul>{posts}</ul>;
  } else {
    return null;
  }
};

export default PostList;
