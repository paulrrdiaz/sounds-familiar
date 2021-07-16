import { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

import Header from '@/components/Header';
import MainSkeleton from '@/components/skeletons/Main';
import { useAppContext } from '@/context';

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  const {
    state: { auth }
  } = useAppContext();

  console.log(auth.accessToken, 'auth.accessToken');

  return auth.accessToken ? (
    <>
      <Header />
      <Container maxW="container.xl" mb={8}>
        {children}
      </Container>
    </>
  ) : (
    <MainSkeleton />
  );
};

export default Main;
