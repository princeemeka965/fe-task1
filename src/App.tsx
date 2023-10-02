import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import SideBar from "./layouts/SideBar";
import Header from "./layouts/Header";
import Dropzone from "./layouts/Dropzone";
import { formApi } from "./services/apiFactory";
import PersonalInfo from "./formApplicationLayouts/PersonalInfo";
import ProfileInfo from "./formApplicationLayouts/ProfileInformation";

function App() {
  const [image, setImages] = useState<string>("");
  const [formPayload, setPayload] = useState<any>({});

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

  useEffect(() => {
    async function getFormSchema() {
      const result = await formApi.getFormSchema();
      const formData = result.data.data;

      console.log(formData);

      setPayload(formData);
    }
    getFormSchema();
  }, []);

  return (
    <>
      {Object.keys(formPayload).length > 0 && (
        <div className="w-full h-full flex bg-white">
          <div style={{ height: "100vh", width: "3%" }}>
            <SideBar />
          </div>
          <div style={{ height: "100vh", width: "97%" }}>
            <div className="w-full h-16 flex">
              <Header />
            </div>
            <div className="w-full flex justify-between self-stretch px-5 mt-16 py-10">
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
                  <div className="flex w-full flex-col rounded-2xl shadow-md">
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
                    <div className="flex w-full flex-col bg-white rounded-2xl p-4">
                      <div
                        className="flex flex-row cursor-pointer"
                        onClick={() => setImages("")}
                      >
                        <img
                          src="./close.png"
                          style={{ width: "24px", height: "24px" }}
                          alt="close"
                        />
                        <div className="flex flex-col justify-center mx-2">
                          <span className="text-sm font-semibold text-wineRed">
                            Delete & re-upload
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/**
                 * PERSONAL INFORMATION BLOCK
                 */}
                <PersonalInfo formPayload={formPayload} />

                {/**
                 * PROFILE BLOCK
                 */}
                <ProfileInfo formPayload={formPayload} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
