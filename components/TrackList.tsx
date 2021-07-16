import { Box } from '@chakra-ui/react';

import TrackItem from '@/components/TrackItem';
import { TrackType } from '@/utils/interfaces';

const TrackList = ({ tracks }: { tracks: TrackType[] }) => {
  return (
    <Box position="relative">
      <Box
        bgGradient="linear(to-t, transparent, #f9f9f9)"
        position="absolute"
        w="100%"
        h="15px"
        top={0}
        zIndex={2}
      />
      <Box h="55vh" mt={4} overflowY="auto">
        {tracks.map((track) => (
          <TrackItem key={track.uri} my={3} {...track} />
        ))}
      </Box>
      <Box
        bgGradient="linear(to-t, #f9f9f9, transparent)"
        position="absolute"
        w="100%"
        h="10px"
        bottom={0}
      />
    </Box>
  );
};

export default TrackList;
