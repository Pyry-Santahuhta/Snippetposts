import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import useStyles from "./materialui/Styles";

export const Likes = () => {
  const classes = useStyles();
  const [likes, setlikes] = useState(0);

  return (
    <Grid xs={8} container>
      <Grid item>5</Grid>
      <Button item variant="contained" color="secondary">
        Press me bro
      </Button>
    </Grid>
  );
};

export default Likes;
