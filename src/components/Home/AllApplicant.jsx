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
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API } from "../Variables";

function AllApplicant() {
  const toast = useToast();
  const [arr, setArr] = useState([]);
  const { id } = useParams();

  console.log("params", id);

  useEffect(() => {
    axios
      .get(`${API}/user/${id}`)
      .then((res) => {
        console.log("1st", res);
        setArr(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = (userId, status) => {
    if (status) {
      console.log("2nd", userId);
      toast({
        title: "Applicant Shortlisted !!!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      axios
        .patch(`${API}/user/${userId}`, { isShortListed: status })
        .then((res) => {
          setArr(res.data);
          console.log("true", res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // else {
    //   console.log("3rd", userId);
    //   toast({
    //     title: "Applicant Unshortlisted !!!",
    //     status: "success",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   axios
    //     .patch(`${API}/user/${id}`, {
    //       isShortListed,
    //       isInterviewScheduled: false,
    //       isHired: false,
    //       interviewDateTime: "",
    //       jobSchemaId: "",
    //     })
    //     .then((res) => {
    //       console.log("false", res);
    //       // let myArr = [];
    //       // for (let i = 0; i < res.data.length; i++) {
    //       //   if (id == res.data[i].jobSchemaId) {
    //       //     myArr.push(res.data[i]);
    //       //   }
    //       // }
    //       // setArr(myArr);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  };
  return (
    <Container maxW="container.xl" mt="10">
      <Heading>All Applicant</Heading>
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
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          handleClick(
                            e._id,
                            (e.isShortListed = !e.isShortListed)
                          )
                        }
                      >
                        {e.isShortListed ? "Shortlisted" : "Shortlist"}
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

export default AllApplicant;
