import {
  Grid,
  Collapse,
  Text,
  Pagination,
  Tooltip,
  Spacer,
} from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { GetSurveysPaginated, Survey, SurveyStatus } from "../../types/survey";
import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../table/IconButton";
import { EyeIcon } from "../table/EyeIcon";
import { EditIcon } from "../table/EditIcon";
import { DeleteIcon } from "../table/DeleteIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HistoryTableMobile({
  surveys,
  pagesAvailable,
  totalItems,
}: {
  surveys: Survey[];
  pagesAvailable: number;
  totalItems: number;
}) {
  const [surveysState, setSurveysState] = useState(surveys);

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
  //   useEffect(() => {
  //     const execute = async () => {
  //       const res = await fetch(
  //         `http://localhost:3001/survey/getSurveysPaginated/1`
  //       );
  //       const { surveys, pagesAvailable, totalItems }: GetSurveysPaginated =
  //         await res.json();
  //       console.log(surveys);
  //       setSurveys(surveys);
  //     };
  //     execute();
  //   }, []);
  const handlePageChange = async (page: number) => {
    const res = await fetch(
      `http://localhost:3001/survey/getSurveysPaginated/${page}`
    );
    const { surveys, pagesAvailable, totalItems }: GetSurveysPaginated =
      await res.json();
    if (res.status != 500 || 400) {
      setSurveysState(surveys);
    }
  };
  return (
    <div className="flex flex-col mx-auto justify-center items-center mb-8">
      <ToastContainer />
      <div className="flex flex-col">
        <Collapse.Group splitted>
          {surveysState.map((survey) => (
            <Collapse
              title={
                <Text h4>
                  {survey.candidateFirstName + " " + survey.candidateLastName}
                </Text>
              }
              subtitle={survey.recipientEmail}
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Text h4>{survey.recruitment.recruitmentName}</Text>
                    <Text h4>{survey.recruitment.recruitmentId}</Text>
                  </div>
                  <StyledBadge type="FILLED">
                    {SurveyStatus[survey.surveyStatus]}
                  </StyledBadge>
                </div>
                <Spacer />
                <div className="flex ">
                  <Tooltip content="Details">
                    <IconButton
                      onClick={() => console.log("View user", survey._id)}
                    >
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
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
              </div>
            </Collapse>
          ))}
        </Collapse.Group>
      </div>
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
