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
} from "@chakra-ui/react";

import axios from "axios";
import { API } from "../Variables";
import { useSelector } from "react-redux";

function Interview() {
  const Navigate = useNavigate();
  const isLoginObj = useSelector((store) => store.isLogin.isLogin);
  const [arr, setArr] = useState([]);

  const handleClick = (id) => {
    Navigate(`/interview-applicant/${id}`);
  };

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

  return (
    <Container maxW="container.xl" mt="10">
      <Heading>Interview</Heading>
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
                    onClick={() => handleClick(e._id)}
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
  );
}

export default Interview;
