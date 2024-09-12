import styled, { css, keyframes } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
`;

export const Section = styled.div`
`

export const SectionTitle = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  margin-bottom: 10px;
`

export const SectionGames = styled.div`
  display: flex;
  gap: 20px;
`

export const PreviewImage = styled.div`
  height: 300px;
  width: 225px;
  background: url(${({ source }) => source }) no-repeat;
  border-radius: 8px;
  transition: 100ms ease-in-out;
`

export const PreviewTitle = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 1px 0 rgba(255, 255, 255, 0.5), -1px 0 rgba(255, 255, 255, 0.5), 0 1px rgba(255, 255, 255, 0.5), 0 -1px rgba(255, 255, 255, 0.5),
             1px 1px rgba(255, 255, 255, 0.5), -1px -1px rgba(255, 255, 255, 0.5), 1px -1px rgba(255, 255, 255, 0.5), -1px 1px rgba(255, 255, 255, 0.5);

  text-align: center;
  user-select: none;
`

export const PreviewTags = styled.div`
  font-family: 'Nunito', sans-serif;
  text-align: center;
  user-select: none;

  width: 225px;

  text-shadow: 1px 0 rgba(255, 255, 255, 0.1), -1px 0 rgba(255, 255, 255, 0.1), 0 1px rgba(255, 255, 255, 0.1), 0 -1px rgba(255, 255, 255, 0.1),
             1px 1px rgba(255, 255, 255, 0.1), -1px -1px rgba(255, 255, 255, 0.1), 1px -1px rgba(255, 255, 255, 0.1), -1px 1px rgba(255, 255, 255, 0.1);
`

export const GamePreview = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:visited {
    color: black;
  }

  &:link {
    color: black;
  }

  &:hover ${PreviewImage} {
    filter: brightness(1.1);
  }
`