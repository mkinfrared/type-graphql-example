import React from "react";

import { useAllFilmsQuery } from "type/Graphql.type";

const Swapi: React.FC = () => {
  const { data, loading, error } = useAllFilmsQuery({
    context: {
      clientName: "swapiLink"
    }
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  const movies = data.allFilms.map(film => {
    return (
      <div key={film.id}>
        <p>{film.title}</p>
        <p>{film.director}</p>
        <p>{film.producers}</p>
      </div>
    );
  });

  return <h1>{movies}</h1>;
};

export default Swapi;
