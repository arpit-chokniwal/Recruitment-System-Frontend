import { Heading, Flex, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import axios from "axios";
import { API } from "../Variables";

function UserHome() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/job`)
      .then((res) => {
        setArr(res.data.AllJob);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container maxW="90%" align="center">
      <Heading>Home</Heading>
      <Flex direction="row" flexWrap="wrap" justify="center" gap={5} m="auto">
        {arr.length > 0
          ? arr.map((e) => <JobCard key={e._id} data={e} />)
          : null}
      </Flex>
    </Container>
  );
}

export default UserHome;
