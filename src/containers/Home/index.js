import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { API_URL, CustomPOST } from "../../config/api";
import Card from "../../components/Card";

const cookies = new Cookies();

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: null,
      results: []
    };
  }

  fetchUserLogin = async () => {
    const response = await fetch(API_URL.newToken);

    const res = await response.json();

    const requestToken = res.request_token;

    window.location.replace(API_URL.authenticate(requestToken));

    return res;
  };

  newSession = async token => {
    let data = {
      request_token: token
    };

    const response = await fetch(API_URL.newSession, CustomPOST(data));

    const res = await response.json();

    cookies.set("sessionId", res.session_id, { path: "/" });

    return res;
  };

  componentDidMount() {
    var searchParams = new URLSearchParams(this.props.location.search);

    const request_token = searchParams.get("request_token");

    const session_id = cookies.get("sessionId");

    if (session_id === undefined && !request_token) {
      this.fetchUserLogin();
    }

    if (request_token) {
      this.newSession(request_token);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const searchResponse = await fetch(API_URL.search(this.state.searchValue));

    const res = await searchResponse.json();

    this.setState({
      results: res.results
    });
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  toggleWatchlist = async (id, status) => {
    let data = {
      media_type: "movie",
      media_id: id,
      watchlist: status
    };

    await fetch(
      API_URL.watchlist(this.props.User.id, cookies.get("sessionId")),
      CustomPOST(data)
    );
  };

  render() {
    const { results } = this.state;

    return (
      <React.Fragment>
        <h1>Welcome to the movie search db</h1>
        <Link to="/list">
          <p>Take me to my watchlist</p>
        </Link>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" onChange={this.handleChange} />
          <button>Search</button>
        </form>

        {results.length
          ? results.map(item => (
              <Card
                movie={item}
                key={item.id}
                onWatchlistToggle={this.toggleWatchlist}
              />
            ))
          : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  User: state.User
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
