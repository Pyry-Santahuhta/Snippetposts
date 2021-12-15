import React, { useState } from "react";
import Search from "@mui/icons-material/Search";
import useStyles from "../materialui/Styles";
import TextField from "@mui/material/TextField";
import AlertMessage from "../AlertMessage";

//Search posts component
export const SearchPosts = (props) => {
  //Classes to set the styles
  const classes = useStyles();
  //Status is used for snackbar alert messages.
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
        //On key press in the text field check if it was enter.
        onKeyPress={async function search(e) {
          if (e.key === "Enter") {
            e.preventDefault();
            //Search with the textfield value from the backend and de-select the textfield.
            const searchTerm = e.target.value;
            e.target.blur();
            const response = await fetch("/posts/search/" + searchTerm, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const searchResults = await response.json();

            //If no posts were found, set a alert message.
            if (searchResults.length === 0) {
              setStatus({
                msg: "No posts found with those keywords",
                severity: "error",
                key: Math.random(),
              });
            }
            //Use the setPosts function from fetchPosts to set the posts with the searchresults.
            props.setPosts(searchResults);
          }
        }}
      />
      {
        //Showing the alert messages.
        status ? (
          <AlertMessage
            severity={status.severity}
            message={status.msg}
            key={status.key}
          />
        ) : null
      }
    </div>
  );
};

export default SearchPosts;
