import React, { FC } from 'react';
import { Header } from "./components";
import { MainLayoutProps } from "./MainLayout.props";

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {

  return (
    <div>
      <Header />
        {children}
    </div>
  );
};