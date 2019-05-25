import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { API_URL, CustomPOST } from "../../config/api";
import Card from "../../components/Card";

const cookies = new Cookies();

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      results: []
    };
  }

  fetchWatchListMovies = async () => {
    const { id } = this.props.User;

    const session_id = cookies.get("sessionId");

    const response = await fetch(API_URL.watchlistMovies(id, session_id));

    const res = await response.json();

    this.setState({
      results: res.results
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

    this.fetchWatchListMovies();

    this.setState({
      loading: false
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.User !== prevProps.User) {
      this.fetchWatchListMovies();
    }
  }

  componentDidMount() {
    this.fetchWatchListMovies();
  }

  render() {
    const { results } = this.state;
    return (
      <React.Fragment>
        <h1>Your watchlist!</h1>
        <Link to="/">
          <p>Take me back to search</p>
        </Link>

        {results.length
          ? results.map(item => (
              <Card
                movie={item}
                key={item.id}
                onWatchlistToggle={this.toggleWatchlist}
                remove={true}
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
)(List);
