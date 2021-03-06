import type { NextApiRequest, NextApiResponse } from 'next';

import Playlist from '@/models/Playlist';
import { TrackType } from '@/utils/interfaces';
import dbConnect from '@/utils/mongodb';

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const { id } = req.query;
        const { track, remove = false } = req.body;

        const playlist = await Playlist.findById(id);
        const tracks = remove
          ? playlist.tracks.filter((t: TrackType) => t.uri !== track.uri)
          : [...playlist.tracks, track];

        await Playlist.findByIdAndUpdate(id, {
          tracks
        });

        const playlists = await Playlist.find({ owner: playlist.owner });

        res.status(200).json({ success: true, playlists });
      } catch (error) {
        console.error(error, 'error');
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;

        // Save this for a moment
        const playlist = await Playlist.findById(id);

        // Delete playlist
        await Playlist.findByIdAndDelete(id);

        // Update list with deleted playlist
        const playlists = await Playlist.find({ owner: playlist.owner });

        res.status(200).json({ success: true, playlists });
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
