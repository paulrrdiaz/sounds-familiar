import { ReactNode } from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

type LinkProps = {
  children: ReactNode;
  href: string;
  width?: string;
  display?: string;
};

const Link = ({ children, width, display, ...rest }: LinkProps) => {
  return (
    <NextLink {...rest} passHref>
      <ChakraLink width={width} display={display} colorScheme="purple">
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
