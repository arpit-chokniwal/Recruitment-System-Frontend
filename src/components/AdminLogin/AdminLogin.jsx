import React, { useState } from "react";
import {
  Container,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Flex,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../Variables";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../../Redux/Logger/action";

function AdminLogin() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/admin`, userData)
      .then((res) => {
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        dispatch(isLogin(res.data));
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container maxW="md">
      <Heading>Admin Login</Heading>
      <Flex
        justify="center"
        align="center"
        direction="column"
        textAlign="center"
        borderColor="gray.200"
        borderRadius="10px"
        overflow={"hidden"}
        marginTop="50"
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
      >
        <FormControl w="100%" borderRadius="lg" p={"3"} cursor="pointer" mt={5}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={onChangeInput}
            autoComplete={"off"}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            onChange={onChangeInput}
            type="password"
            placeholder="Enter password"
          />
          <Button
            w="100%"
            mt={4}
            colorScheme="blue"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
        </FormControl>
      </Flex>
    </Container>
  );
}

export default AdminLogin;
