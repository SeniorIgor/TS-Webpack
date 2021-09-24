import { FC } from 'react';

import limage from '@/assets/images/landscape.jpg';

import { StyledBgImage } from './ImageSection.styles';

interface Props {
  className?: string;
}

export const ImageSection: FC<Props> = () => {
  return <StyledBgImage src={limage} />;
};
