import React, { Fragment } from "react";
import PostForm from "./postForm";

export const dashboard = () => {
  return (
    <Fragment>
      <div>Users posts</div>
      <PostForm></PostForm>
    </Fragment>
  );
};
export default dashboard;
