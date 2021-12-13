import React, { useState } from "react";
import Search from "@mui/icons-material/Search";
import useStyles from "../materialui/Styles";
import TextField from "@mui/material/TextField";
import AlertMessage from "../AlertMessage";

export const SearchPosts = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState(null);

  return (
    <div>
      <TextField
        className={classes.search}
        type="text"
        name="search"
        label="Search"
        InputProps={{
          endAdornment: <Search />,
        }}
        onKeyPress={async function search(e) {
          if (e.key === "Enter") {
            e.preventDefault();
            const searchTerm = e.target.value;
            e.target.value = "";
            e.target.blur();
            const response = await fetch("/posts/search/" + searchTerm, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const postData = await response.json();

            if (postData.length === 0) {
              setStatus({
                msg: "No posts found with those keywords",
                severity: "error",
                key: Math.random(),
              });
            }
            props.setPosts(postData);
          }
        }}
      />
      {status ? (
        <AlertMessage
          severity={status.severity}
          message={status.msg}
          key={status.key}
        />
      ) : null}
    </div>
  );
};

export default SearchPosts;
