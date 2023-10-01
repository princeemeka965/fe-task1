import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import SideBar from "./layouts/SideBar";
import Header from "./layouts/Header";
import Dropzone from "./layouts/Dropzone";
import { Checkbox } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import { formApi } from "./services/apiFactory";
import Menu from "./components/Menu";

interface questionsType {
  id: number;
  type: string;
}

function App() {
  const [image, setImages] = useState<string>("");
  const [formPayload, setPayload] = useState<any>({});
  const [showQuestionsBlock, setQuestionsBlock] = useState<boolean>(false);
  const [selectedType, setQuestionType] = useState<string>("");

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

  const addQuestions = (type: string): void => {
    setQuestionsBlock(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    async function getFormSchema() {
      const result = await formApi.getFormSchema();
      const formData = result.data.data;
      /**
       * EMPTY Personal Questions Array, Profile Questions Array, Customised Questions Array
       */
      formData.attributes.personalInformation.personalQuestions = [];
      formData.attributes.profile.profileQuestions = [];
      formData.attributes.customisedQuestions = [];

      setPayload(formData);
    }
    getFormSchema();
  }, []);

  let questionsType: questionsType[] = [
    {
      id: 1,
      type: "Paragraph",
    },
    {
      id: 2,
      type: "Short answer",
    },
    {
      id: 3,
      type: "Yes/No",
    },
    {
      id: 4,
      type: "Dropdown",
    },
    {
      id: 5,
      type: "Multiple choice",
    },
    {
      id: 6,
      type: "Date",
    },
    {
      id: 7,
      type: "Number",
    },
    {
      id: 8,
      type: "File upload",
    },
    {
      id: 9,
      type: "Video question",
    },
  ];

  return (
    <div className="w-full h-full flex bg-white">
      <div style={{ height: "100vh", width: "3%" }}>
        <SideBar />
      </div>
      <div style={{ height: "100vh", width: "97%" }}>
        <div className="w-full h-16 flex">
          <Header />
        </div>
        <div className="w-full flex justify-center self-stretch px-5 mt-16 py-10">
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
                        checked={
                          formPayload.attributes?.personalInformation
                            .phoneNumber.internalUse
                        }
                        color="green"
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation
                            .phoneNumber.show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation
                            .phoneNumber.show
                        }
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
                        checked={
                          formPayload.attributes?.personalInformation
                            .nationality.internalUse
                        }
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation
                            .nationality.show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation
                            .nationality.show
                        }
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
                        checked={
                          formPayload.attributes?.personalInformation
                            .currentResidence.internalUse
                        }
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation
                            .currentResidence.show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation
                            .currentResidence.show
                        }
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
                        checked={
                          formPayload.attributes?.personalInformation.idNumber
                            .internalUse
                        }
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation.idNumber
                            .show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation.idNumber
                            .show
                        }
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
                        checked={
                          formPayload.attributes?.personalInformation
                            .dateOfBirth.internalUse
                        }
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation
                            .dateOfBirth.show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation
                            .dateOfBirth.show
                        }
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
                        checked={
                          formPayload.attributes?.personalInformation.gender
                            .internalUse
                        }
                      />
                    </div>
                    <div className="flex w-1/2">
                      <Switch
                        label={
                          formPayload.attributes?.personalInformation.gender
                            .show
                            ? "Show"
                            : "Hide"
                        }
                        crossOrigin={undefined}
                        ripple={false}
                        color="green"
                        checked={
                          formPayload.attributes?.personalInformation.gender
                            .show
                        }
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
                  <div className="flex flex-col justify-center cursor-pointer">
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
                  <div
                    className="flex flex-col justify-center cursor-pointer"
                    onClick={() => addQuestions("profile")}
                  >
                    <span className="text-sm mx-4 font-semibold">
                      Add a question
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/***
           * QUESTIONS BLOCK
           */}
          {showQuestionsBlock && (
            <div className="w-1/3 h-full p-5 flex flex-col">
              <div className="flex w-full flex-col rounded-lg shadow-md bg-monaicBlue">
                <div className="flex w-full p-4">
                  <span className="text-lg font-semibold mx-1">Questions</span>
                </div>
                <div className="flex w-full flex-col bg-white py-3 px-6">
                  <div className="flex flex-col flex-grow justify-center my-2">
                    <div className="flex my-2">
                      <span className="text-base font-semibold">Type</span>
                    </div>
                    <div className="w-1/3 flex p-1">
                      <Menu>
                        <Menu.Title>
                          <div className="flex w-96 h-10 p-2 rounded-sm border justify-between items-center">
                            <span className="text-base text-darkBlue">
                              {selectedType}
                            </span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="9"
                                viewBox="0 0 12 9"
                                fill="none"
                              >
                                <path
                                  d="M0 0.172363L5.79652 0.160333L11.593 0.148303L5.80507 8.32049L0 0.172363Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </div>
                        </Menu.Title>
                        <Menu.Section>
                          <div className="flex w-full flex-col rounded-sm bg-white items-start">
                            {questionsType.map((questionType) => (
                              <div
                                className="flex w-full p-3 cursor-pointer hover:bg-purple hover:text-white"
                                key={questionType.id}
                                onClick={() =>
                                  setQuestionType(questionType.type)
                                }
                              >
                                <span className="text-base">
                                  {questionType.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Menu.Section>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
