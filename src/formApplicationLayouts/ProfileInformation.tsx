import React, { useState } from "react";
import { Checkbox, Switch } from "@material-tailwind/react";
import Menu from "../components/Menu";
import { formApi } from "../services/apiFactory";

interface ProfileInfoProps {
  formPayload: any;
}

interface InfoActions {
  mandatory: boolean;
  show: boolean;
}

interface questionsPayload {
  type: string;
  slug: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

interface questionsType {
  id: number;
  type: string;
  slug: string;
}

interface personalQuestionsType {
  profilePayload: [];
}

const ProfileInfo = ({ formPayload }: ProfileInfoProps): any => {
  const [profilePayload, setProfilePayload] = useState<questionsPayload[]>([]);
  const [profileQuestions, setProfileQuestions] =
    useState<personalQuestionsType>({ profilePayload: [] });

  const [education, setEducationData] = useState<InfoActions>({
    mandatory: formPayload.attributes?.profile.education.mandatory,
    show: formPayload.attributes?.profile.education.show,
  });

  const [experience, setExperience] = useState<InfoActions>({
    mandatory: formPayload.attributes?.profile.experience.mandatory,
    show: formPayload.attributes?.profile.experience.show,
  });

  const [resume, setResume] = useState<InfoActions>({
    mandatory: formPayload.attributes?.profile.resume.mandatory,
    show: formPayload.attributes?.profile.resume.show,
  });

  const addQuestions = (): void => {
    setProfilePayload((prev) => [
      ...prev,
      {
        type: "",
        slug: "",
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
      slug: "Paragraph",
    },
    {
      id: 2,
      type: "Short answer",
      slug: "ShortAnswer",
    },
    {
      id: 3,
      type: "Yes/No",
      slug: "YesNo",
    },
    {
      id: 4,
      type: "Dropdown",
      slug: "Dropdown",
    },
    {
      id: 5,
      type: "Multiple choice",
      slug: "MultipleChoice",
    },
    {
      id: 6,
      type: "Date",
      slug: "Date",
    },
    {
      id: 7,
      type: "Number",
      slug: "Number",
    },
    {
      id: 8,
      type: "File upload",
      slug: "FileUpload",
    },
    {
      id: 9,
      type: "Video question",
      slug: "VideoQuestion",
    },
  ];

  const setQuestionType = (questionType: string, questionSlug: string) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, type: questionSlug, slug: questionType };
    });

