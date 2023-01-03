import {
  Button,
  Checkbox,
  Collapse,
  FormElement,
  Grid,
  Input,
  Radio,
  Spacer,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Recruitment } from "../../types/recruitment";
import { SurveyType } from "../../types/survey";
import ConfirmationModal from "../modals/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getClientAccessToken } from "../../utils/getClientAccessToken";
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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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
    console.log("inside components");
    console.log(recruitments);
    setIsMobile(Mobile());
    console.log("ismobile: ", Mobile());
  }, []);

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
        {recruitments.map((recruitment: Recruitment) => (
          <Collapse
            shadow
            className="col-span-2"
            title={recruitment.recruitmentName}
            subtitle={recruitment.recruitmentId}
          >
            <div>
              <Text>{recruitment.recruitmentDescription}</Text>

              <Text>{recruitment.surveyType}</Text>
              <Text>{recruitment.recruitmentDeadline.toLocaleString()}</Text>

              <div className="flex ">
                <Tooltip content="Delete user" color="error">
                  <IconButton>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Edit user">
                  <IconButton>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Collapse>
        ))}
      </Grid.Container>

      <Spacer y={1} />

      <div className="flex flex-col">
        <Spacer y={2} />
      </div>
      <Spacer y={2} />
      <Button
        className="bg-green-400/70 hover:bg-green-500/50"
        size="sm"
        onClick={() => {
          router.push("/dashboard/add-recruitment");
        }}
      >
        Add recruitment
      </Button>
    </div>
  );
}

export default AddApplication;
