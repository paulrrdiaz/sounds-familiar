import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

import { credentials } from '@/utils/spotify';

type Data = {
  accessToken: string;
  expiresIn: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { refreshToken } = req.body;
    const spotifyApi = new SpotifyWebApi({ ...credentials, refreshToken });

    const data = await spotifyApi.refreshAccessToken();

    res.status(200).json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  } catch (error) {
    console.log(error, 'error');
    res.status(400);
  }
}
