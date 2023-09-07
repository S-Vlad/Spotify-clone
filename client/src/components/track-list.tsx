import { Box, Grid } from '@mui/material';

import TrackItem from '@/components/track-item';
import { Track } from '@/types/tracks';

const TrackList: React.FC<Props> = ({ tracks }) => {
  if (!tracks) {
    return null;
  }

  return (
    <Grid container direction='column'>
      <Box p={2}>
        {tracks.map((item) => (
          <TrackItem data={item} key={item._id} />
        ))}
      </Box>
    </Grid>
  );
};

type Props = {
  tracks: Track[];
};

export default TrackList;
