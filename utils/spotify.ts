import SpotifyWebApi from 'spotify-web-api-node';
import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/react';
import { get, remove } from 'local-storage';

export const credentials = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_BASE_URI
};

const storage = process.env.NEXT_PUBLIC_STORAGE as string;

export type AvatarType = {
  height: number | null;
  url: string;
  width: number | null;
};

export type MeType = {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  id: string;
  images: AvatarType[];
  product: string;
  type: string;
  uri: string;
};

// FIXME
export const spotifyHandleError = (error: any) => {
  console.log('Spotify • Error handle');

  console.log(error);

  if (!error) return;

  const toast = createStandaloneToast();
  const { status, message } = error.body.error;

  if (status === 401) {
    toast({
      title: 'An error occurred',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true
    });

    remove(storage);
    Router.push('/login');
  }
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
});

const auth: string = get(storage);

if (auth) {
  const parsedAuth = JSON.parse(auth);

  spotifyApi.setAccessToken(parsedAuth.accessToken);
}

export default spotifyApi;
