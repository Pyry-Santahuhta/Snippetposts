import React, { Fragment } from "react";
import PostForm from "./postForm";
import FetchPosts from "./fetchPosts";

export const dashboard = () => {
  return (
    <Fragment>
      <FetchPosts></FetchPosts>
      <PostForm></PostForm>
    </Fragment>
  );
};
export default dashboard;
