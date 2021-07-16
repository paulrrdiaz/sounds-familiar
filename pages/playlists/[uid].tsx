import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';

import { useAppContext } from '@/context';
import { normalizeByUID, isEmpty } from '@/utils';
import AppAlert from '@/components/AppAlert';
import MainLayout from '@/components/layouts/Main';
import PlaylistSkeleton from '@/components/skeletons/Playlist';
import TrackList from '@/components/TrackList';
import Player from '@/components/Player';
import Link from '@/components/Link';

const Playlist = () => {
  const router = useRouter();
  const { state } = useAppContext();
  const { playlists } = state;
  const uid = router.query.uid as string;
  const normalizedPlaylists = normalizeByUID(playlists);
  const playlist = uid && normalizedPlaylists[uid];

  return (
    <MainLayout>
      {isEmpty(playlist?.tracks) ? (
        <AppAlert
          title="Looks like you don't have any track yet"
          content={
            <>
              Please, go <Link href="/">Home</Link> and add some
            </>
          }
          mb={4}
        />
      ) : playlist ? (
        <Box>
          <Box textColor="purple.500" mb={4}>
            <Heading>{playlist.name} Playlist!</Heading>
          </Box>

          <TrackList tracks={playlist.tracks} />
          <Player />
        </Box>
      ) : (
        <PlaylistSkeleton />
      )}
    </MainLayout>
  );
};

export default Playlist;
