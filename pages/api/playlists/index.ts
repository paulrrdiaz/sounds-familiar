import type { NextApiRequest, NextApiResponse } from 'next';

import Playlist from '@/models/Playlist';
import dbConnect from '@/utils/mongodb';

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { owner } = req.query;
        const playlists = await Playlist.find({ owner });

        res.status(200).json({ playlists });
      } catch (error) {
        console.error(error, 'error');
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const { owner, name, isPublic } = req.body;
        const playlist = new Playlist({
          owner,
          name,
          isPublic
        });

        await playlist.save();

        res.status(200).json({ playlist });
      } catch (error) {
        console.error(error, 'error');
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
