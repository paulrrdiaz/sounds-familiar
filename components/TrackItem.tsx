import { useRouter } from 'next/router';
import { Avatar, Text, Box } from '@chakra-ui/react';
import { HiPlay, HiPlusCircle } from 'react-icons/hi';

import { useAppContext } from '@/context';
import { TrackType } from '@/utils/interfaces';

const TrackItem = (props: TrackType) => {
  const router = useRouter();
  const { uid } = router.query;
  const { artist, title, uri, picture, ...rest } = props;
  const {
    state: { currentTrack },
    methods: { onSelectTrack, changeModal, onUpdateTrackFromPlaylist }
  } = useAppContext();
  const isPlaying = currentTrack === uri;

  return (
    <Box
      bg={isPlaying ? 'purple.100' : 'white'}
      scale="1.1"
      py={2}
      px={3}
      transition="background-color .3s linear 0s"
      borderRadius={5}
      boxShadow="md"
      display="flex"
      alignItems="center"
      {...rest}
    >
      <Avatar size="lg" mr={4} src={picture} />
      <Box flex={1} lineHeight="5">
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text>{artist}</Text>
      </Box>
      <Box ml={4}>
        <Box
          onClick={() => {
            onSelectTrack(uri);
          }}
          color="purple.500"
          cursor="pointer"
          as={HiPlay}
          fontSize="4xl"
        />
        {uid ? (
          <Box
            onClick={() => {
              onUpdateTrackFromPlaylist(
                uid,
                { artist, title, uri, picture },
                true
              );
            }}
            transform="rotate(45deg)"
            cursor="pointer"
            color="purple.500"
            as={HiPlusCircle}
            fontSize="4xl"
          />
        ) : (
          <Box
            onClick={() => {
              changeModal('playlists', {
                isOpen: true,
                track: { artist, title, uri, picture }
              });
            }}
            cursor="pointer"
            color="purple.500"
            as={HiPlusCircle}
            fontSize="4xl"
          />
        )}
      </Box>
    </Box>
  );
};

export default TrackItem;
