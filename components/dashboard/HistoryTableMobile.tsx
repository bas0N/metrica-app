import {
  Grid,
  Collapse,
  Text,
  Pagination,
  Tooltip,
  Spacer,
  Modal,
  useModal,
  Button,
} from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { GetSurveysPaginated, Survey, SurveyStatus } from "../../types/survey";
import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../table/IconButton";
import { EyeIcon } from "../table/EyeIcon";
import { EditIcon } from "../table/EditIcon";
import { DeleteIcon } from "../table/DeleteIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getClientAccessToken } from "../../utils/getClientAccessToken";
import { useRouter } from "next/router";

function HistoryTableMobile({
  surveys,
  pagesAvailable,
  totalItems,
}: {
  surveys: Survey[];
  pagesAvailable: number;
  totalItems: number;
}) {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<any>({});
  const [surveysState, setSurveysState] = useState(surveys);
  const { setVisible, bindings } = useModal();

  const handleDelete = async (surveyId: string) => {
    console.log(surveyId);
    try {
      const res = await fetch(`http://localhost:3001/survey/${surveyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response: any = await res.json();
      //if success, delete form array
      if (res.status !== 500 || 404) {
        setSurveysState(
          surveysState.filter((survey) => survey._id !== surveyId)
        );
        toast.success("Survey deleted succesfully successfully.", {
          theme: "dark",
          position: "bottom-center",
        });
      } else {
        toast.error("Error occured while deleting a survey.", {
          theme: "dark",
          position: "bottom-center",
        });
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = async (page: number) => {
    //gets access token using client session
    const accessToken = await getClientAccessToken();

    const res = await fetch(
      `http://localhost:3001/survey/getSurveysPaginated/${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { surveys, pagesAvailable, totalItems }: GetSurveysPaginated =
      await res.json();
    if (res.status == 500 || res.status == 400 || res.status == 401) {
      setSurveysState([]);
    } else {
      setSurveysState(surveys);
    }
  };
  return (
    <div className="flex flex-col mx-auto justify-center items-center mb-8">
      <Modal
        scroll
        width="350px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Survey results
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <Text className="font-bold text-2xl">Technologies</Text>
            <div>
              {Array.isArray(userDetails.technologiesSurvey?.languages) ? (
                <div className="flex flex-col">
                  <Text className="font-bold">Languages</Text>

                  {userDetails.technologiesSurvey.languages.map(
                    (element: string) => (
                      <Text className="text-green-500">{element}</Text>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div>
              {Array.isArray(userDetails.technologiesSurvey?.frontend) ? (
                <div className="flex flex-col">
                  <Text className="font-bold">Frontend</Text>

                  {userDetails.technologiesSurvey.frontend.map(
                    (element: string) => (
                      <Text className="text-green-500">{element}</Text>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              {Array.isArray(userDetails.technologiesSurvey?.backend) ? (
                <div className="flex flex-col">
                  <Text className="font-bold">Backend</Text>

                  {userDetails.technologiesSurvey.backend.map(
                    (element: string) => (
                      <Text className="text-green-500">{element}</Text>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              {Array.isArray(userDetails.technologiesSurvey?.devops) ? (
                <div className="flex flex-col">
                  <Text className="font-bold">Devops</Text>

                  {userDetails.technologiesSurvey.devops.map(
                    (element: string) => (
                      <Text className="text-green-500">{element}</Text>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              {Array.isArray(userDetails.technologiesSurvey?.uxui) ? (
                <div className="flex flex-col">
                  <Text className="font-bold">UXUI</Text>

                  {userDetails.technologiesSurvey.uxui.map(
                    (element: string) => (
                      <Text className="text-green-500">{element}</Text>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <Text className="font-bold text-2xl">About Candidate</Text>
            <Text>Position: {userDetails.aboutYouSurvey?.position}</Text>
            <Text>
              Years of experience:
              {userDetails.aboutYouSurvey?.yearsOfExperience}
            </Text>
            <Text>Description: {userDetails.aboutYouSurvey?.description}</Text>
          </div>
          <div className="flex flex-col">
            <Text className="font-bold text-2xl">Personal Links</Text>
            <div className="flex flex-col w-screen-sm justify-between mt-5">
              <Button
                className="bg-green-400/70 my-2 hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.githubUrl}`}
              >
                Github
              </Button>
              <Button
                className="bg-green-400/70 my-2 hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.linkedinUrl}`}
              >
                Linkedin
              </Button>
              <Button
                className="bg-green-400/70 my-2  hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.repositoryUrl}`}
              >
                Repository
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mx-auto"
            auto
            flat
            color="error"
            onClick={() => setVisible(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div className="flex flex-col">
        <Collapse.Group splitted>
          {surveysState.map((survey: any) => (
            <Collapse
              className="w-[300px]"
              title={
                <Text h4 className="font-bold">
                  {survey.candidateFirstName + " " + survey.candidateLastName}
                </Text>
              }
              subtitle={survey.recipientEmail}
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Text h4>{survey.recruitment.recruitmentName}</Text>
                    <Text h4 className="text-gray-500">
                      {survey.recruitment._id}
                    </Text>
                  </div>
                </div>
                <Spacer />
                <div className="flex justify-between">
                  <div className="flex justify-between w-1/2">
                    <div
                      className={`${
                        SurveyStatus[survey.surveyStatus] == "FILLED"
                          ? "flex"
                          : "invisible"
                      }`}
                    >
                      <Tooltip content="Details">
                        <IconButton
                          onClick={() => {
                            console.log("View user", survey.id);
                            setVisible(true);
                            console.log(survey);
                            setUserDetails(survey.surveyData);
                          }}
                        >
                          <EyeIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </div>

                    <Tooltip content="Edit user">
                      <IconButton
                        onClick={() => console.log("Edit user", survey._id)}
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      content="Delete user"
                      color="error"
                      onClick={() => {
                        handleDelete(survey._id);
                      }}
                    >
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <StyledBadge
                    type={
                      SurveyStatus[survey.surveyStatus] as
                        | "FILLED"
                        | "PENDING"
                        | "DRAFT"
                    }
                  >
                    {SurveyStatus[survey.surveyStatus]}
                  </StyledBadge>
                </div>
              </div>
            </Collapse>
          ))}
        </Collapse.Group>
      </div>
      {surveys.length < 1 && (
        <div className="flex flex-col justify-center items-center mb-20 mt-10">
          <Text className="font-extrabold text-5xl">Oooops,</Text>
          <Text className=" text-2xl">No forms has been sent yet</Text>
          <Button
            onClick={() => {
              router.replace("/dashboard/send-form");
            }}
            className="mt-2 bg-green-500 hover:bg-green-600 w-[100px] h-[50px]"
          >
            Send form
          </Button>
        </div>
      )}
      <Pagination
        onChange={handlePageChange}
        className="self-center mt-6"
        shadow
        color="success"
        total={pagesAvailable}
      />
    </div>
  );
}

export default HistoryTableMobile;
