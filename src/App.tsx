import React, { useCallback, useState } from "react";
import "./App.css";
import SideBar from "./layouts/SideBar";
import Header from "./layouts/Header";
import Dropzone from "./layouts/Dropzone";
import { Checkbox } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";

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
      <div style={{ height: "100vh", width: "97%" }}>
        <div className="w-full h-16 flex">
          <Header />
        </div>
        <div className="w-full flex px-5 mt-16 py-10">
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
            <div className="flex w-full flex-col rounded-lg my-16 shadow-md bg-monaicBlue">
              <div className="flex w-full justify-center p-4">
                <span className="text-lg font-semibold">
                  Personal Information
                </span>
              </div>
              <div className="flex w-full flex-col bg-white p-3">
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col justify-center my-2">
                    <span className="text-base font-semibold">First Name</span>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col justify-center my-2">
                    <span className="text-base font-semibold">Last Name</span>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col justify-center my-2">
                    <span className="text-base font-semibold">Email</span>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">Phone</span>
                      <span className="text-sm mx-1" style={{ paddingTop: 5 }}>
                        (without dial code)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">
                        Nationality
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">
                        Current Residence
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">ID Number</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">
                        Date of Birth
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">Gender</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Internal"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        ripple={false}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex my-4 p-2 cursor-pointer">
                  <div className="flex flex-col justify-center">
                    <img
                      src="./add-icon.png"
                      style={{ width: "15px", height: "15px" }}
                      alt="add_icon"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm mx-4 font-semibold">
                      Add a question
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/**
             * PROFILE BLOCK
             */}
            <div className="flex w-full flex-col rounded-lg shadow-md bg-monaicBlue">
              <div className="flex w-full justify-center p-4">
                <span className="text-lg font-semibold">Profile</span>
              </div>
              <div className="flex w-full flex-col bg-white p-3">
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">Education</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Mandatory"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">
                        Experience
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Mandatory"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full p-2 justify-between items-center self-stretch">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex">
                      <span className="text-base font-semibold">Resume</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-2">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Mandatory"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label="Hide"
                        crossOrigin={undefined}
                        color="green"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex my-4 p-2 cursor-pointer">
                  <div className="flex flex-col justify-center">
                    <img
                      src="./add-icon.png"
                      style={{ width: "15px", height: "15px" }}
                      alt="add_icon"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm mx-4 font-semibold">
                      Add a question
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
