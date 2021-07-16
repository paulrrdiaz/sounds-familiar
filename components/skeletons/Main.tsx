import { Container, Skeleton, SkeletonCircle, Box } from '@chakra-ui/react';

const Main = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={3}
        py={2}
        mb={8}
      >
        <Skeleton width="200px" height="40px" />
        <Box display="flex" alignItems="center">
          <SkeletonCircle mr={2} size="10" />
          <Skeleton width="100px" height="20px" />
        </Box>
      </Box>
      <Container>
        <Skeleton width="100%" height="40px" mb={8} />
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton
              key={`skeleton-${i + 1}`}
              mb={4}
              width="100%"
              height="60px"
            />
          ))}
      </Container>
    </>
  );
};

export default Main;
