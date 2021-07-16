import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

import { credentials } from '@/utils/spotify';

type Success = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

type Fail = {
  message: string;
  error: {};
};

type Data = Success | Fail;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { code } = req.body;
    const spotifyApi = new SpotifyWebApi(credentials);

    const data = await spotifyApi.authorizationCodeGrant(code);

    res.status(200).json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    });
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({
      error,
      message: 'Something went wrong!'
    });
  }
}
