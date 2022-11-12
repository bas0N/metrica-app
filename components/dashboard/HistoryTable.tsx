import React from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Button,
  Grid,
  Pagination,
} from "@nextui-org/react";
import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../../components/table/IconButton";
import { EyeIcon } from "../../components/table/EyeIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { DeleteIcon } from "../../components/table/DeleteIcon";
import { AnyARecord } from "dns";
import { Survey, SurveyStatus } from "../../types/survey";
function HistoryTable({ surveys }: { surveys: Survey[] }) {
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "POSITION", uid: "position" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
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
  const surveysDataToRender = surveys.map((survey) => {
    return {
      id: survey._id,
      name: `${survey.candidateFirstName} ${survey.candidateLastName}`,
      position: survey.recruitment.recruitmentName,
      team: survey.recruitment.recruitmentId,
      status: SurveyStatus[survey.surveyStatus],
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
      console.log(response);
    } catch (err) {
      console.log(err);
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
                {survey.team}
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
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", survey.id)}>
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
        className="self-center mt-6"
        shadow
        color="success"
        total={10}
      />
    </div>
  );
}

export default HistoryTable;
