import { FC } from 'react';

import { ImageSection } from '@/components/ImageSection';

import Star from '@/assets/images/svg/star.svg';

export const App: FC = () => (
  <div className="wrapper">
    <h1>Hi there!</h1>
    <ImageSection />
    <Star />
  </div>
);
