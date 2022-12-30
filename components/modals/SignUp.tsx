import React, { useState } from "react";
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
  Progress,
  Dropdown,
  FormElement,
} from "@nextui-org/react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useRouter } from "next/router";
import { AppDispatch } from "../../app/store";
import { RegisterUserDto } from "../../features/auth/dto/registerUser.dto";
function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const [selected2, setSelected2] = useState<any>(new Set(["text"]));

  const selectedValue2 = React.useMemo(
    () => Array.from(selected2).join(", ").replaceAll("_", " "),
    [selected2]
  );
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setPassword({ value: "", valid: false });
    setPasswordRepeat({ value: "", valid: false });
    setEmail({ value: "", valid: false });

    console.log("closed");
  };
  const [selected, setSelected] = useState<any>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState({ value: "", valid: false });
  const [password, setPassword] = useState({ value: "", valid: false });
  const [passwordRepeat, setPasswordRepeat] = useState({
    value: "",
    valid: false,
  });

  useEffect(() => {
    let progressScore = 0;
    console.log("password: ", password.valid);
    console.log("passwordrepeat: ", passwordRepeat.valid);

    if (email.valid) {
      progressScore++;
    }
    if (password.valid) {
      progressScore++;
    }
    if (passwordRepeat.valid) {
      progressScore++;
    }
    setProgress((progressScore / 3) * 100);
  }, [email.valid, password.valid, passwordRepeat.valid]);
  //redux
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
  }, [user, isLoading, isError, isSuccess, message]);
  // const handleProgressChange = () => {
  //   let progressScore = 0;
  //   console.log("password: ", password.valid);
  //   console.log("passwordrepeat: ", passwordRepeat.valid);

  //   if (email.valid) {
  //     progressScore++;
  //   }
  //   if (password.valid) {
  //     progressScore++;
  //   }
  //   if (passwordRepeat.valid) {
  //     progressScore++;
  //   }
  //   setProgress((progressScore / 3) * 100);
  // };
  const handleEmailChange = (e: ChangeEvent<FormElement>) => {
    if (!validateEmail(e.target.value)) {
      setEmail({ valid: false, value: e.target.value });
    } else {
      setEmail({ valid: true, value: e.target.value });
    }
  };
  const handlePasswordChange = (e: ChangeEvent<FormElement>) => {
    if (e.target.value.length < 7) {
      setPassword({ valid: false, value: e.target.value });
      if (passwordRepeat.value === e.target.value) {
        passwordRepeat.valid = true;
      }
    } else {
      setPassword({ valid: true, value: e.target.value });
    }

    console.log(e.target.value);
  };
  const handlePasswordRepeatChange = (e: ChangeEvent<FormElement>) => {
    if (e.target.value !== password.value) {
      setPasswordRepeat({ valid: false, value: e.target.value });
    } else {
      setPasswordRepeat({ valid: true, value: e.target.value });
    }
    setTimeout(() => {}, 500);

    console.log(password);
  };
  const handleGeneralChange = (e: ChangeEvent<FormElement>) => {
    console.log(e);
  };
  const validateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };
  const handleSignUp = () => {
    if (email.valid && password.valid && passwordRepeat.valid) {
      const userData: RegisterUserDto = {
        email: email.value,
        password: password.value,
      };
      dispatch(register(userData));
    } else {
      console.log("invalid data");
    }
  };
  return (
    <div>
      <Button light color="success" flat as={Link} auto onClick={handler}>
        Sign up
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
            Sign up to
            <Text b size={18}>
              STACK MET
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {user}
          <Input
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            onChange={handleEmailChange}
            placeholder="Email"
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
          <Input.Password
            clearable
            bordered
            fullWidth
            color="success"
            size="lg"
            onChange={handlePasswordRepeatChange}
            placeholder="Password"
            contentLeft={<RiLockPasswordLine fill="currentColor" />}
          />

          <Progress color="success" value={progress} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={handleSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignUp;
