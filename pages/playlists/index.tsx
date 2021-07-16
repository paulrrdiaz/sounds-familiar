import { Heading, Box } from '@chakra-ui/react';

import MainLayout from '@/components/layouts/Main';
import PlaylistList from '@/components/PlaylistList';

const Playlists = () => {
  return (
    <MainLayout>
      <Box textColor="purple.500" mb={4}>
        <Heading>Your Playlists!</Heading>
      </Box>
      <PlaylistList />
    </MainLayout>
  );
};

export default Playlists;
