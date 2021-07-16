import { IoHeadsetSharp } from 'react-icons/io5';
import { Text, Box } from '@chakra-ui/react';

type LogoProps = {
  mb?: number;
  variant?: string;
};

const Logo = ({ variant, ...rest }: LogoProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...rest}>
      <Box as={IoHeadsetSharp} fontSize="6xl" mr={2} />
      <Text
        fontWeight="light"
        fontSize="2xl"
        lineHeight="5"
        letterSpacing="widest"
        borderLeft="1px"
        borderColor={variant ? '#fff' : 'purple'}
        pl={3}
        textShadow={`0 0 ${variant ? '#fff' : '#8b5cf6'}`}
      >
        SOUNDS <br /> FAMILIAR
      </Text>
    </Box>
  );
};

export default Logo;
