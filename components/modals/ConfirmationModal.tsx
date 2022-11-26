import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
interface ConfirmationModalInterface {
  confirmationPrompt: string;
  buttonTitle: string;
  buttonType: "CANCEL" | "CONFIRM";
  error?: boolean;
  funct: () => any;
}
export default function ConfirmationModal({
  confirmationPrompt,
  buttonTitle,
  buttonType,
  error,
  funct,
}: ConfirmationModalInterface) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const submitHandler = async () => {
    try {
      await funct();
      closeHandler();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button
        auto
        color={buttonType === "CONFIRM" ? "success" : "warning"}
        className={`bg-${buttonType === "CONFIRM" ? "green" : "red"}-500`}
        shadow
        onClick={handler}
      >
        {buttonTitle}
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {confirmationPrompt}
          </Text>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        {error ? (
          <Modal.Footer className="flex items-center justify-center">
            <Button
              auto
              flat
              color="success"
              className="bg-green-500 text-white"
              onClick={closeHandler}
            >
              Okay
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer className="flex items-center justify-center">
            <Button
              auto
              flat
              color="warning"
              className="bg-red-500 text-white"
              onClick={closeHandler}
            >
              Cancel
            </Button>
            <Button
              auto
              color="success"
              className="bg-green-500"
              onClick={submitHandler}
            >
              Confirm
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}
