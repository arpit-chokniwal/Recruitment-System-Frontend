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
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../Variables";
import { useParams } from "react-router-dom";

function ShortListApplicant() {
  const toast = useToast();
  const { id } = useParams();
  const [isDateSet, setIsDateSet] = useState("");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/user/${id}`)
      .then((res) => {
        let myArr = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isShortListed === true) myArr.push(res.data[i]);
        }
        setArr(myArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setIsDateSet(value);
  };

  const handleClick = (id, isInterviewScheduled) => {
    if (isInterviewScheduled) {
      toast({
        title: "Interview Scheduled !!!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Interview Cancelled !!!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    axios
      .patch(`${API}/user/${id}`, {
        isInterviewScheduled,
        interviewDateTime: isDateSet,
      })
      .then((res) => {
        let myArr = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isShortListed === true) myArr.push(res.data[i]);
        }
        setArr(myArr);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container maxW="container.xl" mt="10">
      <Heading>ShortList Applicant</Heading>
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
              <Th color="white">Date And Time</Th>
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
                    <Td>
                      <Input
                        type="datetime-local"
                        onChange={(e) => handleChange(e)}
                        placeholder="Basic usage"
                      />
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleClick(
                            e._id,
                            (e.isInterviewScheduled = !e.isInterviewScheduled)
                          )
                        }
                      >
                        {e.isInterviewScheduled
                          ? "Scheduled"
                          : "Schedule Interview"}
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
export default ShortListApplicant;
