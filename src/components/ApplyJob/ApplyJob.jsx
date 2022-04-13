import React, { useState } from "react";
import {
  Container,
  Button,
  Text,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../Variables";
import axios from "axios";

function ApplyJob() {
  const { id } = useParams();
  const toast = useToast();
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddress: "",
    landMark: "",
    city: "",
    state: "",
    gender: "",
    pincode: "",
    email: "",
    mobile: "",
    experience: "",
    resume: "",
    qualification: "",
    jobSchemaId: id,
    isShortListed: false,
    isInterviewScheduled: false,
    interviewDateTime: "",
    isHired: false,
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData, API);
    axios
      .post(`${API}/user`, userData)
      .then((res) => {
        console.log(userData);
        toast({
          title: "Applied Successfull !!!",
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
        console.log(e.message);
      });
  };

  return (
    <>
      <Heading>Apply For Job</Heading>
      <Container
        maxW="container.sm"
        borderColor="gray.200"
        borderRadius="10px"
        overflow={"hidden"}
        marginTop="50"
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Personal Details</Tab>
            <Tab>Professional Details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl w="100%" borderRadius="lg" cursor="pointer">
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                  required
                />
                <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                <Input
                  type="text"
                  id="middleName"
                  placeholder="Enter middle name"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Select gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </Select>
                <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
                <Input
                  onChange={(e) => onChangeInput(e)}
                  id="streetAddress"
                  type="text"
                  placeholder="Enter street address"
                />
                <FormLabel htmlFor="landMark">Landmark</FormLabel>
                <Input
                  id="landMark"
                  onChange={(e) => onChangeInput(e)}
                  type="text"
                  placeholder="Enter landmark"
                />
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  onChange={(e) => onChangeInput(e)}
                  type="text"
                  placeholder="Enter city"
                />
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  id="state"
                  onChange={(e) => onChangeInput(e)}
                  type="text"
                  placeholder="Enter state"
                />
                <FormLabel htmlFor="pincode">Pincode</FormLabel>
                <Input
                  id="pincode"
                  onChange={(e) => onChangeInput(e)}
                  type="text"
                  placeholder="Enter pincode"
                />
                <Text align="left">ⓘ Note: Fill the Professional Details.</Text>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl w="100%" borderRadius="lg" cursor="pointer">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter  email"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <FormLabel htmlFor="mobile">Mobile</FormLabel>
                <Input
                  type="number"
                  id="mobile"
                  placeholder="Enter mobile"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <FormLabel htmlFor="experience">
                  Experience (in Years)
                </FormLabel>
                <Select
                  id="experience"
                  onChange={(e) => onChangeInput(e)}
                  placeholder="Select experience"
                >
                  <option value="0-1">0 to 1</option>
                  <option value="1-5">1 to 5</option>
                  <option value="moreThan5">More than 5</option>
                </Select>
                <FormLabel htmlFor="resume">Resume</FormLabel>
                {/* <Input
                  id="resume"
                  onChange={(e) => onChangeInput(e)}
                  type="file"
                /> */}
                <Input
                  type="text"
                  id="resume"
                  placeholder="paste resume url"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <FormLabel htmlFor="qualification">Qualification</FormLabel>
                <Input
                  type="text"
                  id="qualification"
                  placeholder="Enter qualification"
                  onChange={(e) => onChangeInput(e)}
                  autoComplete={"off"}
                />
                <Button
                  onClick={(e) => handleSubmit(e)}
                  w="100%"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

export default ApplyJob;
