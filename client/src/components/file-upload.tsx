import React, { useRef } from 'react';

const FileUpload: React.FC<Props> = ({ acceptExtentions, children, setFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  return (
    <div onClick={() => inputRef.current?.click()}>
      <input onChange={handleChange} ref={inputRef} accept={acceptExtentions} type='file' style={{ display: 'none' }} />
      {children}
    </div>
  );
};

type Props = {
  acceptExtentions: string;
  children: React.ReactNode;
  setFile: Function;
};

export default FileUpload;
