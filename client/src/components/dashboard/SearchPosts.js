import React from "react";
import Search from "@mui/icons-material/Search";
import useStyles from "../materialui/Styles";
import TextField from "@mui/material/TextField";

export const SearchPosts = (props) => {
  const classes = useStyles();

  return (
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
          console.log(postData);
          props.setPosts(postData);
        }
      }}
    />
  );
};

export default SearchPosts;
