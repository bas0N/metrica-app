import React, { useState } from "react";
import {
  Text,
  Input,
  Textarea,
  Button,
  FormElement,
  GridProps,
  Grid,
} from "@nextui-org/react";
import Select, { SelectProps } from "../input/Select";
import { Recruitment } from "../../types/recruitment";
import { SurveyStatus, SurveyType } from "../../types/survey";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SendFormToApplicant({
  recruitments,
}: {
  recruitments: Recruitment[];
}) {
  const [candidateFirstName, setCandidateFirstName] = useState<string>("");
  const [candidateLastName, setCandidateLastName] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFirstNameChange = (event: React.ChangeEvent<FormElement>) => {
    setCandidateFirstName(event.target.value);
  };
  const handlelastNameChange = (event: React.ChangeEvent<FormElement>) => {
    setCandidateLastName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<FormElement>) => {
    setRecipientEmail(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<FormElement>) => {
    setDescription(event.target.value);
  };
  const handleCancel = () => {
    setCandidateFirstName("");
    setCandidateLastName("");
    setRecipientEmail("");
    setDescription("");
    setOption("");
  };
  const handleOptionChange = (value: string) => {
    setOption(value);
  };
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/survey/createSurvey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "elam@gmail.com",
          addSurveyDto: {
            recipientEmail,
            candidateFirstName,
            candidateLastName,
            surveyStatus: SurveyStatus[1],
            recruitmentId: option,
            terminationDate: new Date("2023-10-10"),
          },
        }),
      });
      if (res.status === 500) {
        toast.error("Error occured while sending a form.", { theme: "dark" });
      } else {
        toast.success("Form sent successfully.", { theme: "dark" });
        const recruitment: any = await res.json();
        handleCancel();
      }
    } catch (err) {
      toast.error(JSON.stringify(err), { theme: "dark" });
    }
  };
  const selectReqruitmentData: SelectProps = {
    command: "Choose recruitment process",
    options: recruitments.map((recruitment: Recruitment) => {
      return { desc: recruitment.recruitmentName, value: recruitment._id };
    }),
  };
  return (
    <div className="py-4 px-10 h-full mt-16 max-w-[800px] w-full gap-10 mx-auto">
      <ToastContainer />

      <Text className="text-5xl  font-bold">Provide candidate details</Text>

      <Grid.Container className="grid grid-cols-2 mt-16 gap-10 w-full ">
        <Input
          value={candidateFirstName}
          onChange={handleFirstNameChange}
          clearable
          underlined
          labelPlaceholder="Firstname"
        />
        <Input
          value={candidateLastName}
          onChange={handlelastNameChange}
          clearable
          underlined
          labelPlaceholder="Lastname"
        />
        <Input
          value={recipientEmail}
          onChange={handleEmailChange}
          clearable
          underlined
          labelPlaceholder="Email"
        />

        <Select handler={handleOptionChange} {...selectReqruitmentData} />
      </Grid.Container>
      <div className="grid-cols-1 grid">
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          label="Description"
          helperText="Please enter the description of the reqriutment process"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          initialValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
      <div className="flex gap-4 mt-16">
        <Button
          onClick={handleCancel}
          shadow
          auto
          color="error"
          className="bg-red-500"
          href="/"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          shadow
          auto
          color="success"
          className="bg-green-500"
          href="/"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default SendFormToApplicant;
