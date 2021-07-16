import queryString from 'query-string';
import { Link, Button, Box } from '@chakra-ui/react';

import SimpleLayout from '@/components/layouts/Simple';
import Logo from '@/components/Logo';

const url = 'https://accounts.spotify.com/authorize';
const query = {
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  response_type: 'code',
  redirect_uri: process.env.NEXT_PUBLIC_BASE_URI,
  scope:
    'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'
};

const AUTH_URL = queryString.stringifyUrl({ url, query });

const Login = () => {
  return (
    <SimpleLayout centerContent>
      <Logo mb={8} />
      <Box textAlign="center">
        <Button colorScheme="purple" as={Link} href={AUTH_URL}>
          Log in with Spotify
        </Button>
      </Box>
    </SimpleLayout>
  );
};

export default Login;
