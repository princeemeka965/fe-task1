import React, { useState } from "react";
import { Checkbox, Switch } from "@material-tailwind/react";
import Menu from "../components/Menu";
import { formApi } from "../services/apiFactory";

interface PersonalInfoProps {
  formPayload: any;
}

interface InfoActions {
  internalUse: boolean;
  show: boolean;
}

interface questionsPayload {
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

interface questionsType {
  id: number;
  type: string;
}

const PersonalInfo = ({ formPayload }: PersonalInfoProps): any => {
  const [profilePayload, setProfilePayload] = useState<questionsPayload[]>([]);

  const [phone, setPhoneData] = useState<InfoActions>({
    internalUse:
      formPayload.attributes?.personalInformation.phoneNumber.internalUse,
    show: formPayload.attributes?.personalInformation.phoneNumber.show,
  });

  const [nationality, setNationality] = useState<InfoActions>({
    internalUse:
      formPayload.attributes?.personalInformation.nationality.internalUse,
    show: formPayload.attributes?.personalInformation.nationality.show,
  });

  const [residence, setResidence] = useState<InfoActions>({
    internalUse:
      formPayload.attributes?.personalInformation.currentResidence.internalUse,
    show: formPayload.attributes?.personalInformation.currentResidence.show,
  });

  const [idNumber, setIdNumber] = useState<InfoActions>({
    internalUse:
      formPayload.attributes?.personalInformation.idNumber.internalUse,
    show: formPayload.attributes?.personalInformation.idNumber.show,
  });

  const [dateOfBirth, setDateOfBirth] = useState<InfoActions>({
    internalUse:
      formPayload.attributes?.personalInformation.dateOfBirth.internalUse,
    show: formPayload.attributes?.personalInformation.dateOfBirth.show,
  });

  const [gender, setGender] = useState<InfoActions>({
    internalUse: formPayload.attributes?.personalInformation.gender.internalUse,
    show: formPayload.attributes?.personalInformation.gender.show,
  });

  const addQuestions = (): void => {
    setProfilePayload((prev) => [
      ...prev,
      {
        type: "",
        question: "",
        choices: [""],
        maxChoice: 0,
        disqualify: false,
        other: false,
      },
    ]);
  };

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

  const setQuestionType = (questionType: string) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, type: questionType };
    });

    setProfilePayload(newState);
  };

  const handleQuestionText = (value: string) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, question: value };
    });
    setProfilePayload(newState);
  };

  const removeQuestion = () => {
    setProfilePayload([]);
  };

  const savePayload = () => {
    console.log(phone);
    formPayload.attributes.personalInformation.phoneNumber.internalUse =
      phone.internalUse;
    formPayload.attributes.personalInformation.phoneNumber.show = phone.show;
    formPayload.attributes.personalInformation.nationality.internalUse =
      nationality.internalUse;
    formPayload.attributes.personalInformation.nationality.show =
      nationality.show;
    formPayload.attributes.personalInformation.currentResidence.internalUse =
      residence.internalUse;
    formPayload.attributes.personalInformation.currentResidence.show =
      residence.show;
    formPayload.attributes.personalInformation.idNumber.internalUse =
      idNumber.internalUse;
    formPayload.attributes.personalInformation.idNumber.show = idNumber.show;
    formPayload.attributes.personalInformation.dateOfBirth.internalUse =
      dateOfBirth.internalUse;
    formPayload.attributes.personalInformation.dateOfBirth.show =
      dateOfBirth.show;
    formPayload.attributes.personalInformation.gender.internalUse =
      gender.internalUse;
    formPayload.attributes.personalInformation.gender.show = gender.show;

    formPayload.attributes.profile.profileQuestions = profilePayload;
    let payload = {
      data: formPayload,
    };
    formApi.pushFormSchema(payload);
  };

  return (
    <div className="flex w-full flex-col rounded-lg my-16 shadow-md bg-monaicBlue">
      <div className="flex w-full justify-center p-4">
        <span className="text-lg font-semibold">Personal Information</span>
      </div>
      <div className="flex w-full flex-col bg-white p-3">
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col justify-center my-2">
            <span className="text-sm font-semibold">First Name</span>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col justify-center my-2">
            <span className="text-sm font-semibold">Last Name</span>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col justify-center my-2">
            <span className="text-sm font-semibold">Email</span>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Phone</span>
              <span className="text-sm mx-1" style={{ paddingTop: 1 }}>
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
                checked={phone.internalUse}
                onChange={() =>
                  setPhoneData({
                    internalUse: !phone.internalUse,
                    show: phone.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={phone.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={phone.show}
                onChange={() =>
                  setPhoneData({
                    internalUse: phone.internalUse,
                    show: !phone.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Nationality</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Internal"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={nationality.internalUse}
                onChange={() =>
                  setNationality({
                    internalUse: !nationality.internalUse,
                    show: nationality.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={nationality.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={nationality.show}
                onChange={() =>
                  setNationality({
                    internalUse: nationality.internalUse,
                    show: !nationality.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Current Residence</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Internal"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={residence.internalUse}
                onChange={() =>
                  setResidence({
                    internalUse: !residence.internalUse,
                    show: residence.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={residence.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={residence.show}
                onChange={() =>
                  setResidence({
                    internalUse: residence.internalUse,
                    show: !residence.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">ID Number</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Internal"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={idNumber.internalUse}
                onChange={() =>
                  setIdNumber({
                    internalUse: !idNumber.internalUse,
                    show: idNumber.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={idNumber.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={idNumber.show}
                onChange={() =>
                  setIdNumber({
                    internalUse: idNumber.internalUse,
                    show: !idNumber.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Date of Birth</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Internal"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={dateOfBirth.internalUse}
                onChange={() =>
                  setDateOfBirth({
                    internalUse: !dateOfBirth.internalUse,
                    show: dateOfBirth.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={dateOfBirth.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={dateOfBirth.show}
                onChange={() =>
                  setDateOfBirth({
                    internalUse: dateOfBirth.internalUse,
                    show: !dateOfBirth.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Gender</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Internal"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={gender.internalUse}
                onChange={() =>
                  setGender({
                    internalUse: !gender.internalUse,
                    show: gender.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={gender.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={gender.show}
                onChange={() =>
                  setGender({
                    internalUse: gender.internalUse,
                    show: !gender.show,
                  })
                }
              />
            </div>
          </div>
        </div>

        {formPayload.attributes?.profile.profileQuestions.map(
          (question: any) => (
            <div
              className="flex w-full flex-col bg-white py-3 px-1 mt-3"
              key={question.id}
            >
              <div className="flex flex-col flex-grow justify-center my-2">
                <div className="flex my-2 mx-1">
                  <span className="text-xs text-darkGrey">{question.type}</span>
                </div>
              </div>
            </div>
          )
        )}

        {/**
         * QUESTIONS BLOCK FOR PROFILE
         */}
        {profilePayload.map((profileQuestion: any, index: number) => (
          <div
            className="flex w-full flex-col bg-white py-3 px-1 mt-3"
            key={index}
          >
            <div className="flex flex-col flex-grow justify-center my-2">
              <div className="flex my-2 mx-1">
                <span className="text-sm font-semibold">Type</span>
              </div>
              <div className="w-full flex p-1">
                <Menu>
                  <Menu.Title>
                    <div className="flex w-full h-12 p-2 rounded-sm border-2 justify-between items-center">
                      <span className="text-base text-darkBlue">
                        {profileQuestion?.type}
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
                          onClick={() => setQuestionType(questionType.type)}
                        >
                          <span className="text-base">{questionType.type}</span>
                        </div>
                      ))}
                    </div>
                  </Menu.Section>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col flex-grow justify-center my-2">
              <div className="flex my-2">
                <span className="text-sm font-semibold">Question</span>
              </div>
              <div className="w-full flex p-1">
                <div className="relative w-full">
                  <div className="flex w-full h-12 p-2 rounded-sm border-2 justify-between items-center">
                    <input
                      type="text"
                      value={profileQuestion.question}
                      placeholder="Type here"
                      className="text-sm w-full"
                      onChange={(e) => handleQuestionText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {profileQuestion?.type === "Multiple choice" && (
              <div className="flex flex-col flex-grow justify-center  my-1 px-4">
                <div className="flex my-2 mx-13">
                  <span className="text-sm">Choice</span>
                </div>
                {profileQuestion?.choices.map(
                  (choice: string, index: number) => (
                    <div className="w-full flex p-1">
                      <div className="flex flex-col mx-2 justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 10.5C3.2 10.5 2.5 11.2 2.5 12C2.5 12.8 3.2 13.5 4 13.5C4.8 13.5 5.5 12.8 5.5 12C5.5 11.2 4.8 10.5 4 10.5ZM4 5.5C3.2 5.5 2.5 6.2 2.5 7C2.5 7.8 3.2 8.5 4 8.5C4.8 8.5 5.5 7.8 5.5 7C5.5 6.2 4.8 5.5 4 5.5ZM4 15.5C3.2 15.5 2.5 16.2 2.5 17C2.5 17.8 3.2 18.5 4 18.5C4.8 18.5 5.5 17.8 5.5 17C5.5 16.2 4.8 15.5 4 15.5ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="relative w-full">
                        <div className="flex w-full h-12 p-2 rounded-sm border-2 justify-between items-center">
                          <input
                            type="text"
                            value={choice}
                            placeholder="Type here"
                            className="text-sm w-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col mx-2 justify-center">
                        <img
                          src="./add-icon.png"
                          style={{ width: "15px", height: "15px" }}
                          alt="add_icon"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="flex justify-between items-center self-stretch my-2">
              <div className="flex w-full flex-col bg-white rounded-2xl py-4 px-2">
                <div
                  className="flex flex-row cursor-pointer"
                  onClick={() => removeQuestion()}
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
              <div
                className="flex p-2 rounded-sm bg-greenBtn cursor-pointer"
                onClick={() => savePayload()}
              >
                <span className="text-white text-sm font-semibold">Save</span>
              </div>
            </div>
          </div>
        ))}

        <div
          className="flex my-4 p-2 cursor-pointer"
          onClick={() => addQuestions()}
        >
          <div className="flex flex-col justify-center">
            <img
              src="./add-icon.png"
              style={{ width: "15px", height: "15px" }}
              alt="add_icon"
            />
          </div>
          <div className="flex flex-col justify-center cursor-pointer">
            <span className="text-sm mx-4 font-semibold">Add a question</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
