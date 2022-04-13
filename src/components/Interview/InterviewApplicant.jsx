import React, { useState, useEffect } from "react";
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
  useToast,
  Select,
} from "@chakra-ui/react";
import { API } from "../Variables";
import { useParams } from "react-router-dom";
import axios from "axios";
function InterviewApplicant() {
  const toast = useToast();
  const { id } = useParams();
  const [dataSet, setDataSet] = useState("");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/user/${id}`)
      .then((res) => {
        let myArr = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isInterviewScheduled === true)
            myArr.push(res.data[i]);
        }
        setArr(myArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setDataSet(value);
  };
  const handleClick = (id) => {
    toast({
      title: "Status Updated !!!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    if (dataSet === "hired") {
      axios
        .patch(`${API}/user/${id}`, { isHired: true })
        .then((res) => {
          setArr(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (dataSet === "rejected") {
      axios
        .delete(`${API}/user/${id}`)
        .then((res) => {
          console.log("delete", res.data);
          setArr(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <Container maxW="container.xl" mt="10">
      <Heading>Interview Applicant</Heading>
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
              <Th color="white">Name</Th>
              <Th color="white">Gender</Th>
              <Th color="white">Qualification</Th>
              <Th color="white">Experience</Th>
              <Th color="white">Interview Info</Th>
              <Th color="white">Status</Th>
              <Th color="white"></Th>
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
                  >
                    <Td>{i + 1}</Td>
                    <Td>{e.firstName + " " + e.lastName}</Td>
                    <Td>{e.gender}</Td>
                    <Td>{e.qualification}</Td>
                    <Td>{e.experience}</Td>
                    <Td>{e.interviewDateTime}</Td>
                    <Td>
                      <Select
                        onChange={(e) => handleChange(e)}
                        // value={e.isHired ? "hired" : "rejected"}
                        placeholder="Select option"
                        w="90%"
                      >
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </Select>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleClick(e._id)}
                      >
                        {e.isHired ? "Hired" : "Done"}
                      </Button>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default InterviewApplicant;
