import { ReactNode } from 'react';
import { Container, Box } from '@chakra-ui/react';

type SimpleProps = {
  children: ReactNode;
  centerContent?: boolean;
};

const Simple = ({ children, ...props }: SimpleProps) => {
  return (
    <Container {...props}>
      <Box my={8}>{children}</Box>
    </Container>
  );
};

export default Simple;
