import { useState } from 'react';

import MainLayout from '@/components/layouts/Main';
import TrackSearchBox from '@/components/TrackSearchBox';
import TrackList from '@/components/TrackList';
import Player from '@/components/Player';
import { TrackType } from '@/utils/interfaces';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);

  return (
    <MainLayout>
      <TrackSearchBox setTracks={setTracks} />
      <TrackList tracks={tracks} />
      <Player />
    </MainLayout>
  );
}
