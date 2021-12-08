import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "35%",
    marginTop: "30px",
  },

  dashBoardBox: {
    flexGrow: 1,
  },

  fetchPosts: {
    marginLeft: "2%",
  },
  postForm: {
    position: "sticky",
    alignSelf: "start",
  },
}));

export default useStyles;
