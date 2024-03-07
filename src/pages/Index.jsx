import { Box, Button, Container, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-h9t6.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          description: data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      {!isLoggedIn ? (
        <Box my={8}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" mt={4} onClick={handleLogin}>
            Login
          </Button>
        </Box>
      ) : (
        <Table variant="simple" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Column 1</Th>
              <Th>Column 2</Th>
              <Th>Column 3</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Data 1</Td>
              <Td>Data 2</Td>
              <Td>Data 3</Td>
            </Tr>
            {/* More rows can be added here */}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default Index;
