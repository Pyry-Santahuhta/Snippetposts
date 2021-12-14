import { makeStyles } from "@mui/styles";

//The styles for the app are done here
//Import and call the useStyles function to create a classes object, holding all of the css.
const useStyles = makeStyles((theme) => ({
  search: {
    width: "35%",
  },

  fetchPosts: {
    marginLeft: "2%",
    marginRight: "2%",
  },

  //Make the postform stay on the right side at all times
  postForm: {
    position: "sticky",
    top: 0,
    left: 0,
    alignSelf: "start",
  },

  navbarGrid: {
    justify: "space-between",
    alignItems: "center",
  },

  addCommentTextArea: {
    marginTop: "20px",
    marginBottom: "10px",
  },

  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  listItemSecondaryText: {
    display: "inline-block",
    marginTop: "10px",
  },

  divider: { marginTop: "20px" },

  boxContainer: {
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  postDetailsBox: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
    textAlign: "left",
  },

  postBox: {
    padding: "3%",
  },

  postContent: {
    marginTop: "1%",
  },

  commentContent: {
    wordWrap: "break-word",
    marginTop: "1%",
  },

  postInfo: {
    fontStyle: "italic",
    marginTop: "1%",
  },
  likesGrid: {
    direction: "row",
    marginTop: "1%",
  },
}));

export default useStyles;
