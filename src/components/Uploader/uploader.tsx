import React, { useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import "./uploader.css"

interface UploaderProps {
  onFileChange: (file: File) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onFileChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No selected file");

  return (
    <main>
     <form className= "uploader-form" onClick={() => (document.querySelector(".input-field") as HTMLElement)?.click()}>
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            if (files && files[0]) {
              setFileName(files[0].name);
              onFileChange(files[0]);
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />

        {image ? (
          <img src={image} width={300} height={300} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={200} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>

      <section className="uploaded-roww">
        <AiFillFileImage color="#1475cf" />
        <span className="upload-contentt">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected File");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
};

export default Uploader;
