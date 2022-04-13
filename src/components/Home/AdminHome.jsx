import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../Variables";
import { useSelector } from "react-redux";

function AdminHome() {
  const Navigate = useNavigate();
  const isLoginObj = useSelector((store) => store.isLogin.isLogin);
  const handleClick = () => {
    Navigate("/add-job");
  };

  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/job/${isLoginObj.user._id}`)
      .then((res) => {
        setArr(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleTableClick = (id) => {
    Navigate(`/all-applicant/${id}`);
  };
  return (
    <>
      <Heading>Admin Home</Heading>
      <Flex justify="right" pr={10}>
        <Button colorScheme="blue" onClick={handleClick}>
          Add Job
        </Button>
      </Flex>
      <Container maxW="container.xl" mt="10">
        <TableContainer
          border="1px"
          borderRadius="10px"
          marginTop="50"
          borderColor="gray.200"
          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        >
          <Table variant="simple">
            <Thead>
              <Tr bgColor="#2490fe">
                <Th color="white">Sr.No</Th>
                <Th color="white">Title</Th>
                <Th color="white">City</Th>
                <Th color="white">Experience</Th>
                <Th color="white">Date Of Post</Th>
              </Tr>
            </Thead>
            <Tbody>
              {arr.length > 0
                ? arr.map((e, i) => (
                    <Tr
                      key={e._id}
                      _hover={{
                        bgColor: "#f7f9fb",
                        cursor: "pointer",
                      }}
                      onClick={() => handleTableClick(e._id)}
                    >
                      <Td>{i + 1}</Td>
                      <Td>{e.jobTitle}</Td>
                      <Td>{e.city}</Td>
                      <Td>{e.experience}</Td>
                      <Td>{e.dateOfPost}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default AdminHome;
