import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  Text,
  Button,
  Pagination,
  Dropdown,
  Input,
  Modal,
  useModal,
} from "@nextui-org/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../../components/table/IconButton";
import { EyeIcon } from "../../components/table/EyeIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { DeleteIcon } from "../../components/table/DeleteIcon";
import { AnyARecord } from "dns";
import {
  GetSurveysPaginated,
  Survey,
  SurveyDataToRender,
  SurveyStatus,
} from "../../types/survey";
function HistoryTable({
  surveys,
  pagesAvailable,
  totalItems,
}: {
  surveys: Survey[];
  pagesAvailable: number;
  totalItems: number;
}) {
  const { setVisible, bindings } = useModal();

  const [userDetails, setUserDetails] = useState<any>({});
  const [surveysState, setSurveysState] = useState(surveys);
  //dropdown
  const [selected, setSelected] = React.useState<any>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "POSITION", uid: "position" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const surveysDataToRender = surveysState.map((survey) => {
    return {
      id: survey._id,
      name: `${survey.candidateFirstName} ${survey.candidateLastName}`,
      position: survey.recruitment.recruitmentName,
      recruitmentId: survey.recruitment.recruitmentId,
      status: SurveyStatus[survey.surveyStatus],
      details: survey.surveyData || {},
      age: "24",
      deadline: survey.recruitment.recruitmentDeadline,
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: survey.recipientEmail,
    };
  });
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
        });
      } else {
        toast.error("Error occured while deleting a survey.", {
          theme: "dark",
        });
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
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

  const renderCell = (survey: any, columnKey: any) => {
    const cellValue = survey[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div>
            <h3 className="font-bold">{survey.name}</h3>
            <Text b size={13} css={{ color: "$accents7" }}>
              {survey.email}
            </Text>
          </div>
        );
      case "position":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {survey.id}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return (
          <Col>
            <StyledBadge type={survey.status}>{cellValue}</StyledBadge>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {survey.deadline}
              </Text>
            </Row>
          </Col>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col
              className={`${survey.status == "FILLED" ? "flex" : "invisible"}`}
            >
              <Tooltip content="Details">
                <IconButton
                  onClick={() => {
                    console.log("View user", survey.id);
                    setVisible(true);
                    setUserDetails(survey.details);
                  }}
                >
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", survey.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => {
                  handleDelete(survey.id);
                }}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div className="flex flex-col">
      <Modal
        scroll
        width="600px"
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
            <div className="flex w-screen-sm justify-between mt-5">
              <Button
                className="bg-green-400/70 hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.githubUrl}`}
              >
                Github
              </Button>
              <Button
                className="bg-green-400/70 hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.linkedinUrl}`}
              >
                Linkedin
              </Button>
              <Button
                className="bg-green-400/70 hover:bg-green-500/50"
                size="sm"
                href={`${userDetails.personalLinksSurvey?.repositoryUrl}`}
              >
                Repository
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div className=" m-4 grid grid-cols-2 gap-3">
        <div className="grid grid-cols-3 gap-1">
          <Dropdown>
            <Dropdown.Button
              className="bg-green-500/50 "
              flat
              color="success"
              css={{ tt: "capitalize" }}
            >
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">Text</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button
              className="bg-green-500/50 "
              flat
              color="success"
              css={{ tt: "capitalize" }}
            >
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">Text</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button
              className="bg-green-500/50 "
              flat
              color="success"
              css={{ tt: "capitalize" }}
            >
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">Text</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Input className="col-end-6" size="lg" placeholder="Search" />
      </div>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={surveysDataToRender}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-3">
        <Button className="bg-green-500 mx-1 hover:bg-green-600">
          Action1
        </Button>
        <Button className="bg-green-500 mx-1 hover:bg-green-600">
          Action2
        </Button>
        <Button className="bg-green-500 mx-1 hover:bg-green-600">
          Action3
        </Button>
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

export default HistoryTable;
/*
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
  ];
  */
