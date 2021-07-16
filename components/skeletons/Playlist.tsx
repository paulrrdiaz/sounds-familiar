import { Skeleton } from '@chakra-ui/react';

const Playlist = () => {
  return (
    <>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <Skeleton
            key={`skeleton-${i + 1}`}
            mb={4}
            width="100%"
            height="60px"
          />
        ))}
    </>
  );
};

export default Playlist;
