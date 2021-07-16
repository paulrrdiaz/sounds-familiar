import { useForm } from 'react-hook-form';
import { Button, useToast, Grid, GridItem, Box, Text } from '@chakra-ui/react';
import * as yup from 'yup';

import { useAppContext } from '@/context';
import { isNotEmpty } from '@/utils';
import yupValidations from '@/utils/yup';
import http from '@/utils/http';
import AppModal from '@/components/AppModal';
import AppAlert from '@/components/AppAlert';
import TextField from '@/components/controls/TextField';
import SwitchField from '@/components/controls/SwitchField';
import Link from '@/components/Link';
import useYupValidationResolver from '@/hooks/useYupValidationResolver';

const validationSchema = yup.object({
  name: yupValidations.validString('Playlist name is required'),
  isPublic: yup.boolean()
});

type FormValues = {
  name: string;
  isPublic: boolean;
};

const PlaylistsModal = () => {
  const { state, methods } = useAppContext();
  const toast = useToast();
  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    register,
    control,
    reset: resetForm,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver });
  const { playlists, user } = state;
  const { isOpen, track } = state.modals.playlists;
  const { changeModal, onFetchPlaylists } = methods;

  const closeModal = () => changeModal('playlists', { isOpen: false });

  const createNewPlaylist = async (values: FormValues) => {
    try {
      await http.post('playlists', {
        ...values,
        owner: user.id
      });

      // resetForm(defaultValues);

      onFetchPlaylists(user.id || '');

      toast({
        title: 'Playlist created',
        description: (
          <>
            Your{' '}
            <Box as="span" fontWeight="bold">
              {values.name}
            </Box>{' '}
            playlist is waiting for tracks
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'An error occurred',
        description: 'Something went wrong, try again later',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const addTrackToPlaylist = async (uid: string) => {
    try {
      await http.put(`playlists/${uid}`, { track });

      onFetchPlaylists(user.id || '');

      toast({
        title: 'Track added',
        description: (
          <>
            <Box as="span" fontWeight="bold">
              {track?.title}
            </Box>{' '}
            was added to the playlist
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppModal title="Add to a playlist" isOpen={isOpen} onClose={closeModal}>
      <Text fontWeight="bold" fontSize="lg">
        Pick one
      </Text>

      {isNotEmpty(playlists) ? (
        <Box display="flex" flexWrap="wrap" mb={4} mx={-1}>
          {playlists.map((playlist) => {
            const playlistURIs = playlist.tracks.map((t) => t.uri);

            return (
              <Button
                onClick={() => addTrackToPlaylist(playlist.uid)}
                colorScheme="purple"
                isDisabled={track && playlistURIs.includes(track.uri)}
                m={1}
                key={playlist.uid}
              >
                {playlist.name}
              </Button>
            );
          })}
        </Box>
      ) : (
        <AppAlert
          title="Looks like you don't have any playlist yet"
          content="Don't worry, you can do it now... 👇😎"
          mb={4}
        />
      )}

      <form onSubmit={handleSubmit(createNewPlaylist)}>
        <Text fontWeight="bold" fontSize="lg">
          Or create one
        </Text>
        <Grid gap={3}>
          <GridItem>
            <TextField
              id="name"
              label="Playlist name"
              placeholder="i.e. while coding"
              feedback={errors.name}
              {...register('name')}
            />
          </GridItem>
          <GridItem>
            <SwitchField
              id="isPublic"
              label="is it a private playlist?"
              {...{ control }}
            />
          </GridItem>
          <GridItem>
            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isSubmitting}
              isFullWidth
            >
              Create
            </Button>
          </GridItem>
        </Grid>
      </form>

      {/* FIXME */}
      <Box mt={4} textAlign="center" onClick={closeModal}>
        Want to manage your playlists?{' '}
        <Link href="/playlists">Go to Playlists</Link>
      </Box>
    </AppModal>
  );
};

export default PlaylistsModal;
