import React, { Fragment } from "react";
import PostForm from "./postForm";
import { PostList } from "./postList";

export const dashboard = () => {
  return (
    <Fragment>
      <PostList></PostList>
      <PostForm></PostForm>
    </Fragment>
  );
};
export default dashboard;
