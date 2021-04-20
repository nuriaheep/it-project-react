import styled from "styled-components";

export const Gallery = styled.div`
  font-family: sans-serif;

  & .gallery-container {
    max-width: 100%;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1520px) {
      grid-template-columns: repeat(6, 1fr);
    }

    & img {
      max-width: 100%;
    }
  }
`
