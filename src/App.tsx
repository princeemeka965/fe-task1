import React, { useCallback, useState } from "react";
import "./App.css";
import SideBar from "./layouts/SideBar";
import Header from "./layouts/Header";
import Dropzone from "./layouts/Dropzone";

function App() {
  const [image, setImages] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file: File) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e: ProgressEvent<FileReader>) {
        // add the image into the state.
        setImages(e.target!.result as string);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <div className="w-full h-full flex bg-white">
      <div style={{ height: "100vh", width: "3%" }}>
        <SideBar />
      </div>
      <div className="pt-16" style={{ height: "100vh", width: "97%" }}>
        <div className="w-full h-16 flex">
          <Header />
        </div>
        <div className="w-full flex p-5 mt-10">
          <div className="w-2/5 p-5 flex flex-col overflow-auto mr-3">
            {/**
             * UPLOAD COVER IMAGE
             */}
            {image === "" ? (
              <div className="flex w-full flex-col rounded-lg shadow-md bg-monaicBlue">
                <div className="flex w-full justify-center p-4">
                  <span className="text-lg font-semibold">
                    Upload Cover Image
                  </span>
                </div>
                <div className="flex w-full flex-col bg-white p-3">
                  <div className="w-full flex rounded-sm justify-center border border-dashed h-full">
                    <Dropzone onDrop={onDrop} accept={"image/*"} />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex w-full flex-col shadow-md"
                style={{ borderRadius: "20px 20px 0px 0px" }}
              >
                <div className="flex w-full justify-center">
                  <img
                    src={image}
                    alt={`img-${image}`}
                    className="object-cover w-full"
                    style={{
                      borderRadius: "20px 20px 0px 0px",
                      height: "320px",
                    }}
                  />
                </div>
                <div className="flex w-full flex-col bg-white p-3"></div>
              </div>
            )}

            {/**
             * PERSONAL INFORMATION BLOCK
             */}
            <div className="flex w-full flex-col rounded-lg my-16 shadow-md bg-monaicBlue">
              <div className="flex w-full justify-center p-4">
                <span className="text-lg font-semibold">
                  Personal Information
                </span>
              </div>
              <div className="flex w-full flex-col bg-white p-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
