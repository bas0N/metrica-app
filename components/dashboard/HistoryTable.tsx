import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import {
  GetSurveysPaginated,
  PositionSeniority,
  Survey,
  SurveyDataToRender,
  SurveyStatus,
} from "../../types/survey";
import { getClientAccessToken } from "../../utils/getClientAccessToken";
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
  const router = useRouter();
  const { query } = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [userDetails, setUserDetails] = useState<any>({});
  //surveys to be rendered
  const [surveysState, setSurveysState] = useState(surveys);
  //dropdown
  const [selected, setSelected] = React.useState<any>(new Set(["text"]));

  const searchOptionsArray = [
    "recipientEmail",
    "candidateLastName",
    "_id",
  ] as const;
  type searchOptions = typeof searchOptionsArray[number];
  const isSearchOptions = (x: any): x is searchOptions =>
    searchOptionsArray.includes(x);
  const [selectedSearchOption, setSelectedSearchOption] = useState<
    Set<searchOptions>
  >(new Set<searchOptions>(["recipientEmail"]));

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

  const removeQueryParam = (param: string) => {
    const { pathname, query }: { pathname: any; query: any } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
  };
  useEffect(() => {
    //get url query params
    const searchValue = router.query["search"];
    const searchOption = router.query["searchBy"];

    if (isSearchOptions(searchOption)) {
      setSelectedSearchOption(new Set([searchOption]));
    } else {
      removeQueryParam("searchBy");
    }
    if (typeof searchValue == "string") {
      setSearchValue(searchValue);
      const newSurveys = surveysState.filter((survey: Survey) => {
        const setIter = selectedSearchOption.values();
        const outcome: searchOptions = setIter.next().value;
        return survey[outcome].toLocaleLowerCase().includes(searchValue);
      });
      setSurveysState(newSurveys);
    }
  }, []);
  const handleInputSearchText = (event: any) => {
    setSearchValue(event.target.value);
    //set parmas
    router.push(
      { query: { ...query, search: event.target.value } },
      undefined,
      {
        shallow: true,
      }
    );
    if (event.target.value.length == 0) {
      setSurveysState(surveys);
    } else {
      console.log(selectedSearchOption, event.target.value);
      const newSurveys = surveysState.filter((survey: Survey) => {
        const setIter = selectedSearchOption.values();
        const outcome: searchOptions = setIter.next().value;
        return survey[outcome].toLocaleLowerCase().includes(event.target.value);
      });
      console.log(newSurveys);

      setSurveysState(newSurveys);
    }
  };
  const handleSearchParam = (event: any) => {
    router.push({ query: { ...query, searchBy: event.anchorKey } }, undefined, {
      shallow: true,
    });
    setSelectedSearchOption(new Set([event.anchorKey]));
  };
  const surveysDataToRender = surveysState?.map((survey) => {
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
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageChange = async (page: number) => {
    console.log();
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
                <IconButton
                  onClick={() => {
                    console.log("Edit user", survey.id);
                    router.push(
                      `http://localhost:3002/form/start-form/${survey.id}`
                    );
                  }}
                >
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
              {Array.isArray(userDetails.technologiesSurvey?.languages) &&
              userDetails.technologiesSurvey?.languages.length != 0 ? (
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
              {Array.isArray(userDetails.technologiesSurvey?.frontend) &&
              userDetails.technologiesSurvey?.frontend.length != 0 ? (
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
              {Array.isArray(userDetails.technologiesSurvey?.backend) &&
              userDetails.technologiesSurvey?.backend.length != 0 ? (
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
              {Array.isArray(userDetails.technologiesSurvey?.devops) &&
              userDetails.technologiesSurvey?.devops.length != 0 ? (
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
              {Array.isArray(userDetails.technologiesSurvey?.uxui) &&
              userDetails.technologiesSurvey?.uxui.length != 0 ? (
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
            <Text>
              Position:{" "}
              {PositionSeniority[userDetails.aboutYouSurvey?.position]}
            </Text>
            <Text>
              Years of experience:{" "}
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
                onClick={() => {
                  router.push(userDetails.personalLinksSurvey?.githubUrl);
                }}
              >
                Github
              </Button>
              <Button
                className="bg-green-400/70 hover:bg-green-500/50"
                size="sm"
                onClick={() => {
                  router.push(userDetails.personalLinksSurvey?.linkedinUrl);
                }}
              >
                Linkedin
              </Button>
              <Button
                className="bg-green-400/70 hover:bg-green-500/50"
                size="sm"
                onClick={() => {
                  router.push(userDetails.personalLinksSurvey?.repositoryUrl);
                }}
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
              Search
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedSearchOption}
              onSelectionChange={handleSearchParam}
            >
              <Dropdown.Item key="recipientEmail">Email</Dropdown.Item>
              <Dropdown.Item key="candidateLastName">LastName</Dropdown.Item>

              <Dropdown.Item key="_id">Recruitment Id</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Input
          value={searchValue}
          onChange={handleInputSearchText}
          className="col-end-6"
          size="lg"
          placeholder="Search"
        />
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
        {surveys?.length < 1 ? (
          <Table.Body>{}</Table.Body>
        ) : (
          <Table.Body items={surveysDataToRender}>
            {(item) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        )}
      </Table>
      {surveys?.length < 1 && (
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
