import React from 'react';
import { DesertProvider } from '../assets/data/desert';
import Menu from './Pages/Menu';

const MainMenu = () => {
  return (
    <DesertProvider>
      <Menu />
    </DesertProvider>
  );
};

export default MainMenu;
