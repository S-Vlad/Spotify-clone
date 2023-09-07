'use client';

import { Container } from '@mui/material';

import Navbar from '../components/navbar';
import Player from '@/components/player';

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '100px' }}>{children}</Container>
      <Player />
    </>
  );
};

type Props = {
  children: React.ReactNode;
};

export default MainLayout;
