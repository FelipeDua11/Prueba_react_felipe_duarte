import React, { useState } from "react";
import { Box, Input, Button, Text, Flex } from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Por favor, llene todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      navigate("/"); // Redirige a la página de inicio después del registro exitoso
    } catch (error) {
      setError("Error al registrar: " + error.message);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={6}
      bg="#D3D3D3"
    >
      <Box
        borderRadius="lg"
        bg="#fadbd8"
        p={6}
        shadow="lg"
        maxW="md"
        w="full"
        color="brand.600"
        border="1px solid brand.500"
      >
        <Text fontSize="xl" mb={4}>
          Registro
        </Text>
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={2}
          borderColor="brand.500"
          borderRadius="md"
          bg="brand.800"
          color="brand.600"
          _placeholder={{ color: "brand.300" }}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={2}
          borderColor="brand.500"
          borderRadius="md"
          bg="brand.800"
          color="brand.600"
          _placeholder={{ color: "brand.300" }}
        />
        <Input
          placeholder="Confirmación de contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          mb={4}
          borderColor="brand.500"
          borderRadius="md"
          bg="brand.800"
          color="brand.600"
          _placeholder={{ color: "brand.300" }}
        />
        <Button
          onClick={handleRegister}
          colorScheme="blue"
          bg="#d7bde2"
          color="brand.500"
          _hover={{ bg: "#d7bde2", opacity: 0.8 }}
          mb={4}
        >
          Registrar
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </Box>
    </Flex>
  );
};

export default Register;
