import React from "react";
import {
  Container,
  Spacer,
  Box,
  Stack,
  useMediaQuery,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../Redux/Logger/action";

function AdminHeader() {
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  const isLoginObj = useSelector((store) => store.isLogin.isLogin);
  const Navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.setItem(
      "loginUser",
      JSON.stringify({
        user: { companyName: "", userName: "", email: "" },
      })
    );
    dispatch(
      isLogin({
        user: { companyName: "", userName: "", email: "" },
      })
    );
    toast({
      title: "Logout Successfull !!!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      Navigate("/");
    }, 2000);
  };

  return (
    <>
      <Box
        bgColor="white"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
        w="100%"
        zIndex={10}
        borderBottom="1px"
        borderBottomColor="#c5c7cc"
        pos="sticky"
        top="0"
      >
        <Container maxW="container.xl">
          <Stack direction="row">
            {isLargerThan576 ? (
              <Box p="5">
                <Stack direction="row" spacing={8}>
                  <Link to="/">
                    <Text cursor="pointer">Online Recruitment System</Text>
                  </Link>
                </Stack>
              </Box>
            ) : null}
            <Spacer />
            <Box p="4">
              <Stack direction="row" spacing={8} align="center" p="1">
                <Link to="/">
                  <Text cursor="pointer">Jobs</Text>
                </Link>
                <Link to="/shortlist">
                  <Text cursor="pointer">ShortList</Text>
                </Link>
                <Link to="/interview">
                  <Text cursor="pointer">Interview</Text>
                </Link>
                <Text onClick={handleClick} cursor="pointer">
                  {isLoginObj.user.userName}
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default AdminHeader;
