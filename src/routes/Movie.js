import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      description_full
      medium_cover_image
      rating
      title
      year
      id
      isLiked @client
    }
  }
`;

const Movie = () => {
  const id = useParams().id;

  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: { movieId: id },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>fetch error ...</h2>;
  }
  const movie = data.movie;

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !movie.isLiked,
      },
    });
  };
  return (
    <Container>
      <TextContainer>
        {' '}
        <Title>
          {movie.title}
          <Year>{movie.year}</Year>
        </Title>
        <Rating> ⭐️ {movie.rating}</Rating>
        <Button onClick={onClick}>{movie.isLiked ? 'Unlike' : 'Like'}</Button>
        <Description>{movie.description_full}</Description>
      </TextContainer>

      <ImgContainer>
        {' '}
        <Img src={movie.medium_cover_image} alt="" />
      </ImgContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 10%;
`;
const TextContainer = styled.div`
  width: 40%;
`;
const ImgContainer = styled.div`
  width: 40%;
  text-align: right;
`;
const Title = styled.h1`
  font-size: 40px;
`;
const Img = styled.img``;
const Description = styled.p`
  padding: 10% 0;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: black;
  color: white;
  border: none;
  outline: none;
  padding: 5px;
`;
const Year = styled.span`
  font-size: 18px;
  margin-left: 40%;
`;

const Rating = styled.p`
  margin-top: 4%;
`;
export default Movie;
