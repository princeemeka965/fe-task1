import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }: any) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div
      {...getRootProps()}
      className={isDragActive ? "bg-gray-100 w-full h-full" : "w-full h-full"}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className="flex flex-col justify-center py-16">
        <div className="flex items-center w-full justify-center">
          <img src="./uploadIcon.png" style={{ width: "33px" }} alt="upload" />
        </div>
        {isDragActive ? (
          <div className="flex my-6 w-full justify-center">
            <span className="text-sm text-darkGrey">
              Release to drop the files here
            </span>
          </div>
        ) : (
          <>
            <div className="flex my-3 w-full justify-center">
              <span className="text-sm font-semibold">Upload cover image</span>
            </div>
            <div className="flex my-3 w-full justify-center">
              <span className="text-sm text-darkGrey">
                16:9 ratio is recommended. Max image size 1mb
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
