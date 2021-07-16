import { useRouter } from 'next/router';
import { Box, GridItem, Text, Button, useToast } from '@chakra-ui/react';
import { IoMusicalNotes } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { PlaylistType } from '@/utils/interfaces';
import { useAppContext } from '@/context';

const PlaylistItem = (props: PlaylistType) => {
  const router = useRouter();
  const { methods } = useAppContext();
  const toast = useToast();
  const { onDeletePlaylist } = methods;
  const { name, tracks, followers, uid } = props;
  const tracksLength = tracks.length;
  const followersLength = followers.length;

  const onDelete = async () => {
    await onDeletePlaylist(uid);

    toast({
      title: 'Playlist deleted',
      description: (
        <>
          Your{' '}
          <Box as="span" fontWeight="bold">
            {name}
          </Box>{' '}
          playlist was deleted 😔
        </>
      ),
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  };

  return (
    <GridItem as={Box} px={3} py={2} bg="white" boxShadow="md" borderRadius={5}>
      <Box mb={4}>
        <Text
          colorScheme="purple"
          fontSize="xl"
          textShadow="0 0 #8b5cf6"
          fontWeight="thin"
          mb={2}
        >
          {name}
        </Text>
        <Text display="flex" alignItems="center">
          <Box as={IoMusicalNotes} color="purple.500" mr={2} />
          Has{' '}
          {!tracksLength
            ? 'no tracks'
            : `${tracksLength} track${tracksLength < 2 ? '' : 's'}`}
        </Text>
        <Text display="flex" alignItems="center">
          <Box as={FaUsers} color="purple.500" mr={2} />
          Has{' '}
          {!followersLength
            ? 'no followers'
            : `${followersLength} follower${followersLength < 2 ? '' : 's'}`}
        </Text>
      </Box>
      <Box>
        <Button
          borderRadius="50%"
          p={2}
          mr={2}
          onClick={() => {
            router.push(`/playlists/${uid}`);
          }}
        >
          <AiFillEdit />
        </Button>
        <Button p={2} borderRadius="50%" onClick={onDelete}>
          <AiFillDelete />
        </Button>
      </Box>
    </GridItem>
  );
};

export default PlaylistItem;
