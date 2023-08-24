/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("displays movies when the search button is clicked", async () => {
    const searchData = [
      {
        Title: "Spider-Man",
        Year: "2002",
        imdbID: "tt0145487",
        Type: "movie",
        Poster: "https://via.placeholder.com/200x300",
      },
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        Search: searchData,
        totalResults: "1",
        Response: "True",
      })
    );

    render(<App />);

    // Simulate typing into the search input
    const searchInput = screen.getByPlaceholderText("search for movies");
    fireEvent.change(searchInput, { target: { value: "Spiderman" } });

    // Simulate clicking the search button
    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);

    // Wait for the API call to complete
    await waitFor(() => {
      // Check if the loading state is not displayed
      expect(screen.queryByText("No movies found")).toBeNull();
    });

    // Check if the movie card is displayed
    const movieCard = screen.queryByText("Spider-Man");
    expect(movieCard).toBeInTheDocument();
  });

  it("displays 'No movies found' when no results are returned", async () => {
    // Mock an empty response
    fetch.mockResponseOnce(
      JSON.stringify({
        Search: [],
        totalResults: "0",
        Response: "True",
      })
    );

    render(<App />);

    // Simulate typing into the search input
    const searchInput = screen.getByPlaceholderText("search for movies");
    fireEvent.change(searchInput, { target: { value: "NonExistentMovie" } });

    // Simulate clicking the search button
    const searchButton = screen.getByAltText("search");
    fireEvent.click(searchButton);

    // Wait for the API call to complete
    await waitFor(() => {
      // Check if the 'No movies found' message is displayed
      expect(screen.getByText("No movies found")).toBeInTheDocument();
    });
  });
});