    setProfilePayload(newState);
  };

  const handleQuestionText = (value: string) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, question: value };
    });
    setProfilePayload(newState);
  };

  const handleChoiceQuestion = (value: string, choiceToModifyIndex: number) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      const modifiedChoices = obj.choices.map(
        (choice: string, choiceIndex: number) => {
          if (choiceIndex === choiceToModifyIndex) {
            // If this is the choice to modify
            return value; // Modify the choice value
          }
          return choice; // Keep other choices unchanged
        }
      );
      return { ...obj, choices: modifiedChoices }; // Update the choices property
    });
    setProfilePayload(newState);
  };

  const increaseChoiceCount = (index: number) => {
    // Create a copy of the profilePayload array
    const newData = [...profilePayload];

    // Add a new choice to the array
    newData[index].choices.push("");

    // Update the state with the new data
    setProfilePayload(newData);
  };

  const handleEnableOption = (value: boolean) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, other: !value };
    });
    setProfilePayload(newState);
  };

  const handleMaxChoiceText = (value: string) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, maxChoice: Number(value) };
    });
    setProfilePayload(newState);
  };

  const handleDisqualifyOption = (value: boolean) => {
    const newState = profilePayload.map((obj: questionsPayload) => {
      return { ...obj, disqualify: !value };
    });
    setProfilePayload(newState);
  };

  const removeQuestion = () => {
    setProfilePayload([]);
  };

  const savePayload = () => {
    formPayload.attributes.profile.education.mandatory = education.mandatory;
    formPayload.attributes.profile.education.show = education.show;

    formPayload.attributes.profile.experience.mandatory = experience.mandatory;
    formPayload.attributes.profile.experience.show = experience.show;

    formPayload.attributes.profile.resume.mandatory = resume.mandatory;
    formPayload.attributes.profile.resume.show = resume.show;

    formPayload.attributes.profile.profileQuestions = profilePayload;

    /**
     * Payload to send to the backend
     */
    let payload = {
      data: formPayload,
    };
    formApi.pushFormSchema(payload);

    /** Display the Questions saved */
    setProfileQuestions((prevState: any) => ({
      ...prevState,
      profilePayload,
    }));

    setProfilePayload([]);
  };

  return (
    <div className="flex w-full flex-col rounded-lg shadow-md bg-monaicBlue">
      <div className="flex w-full justify-center p-4">
        <span className="text-lg font-semibold">Profile</span>
      </div>
      <div className="flex w-full flex-col bg-white p-3">
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Education</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Mandatory"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={education.mandatory}
                onChange={() =>
                  setEducationData({
                    mandatory: !education.mandatory,
                    show: education.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={education.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={education.show}
                onChange={() =>
                  setEducationData({
                    mandatory: education.mandatory,
                    show: !education.show,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full p-2 justify-between border-b-2 items-center self-stretch">
          <div className="flex flex-col flex-grow justify-center my-2">
            <div className="flex">
              <span className="text-sm font-semibold">Experience</span>
            </div>
          </div>
          <div className="flex justify-between items-center self-stretch my-2">
            <div className="flex flex-grow mr-4">
              <Checkbox
                label="Mandatory"
                crossOrigin={undefined}
                className="flex"
                color="green"
                checked={experience.mandatory}
                onChange={() =>
                  setExperience({
                    mandatory: !experience.mandatory,
                    show: experience.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={experience.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={experience.show}
                onChange={() =>
                  setExperience({
                    mandatory: experience.mandatory,
                    show: !experience.show,
                  })
                }
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
                checked={resume.mandatory}
                onChange={() =>
                  setResume({
                    mandatory: !resume.mandatory,
                    show: resume.show,
                  })
                }
              />
            </div>
            <div className="flex w-1/2">
              <Switch
                label={resume.show ? "Show" : "Hide"}
                crossOrigin={undefined}
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={resume.show}
                onChange={() =>
                  setExperience({
                    mandatory: resume.mandatory,
                    show: !resume.show,
                  })
                }
              />
            </div>
          </div>
        </div>

        {profileQuestions?.profilePayload.map((question: any) => (
          <div
            className="flex w-full flex-col bg-white py-3 px-1 mt-3"
            key={question.id}
          >
            <div className="w-full flex justify-between items-center self-stretch">
              <div className="flex flex-col flex-grow justify-center my-2">
                <div className="flex my-2 mx-1">
                  <span className="text-xs text-darkGrey">{question.type}</span>
                </div>
                <div className="flex mx-1">
                  <span className="text-base font-semibold">
                    {question.question}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-5">
                <img
                  src="./pencil.png"
                  alt="pencil"
                  style={{ width: "15px" }}
                />
              </div>
            </div>
          </div>
        ))}

        {/**
         * QUESTIONS BLOCK FOR PERSONALQUESTION
         */}
        {profilePayload.map((profileQuestion: any, profileIndex: number) => (
          <div
            className="flex w-full flex-col bg-white py-3 px-1 mt-3"
            key={profileIndex}
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
                        {profileQuestion?.slug}
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
                            setQuestionType(
                              questionType.type,
                              questionType.slug
                            )
                          }
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

            {profileQuestion?.type === "YesNo" && (
              <div className="flex flex-col flex-grow justify-center my-2 px-1">
                <div className="flex flex-grow mr-4">
                  <Checkbox
                    label="Disqualify candidate if the answer is no"
                    crossOrigin={undefined}
                    className="flex"
                    color="green"
                    checked={profileQuestion.other}
                    onChange={() =>
                      handleDisqualifyOption(profileQuestion.disqualify)
                    }
                  />
                </div>
              </div>
            )}

            {profileQuestion?.type === "MultipleChoice" ||
              (profileQuestion?.type === "Dropdown" && (
                <>
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
                                onChange={(e) =>
                                  handleChoiceQuestion(e.target.value, index)
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="flex flex-col mx-2 justify-center cursor-pointer"
                            onClick={() => increaseChoiceCount(profileIndex)}
                          >
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
                  <div className="flex flex-col flex-grow justify-center my-2 px-1">
                    <div className="flex flex-grow mr-4">
                      <Checkbox
                        label="Enable “Other” option"
                        crossOrigin={undefined}
                        className="flex"
                        color="green"
                        checked={profileQuestion.other}
                        onChange={() =>
                          handleEnableOption(profileQuestion.other)
                        }
                      />
                    </div>
                  </div>
                  {profileQuestion?.type === "MultipleChoice" && (
                    <div className="flex flex-col flex-grow justify-center my-2">
                      <div className="flex my-2">
                        <span className="text-sm font-semibold">
                          Max choice allowed
                        </span>
                      </div>
                      <div className="w-full flex p-1">
                        <div className="relative w-full">
                          <div className="flex w-full h-12 p-2 rounded-sm border-2 justify-between items-center">
                            <input
                              type="number"
                              value={profileQuestion.maxChoice}
                              placeholder="Type here"
                              className="text-sm w-full"
                              onChange={(e) =>
                                handleMaxChoiceText(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}

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

        {profilePayload.length === 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
