import { Grid, useBreakpointValue } from '@chakra-ui/react';

import PlaylistItem from '@/components/PlaylistItem';
import AppAlert from '@/components/AppAlert';
import { useAppContext } from '@/context';
import { isNotEmpty } from '@/utils';
import Link from './Link';

const PlaylistList = () => {
  const columns = useBreakpointValue({ base: '1', sm: '2', md: '3', lg: '4' });
  const { state } = useAppContext();
  const { playlists } = state;

  return isNotEmpty(playlists) ? (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.uid} {...playlist} />
      ))}
    </Grid>
  ) : (
    <AppAlert
      title="Looks like you don't have any playlist yet"
      content={
        <>
          Please, go <Link href="/">Home</Link> and add some
        </>
      }
      mb={4}
    />
  );
};

export default PlaylistList;
