import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      genres
      rating
      title
      medium_cover_image
    }
  }
`;

const Movies = (props) => {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>fetch error ...</h2>;
  }
  return (
    <>
      <Title>Movies</Title>
      <List>
        {data.allMovies.map((movie) => (
          <Item key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <Img src={movie.medium_cover_image} alt="" />
            </Link>
          </Item>
        ))}
      </List>
    </>
  );
};
const Title = styled.h1`
 text-align: center;
 margin: 30px;
 font-size: 34px;
`
const List = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* background-color: yellow; */
`;

const Item = styled.li`
  width: 20%;
  border: 0.5px solid gray;
  text-align: center;
`;
const Img = styled.img`
  width: 100%;
`;

export default Movies;
