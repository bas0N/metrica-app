import React from "react";
import {
  Row,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Spacer,
  Text,
  Link,
  FormElement,
  useInput,
} from "@nextui-org/react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { validateEmail } from "../../utils/validateEmail";
import { useRouter } from "next/router";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [email, setEmail] = useState({ isValid: false, value: "" });
  const [password, setPassword] = useState({ isValid: false, value: "" });

  const handleEmailChange = (e: ChangeEvent<FormElement>) => {
    if (validateEmail(e.target.value)) {
      setEmail({ isValid: true, value: e.target.value });
    } else {
      setEmail({ isValid: false, value: e.target.value });
    }
  };
  const handlePasswordChange = (e: ChangeEvent<FormElement>) => {
    if (e.target.value.length < 7) {
      setPassword({ isValid: false, value: e.target.value });
    } else {
      setPassword({ isValid: true, value: e.target.value });
    }
  };
  const handleLogin = () => {
    if (email.isValid && password.isValid) {
      const userData = {
        email: email.value,
        password: password.value,
      };
      dispatch(login(userData));
    } else {
      console.log("invalid data");
    }
  };
  useEffect(() => {
    if (isError) {
      alert("błąd!!");
    }
    if (isSuccess || user) {
      //redirect
      //close signup modal and open sign in modal
      router.push("/dashboard");
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, router, dispatch]);
  return (
    <div>
      <Button
        light
        className="text-white"
        flat
        as={Link}
        auto
        onClick={handler}
      >
        Sign in
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
            Sign in to
            <Text b size={18}>{`STACK MET`}</Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            placeholder="Email"
            aria-label="login"
            onChange={handleEmailChange}
            contentLeft={<AiOutlineMail fill="currentColor" />}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            onChange={handlePasswordChange}
            placeholder="Password"
            contentLeft={<RiLockPasswordLine fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox color="success">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={handleLogin}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignIn;
