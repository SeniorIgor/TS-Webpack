import styled from 'styled-components';

interface Props {
  src: string;
}

export const StyledImage = styled.div<Props>`
  background: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
