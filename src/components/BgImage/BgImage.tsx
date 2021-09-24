import { FC } from 'react';

import { StyledImage } from './BgImage.styles';

interface Props {
  src: string;
  className?: string;
}

export const BgImage: FC<Props> = ({ src, className }) => {
  return <StyledImage src={src} className={className} />;
};
