import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';
import { useToast, Spinner } from '@chakra-ui/react';

import TextField from '@/components/controls/TextField';
import { isEmpty } from '@/utils';
import spotifyApi, { spotifyHandleError } from '@/utils/spotify';

type TrackSearchBoxProps = {
  setTracks: ([]) => void;
};

const TrackSearchBox = ({ setTracks }: TrackSearchBoxProps) => {
  const router = useRouter();
  const toast = useToast();
  const [term, setTerm] = useState('');
  const [isFetching, setFetching] = useState(false);

  const searchByTerm = (value: string) => setTerm(value);

  const searchByTermDebounced = useDebouncedCallback(searchByTerm, 500);

  const fetchTracks = useCallback(
    async (term: string) => {
      setFetching(true);

      try {
        const response = await spotifyApi.searchTracks(term);
        const items = response.body.tracks?.items.map((item) => {
          const {
            name,
            album: { images },
            artists,
            uri,
            id
          } = item;

          return {
            artist: artists[0].name,
            title: name,
            uri,
            id,
            picture: images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }, images[0]).url
          };
        });

        setTracks(items);
      } catch (error) {
        spotifyHandleError(error);
      } finally {
        setFetching(false);
      }
    },
    [router, toast]
  );

  useEffect(() => {
    if (isEmpty(term)) return setTracks([]);

    fetchTracks(term);
  }, [term, fetchTracks]);

  return (
    <TextField
      id="search"
      label="Searching song/album"
      onChange={(e) => {
        searchByTermDebounced(e.target.value);
      }}
      rightElement={isFetching && <Spinner color="purple" />}
    />
  );
};

export default TrackSearchBox;
