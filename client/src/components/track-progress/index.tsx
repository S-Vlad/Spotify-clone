import React from 'react';

const TrackProgress: React.FC<Props> = ({ maxProgress, onChange, progress }) => {
  return (
    <div style={{ display: 'flex' }}>
      <input type='range' min={0} max={maxProgress} value={progress} onChange={onChange} />
      <div>
        {Math.floor(progress)} / {Math.floor(maxProgress)}
      </div>
    </div>
  );
};

type Props = {
  maxProgress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  progress: number;
};

export default TrackProgress;
