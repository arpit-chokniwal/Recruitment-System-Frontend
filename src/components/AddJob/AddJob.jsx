import React, { useState } from "react";
import {
  Container,
  Spacer,
  Button,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../Variables";
import { useSelector } from "react-redux";

function AddJob() {
  const toast = useToast();
  const isLoginObj = useSelector((store) => store.isLogin.isLogin);
  console.log(isLoginObj);
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    companyName: "",
    city: "",
    jobTitle: "",
    jobDescription: "",
    experience: "",
    salary: "",
    companyImageUrl: "",
    dateOfPost: "",
    adminSchemaId: isLoginObj.user._id,
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    axios
      .post(`${API}/job`, userData)
      .then((res) => {
        toast({
          title: "Added Successfull !!!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container maxW="container.sm">
      <Heading>Add Job</Heading>
      <FormControl
        w="100%"
        p={"3"}
        cursor="pointer"
        mt={5}
        borderColor="gray.200"
        borderRadius="10px"
        overflow={"hidden"}
        marginTop="50"
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
      >
        <Flex justify="space-between" flexWrap="wrap" gap="5">
          <Flex
            justify="space-between"
            align="left"
            direction="column"
            textAlign="center"
          >
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <Input
              type="text"
              id="companyName"
              placeholder="Enter company name"
              onChange={(e) => onChangeInput(e)}
              autoComplete={"off"}
            />
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              type="text"
              onChange={(e) => onChangeInput(e)}
              placeholder="Enter city"
            />
            <FormLabel htmlFor="companyImageUrl">Image</FormLabel>
            <Input
              id="companyImageUrl"
              onChange={(e) => onChangeInput(e)}
              type="text"
              placeholder="Paste image url"
            />
            <FormLabel htmlFor="dateOfPost">Date Of Post</FormLabel>
            <Input
              id="dateOfPost"
              onChange={(e) => onChangeInput(e)}
              type="date"
            />
          </Flex>
          <Spacer />
          <Flex
            justify="space-between"
            align="left"
            direction="column"
            textAlign="center"
          >
            <FormLabel htmlFor="jobTitle">Title</FormLabel>
            <Input
              id="jobTitle"
              onChange={(e) => onChangeInput(e)}
              type="text"
              placeholder="Enter title"
            />
            <FormLabel htmlFor="jobDescription">Description</FormLabel>
            <Textarea
              id="jobDescription"
              onChange={(e) => onChangeInput(e)}
              placeholder="Enter description"
            />
            <FormLabel htmlFor="experience">Experience (in Years)</FormLabel>
            <Select
              id="experience"
              onChange={(e) => onChangeInput(e)}
              placeholder="Select experience"
            >
              <option value="0-1">0 to 1</option>
              <option value="1-5">1 to 5</option>
              <option value="moreThan5">More than 5</option>
            </Select>
            <FormLabel htmlFor="salary">Salary (in LPA)</FormLabel>
            <Input
              id="salary"
              onChange={(e) => onChangeInput(e)}
              type="number"
              placeholder="Enter salary"
            />
          </Flex>
        </Flex>
        <Button
          w="100%"
          mt={4}
          colorScheme="blue"
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Submit
        </Button>
      </FormControl>
    </Container>
  );
}

export default AddJob;
