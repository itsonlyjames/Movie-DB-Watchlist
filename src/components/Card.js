import React from "react";
import styled from "styled-components";

const CardEl = styled.div`
  position: relative;
  width: 80%;
  background-color: lightGray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 40px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = ({ onWatchlistToggle, movie, remove }) => {
  return (
    <CardEl>
      <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
      <h2>{movie.title}</h2>
      <p>
        {new Date(movie.release_date).toLocaleDateString("en-AU", {
          year: "numeric"
        })}
      </p>
      <p>{`${Math.floor((movie.vote_average / 10) * 100)}%`}</p>
      <p>{movie.original_language}</p>
      <div onClick={() => onWatchlistToggle(movie.id, !remove)}>
        {remove ? "Remove from watchlist" : "Add to watchlist"}
      </div>
    </CardEl>
  );
};

export default Card;
