import {
  Badge,
  Button,
  Checkbox,
  Collapse,
  FormElement,
  Grid,
  Input,
  Radio,
  Spacer,
  Table,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Recruitment } from "../../types/recruitment";
import { PositionSeniority, SurveyType } from "../../types/survey";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "../table/IconButton";
import { DeleteIcon } from "../table/DeleteIcon";
import { EditIcon } from "../table/EditIcon";
import { useRouter } from "next/router";
const initialValues = {
  recruitmentId: "",
  recruitmentName: "",
  recruitmentDescription: "",
  recruitmentDeadline: "",
};
function AddApplication({ recruitments }: { recruitments: Recruitment[] }) {
  const [values, setValues] = useState(initialValues);
  const [checked, setChecked] = useState<string>(SurveyType[0]);
  const [isEditedId, setIsEditedId] = useState("");
  //for edit
  const [currentlyEditedName, setCurrentlyEditedName] = useState("");
  const [currentlyEditedId, setCurrentlyEditedId] = useState("");
  const [currentlyEditedDescription, setCurrentlyEditedDescription] =
    useState("");

  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const columns = [
    {
      key: "category",
      labell: "CATEGORY",
    },
    {
      key: "value",
      labell: "VALUE",
    },
    {
      key: "seniority",
      labell: "SENIORITY",
    },
    {
      key: "deadline",
      labell: "DEADLINE",
    },
  ];
  const rows = [
    {
      key: "1",
      category: "Surveys send",
      value: "4",
      seniority: "SENIOR",
      deadline:
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getFullYear(),
    },
    {
      key: "2",
      category: "Surveys responded",
      value: "3",
      seniority: "MID",
      deadline:
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getFullYear(),
    },
    {
      key: "3",
      category: "Jane Fisher",
      value: "Senior Developer",
      seniority: "JUNIOR",
      deadline:
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getFullYear(),
    },
  ];
  const Mobile = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    setIsMobile(Mobile());
    console.log("ismobile: ", Mobile());
  }, []);

  const handleEdit = (id: string, recruitment: Recruitment) => {
    if (isEditedId == id) {
      setIsEditedId("");
      return;
    }
    setIsEditedId(id);

    setCurrentlyEditedName(recruitment.recruitmentName);
    setCurrentlyEditedDescription(recruitment.recruitmentDescription);
    setCurrentlyEditedId(recruitment.recruitmentId);
  };

  const handleSave = async () => {
    console.log({
      name: currentlyEditedName,
      id: currentlyEditedId,
      description: currentlyEditedDescription,
    });
    if (
      currentlyEditedName.length == 0 ||
      currentlyEditedId.length == 0 ||
      currentlyEditedDescription.length == 0
    ) {
      toast.error("Error while saving recruitment.", { theme: "dark" });
      return;
    }
    //request to postman saving edits
    const res = await fetch(
      `http://localhost:3001/recruitment/editRecruitment`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recruitmenDbtId: isEditedId,
          recruitmentInternalId: currentlyEditedId,
          recruitmentName: currentlyEditedName,
          recruitmentDescription: currentlyEditedDescription,
        }),
      }
    );
    if (res.status == 200) {
      toast.success("Recruitment edit saved succesfully", { theme: "dark" });
    }
    const resJSON = await res.json();
    console.log(resJSON);
    //refresh
    handleCancel();
    // setIsEditedId("");
    setTimeout(() => {
      router.reload();
    }, 2000);
  };
  const handleCancel = async () => {
    setIsEditedId("");
    setCurrentlyEditedName("");
    setCurrentlyEditedId("");
    setCurrentlyEditedDescription("");
  };

  const handleNameChange = async (event: any) => {
    setCurrentlyEditedName(event.target.value);
  };
  const handleIdChange = async (event: any) => {
    setCurrentlyEditedId(event.target.value);
  };
  const handleDescriptionChange = async (event: any) => {
    setCurrentlyEditedDescription(event.target.value);
  };

  return (
    <div className="py-4 px-10 min-h-screen max-w-[800px] gap-10 mx-auto">
      <ToastContainer />
      <Grid.Container className="grid sm:grid-cols-2 mt-8 gap-10 w-full ">
        <Text className="text-4xl sm:text-5xl sm:col-span-2  font-bold">
          All recruitments
        </Text>
        <Text className="col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Text>
        <Input
          className=" col-start-2 col-end-2"
          size="lg"
          placeholder="Search"
        />
        <Button
          className="bg-green-400/70 hover:bg-green-500/50 h-full"
          size="sm"
          onClick={() => {
            router.push("/dashboard/add-recruitment");
          }}
        >
          Add recruitment
        </Button>
        <Collapse.Group splitted className="col-span-2">
          {recruitments.map((recruitment: Recruitment, index) => (
            <Collapse
              key={recruitment._id}
              shadow
              className="col-span-2"
              title={recruitment.recruitmentName}
              subtitle={recruitment.recruitmentId}
            >
              <div className="flex flex-col items-stretch ml-3">
                <Badge
                  className={isEditedId != recruitment._id ? `invisible` : ""}
                  color="success"
                >
                  Edit mode
                </Badge>
                <Spacer y={1} />

                <div className=" grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex flex-col p-3 ">
                      <Text>Recruitment name:</Text>
                      <Input
                        aria-label=" "
                        clearable={isEditedId == recruitment._id}
                        readOnly={isEditedId != recruitment._id}
                        placeholder="Read only"
                        bordered
                        onChange={handleNameChange}
                        value={
                          isEditedId == recruitment._id
                            ? currentlyEditedName
                            : recruitment.recruitmentName
                        }
                      />
                    </div>

                    <div className="flex flex-col p-3 ">
                      <Text>Recruitment id:</Text>

                      <Input
                        clearable={isEditedId == recruitment._id}
                        readOnly={isEditedId != recruitment._id}
                        placeholder="Read only"
                        bordered
                        onChange={handleIdChange}
                        value={
                          isEditedId == recruitment._id
                            ? currentlyEditedId
                            : recruitment.recruitmentId
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-3">
                    <Text>Description</Text>

                    <Textarea
                      readOnly={isEditedId != recruitment._id}
                      placeholder="Read only"
                      bordered
                      onChange={handleDescriptionChange}
                      value={
                        isEditedId == recruitment._id
                          ? currentlyEditedDescription
                          : recruitment.recruitmentDescription
                      }
                    />
                  </div>
                </div>

                <Spacer y={1} />

                <div className="flex gap-2">
                  <Text> Position seniority:</Text>
                  <Text className="font-bold">
                    {PositionSeniority[recruitment.surveyType]}
                  </Text>
                </div>
                <div className="flex gap-2">
                  <Text> Recruitment deadline:</Text>
                  <Text className="font-bold">
                    {recruitment.recruitmentDeadline.toLocaleString()}
                  </Text>
                </div>
                <Spacer y={2} />
                <Text className="font-bold text-3xl mb-5">STATS</Text>
                <Table
                  lined
                  headerLined
                  aria-label="Example table with dynamic content"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column key={column.key}>
                        {column.labell}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body items={rows}>
                    {(item: any) => (
                      <Table.Row key={item.key}>
                        {(columnKey) => (
                          <Table.Cell>{item[columnKey]}</Table.Cell>
                        )}
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>

                <Spacer y={1} />

                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Tooltip content="Delete user" color="error">
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    {isEditedId != recruitment._id && (
                      <Tooltip content="Edit user">
                        <IconButton
                          onClick={() => {
                            handleEdit(recruitment._id, recruitment);
                          }}
                        >
                          <EditIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                  <div
                    className={`flex gap-2 ${
                      isEditedId != recruitment._id ? "invisible" : ""
                    }`}
                  >
                    <Button
                      className={`bg-red-500 hover:bg-red-500/50 h-full `}
                      size="sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={`bg-green-400/70 hover:bg-green-500/50 h-full ${
                        isEditedId != recruitment._id ? "invisible" : ""
                      }`}
                      size="sm"
                      onClick={handleSave}
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </Collapse>
          ))}
        </Collapse.Group>
      </Grid.Container>

      <Spacer y={1} />

      <div className="flex flex-col">
        <Spacer y={2} />
      </div>
      <Spacer y={2} />
    </div>
  );
}

export default AddApplication;
