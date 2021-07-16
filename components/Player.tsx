import { useState, useEffect } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { Box } from '@chakra-ui/react';

import { useAppContext } from '@/context';

const Player = () => {
  const [play, setPlay] = useState(false);
  const {
    state: { auth, currentTrack }
  } = useAppContext();

  useEffect(() => {
    setPlay(true);
  }, [currentTrack]);

  return (
    <Box position="fixed" bottom={0} left={5} right={5}>
      {auth.accessToken && (
        <SpotifyWebPlayer
          styles={{ bgColor: '#f9f9f9' }}
          token={auth.accessToken}
          uris={currentTrack ? [currentTrack] : []}
          play={play}
          callback={(state) => {
            if (!state.isPlaying) {
              setPlay(false);
            }
          }}
        />
      )}
    </Box>
  );
};

export default Player;
