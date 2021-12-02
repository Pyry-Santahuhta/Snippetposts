import React from "react";
const authToken = localStorage.getItem("auth_token");

export default class FetchPosts extends React.Component {
  state = {
    loading: true,
    posts: null,
  };

  async componentDidMount() {
    if (authToken) {
      const response = await fetch("/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      });
      const postData = await response.json();
      this.setState({ posts: postData, loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.posts ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {this.state.posts.map((post, index) => {
              return (
                <li key={index}>
                  <p>{post.user}</p>
                  <p>{post.content}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
