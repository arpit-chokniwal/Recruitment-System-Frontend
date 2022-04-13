import React from "react";
import {
  Box,
  Image,
  Badge,
  Spacer,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function JobCard({ data }) {
  const {
    _id,
    companyName,
    city,
    jobTitle,
    jobDescription,
    salary,
    companyImageUrl,
  } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate(`/apply-job/${_id}`);
  };

  return (
    <>
      <Box
        w="280px"
        h="380px"
        borderWidth="1px"
        backgroundColor="white"
        overflow="hidden"
        marginBottom="25"
        cursor="pointer"
        borderColor="gray.200"
        borderRadius="10px"
        marginTop="50"
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
      >
        <Box>
          <Image src={companyImageUrl} h="200px" />
        </Box>
        <Box p="2">
          <Box
            h="30px"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {jobTitle}
          </Box>
          <Box h="20px" d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal" mt="1">
              {companyName}
            </Badge>
            <Spacer />
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Heading as="h6" size="xs">
                {city}
              </Heading>
            </Box>
          </Box>
          <Box mt="3" h="25px" align="center">
            <Badge
              onClick={onOpen}
              borderRadius="full"
              px="2"
              colorScheme="teal"
              mt="1"
            >
              Click here to see description
            </Badge>
          </Box>
          <Box d="flex" alignItems="baseline" mt="1" h="15px">
            <Box>
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>
            <Spacer />
            <Box>
              <Heading as="h6" size="xs">
                Salary : {salary} LPA
              </Heading>
            </Box>
          </Box>
          <Button
            onClick={handleClick}
            w="100%"
            mt={4}
            colorScheme="blue"
            type="submit"
          >
            Apply Job
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{jobDescription}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default JobCard;
