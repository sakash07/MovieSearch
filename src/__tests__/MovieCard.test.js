/**
 * @jest-environment jsdom
 */
import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";

const movie = {
  Year: "2011",
  Poster: "https://via.placeholder.com/400",
  Title: "Superman, Spiderman or Batman",
  Type: "movie",
};

test("renders all movie props correctly", () => {
  render(<MovieCard movie={movie} />);

  // Check Year
  const yearElement = screen.getByText(movie.Year);
  expect(yearElement).toBeInTheDocument();

  // Check Poster
  const posterElement = screen.getByAltText(movie.Title);
  expect(posterElement).toHaveAttribute("src", movie.Poster);

  // Check Title
  const titleElement = screen.getByText(movie.Title);
  expect(titleElement).toBeInTheDocument();

  // Check Type
  const typeElement = screen.getByText(movie.Type);
  expect(typeElement).toBeInTheDocument();
});
