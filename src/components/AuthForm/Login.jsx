import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Iniciar Sesión
      </Text>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={2}
      />
      <Button onClick={handleLogin} colorScheme="blue">
        Iniciar Sesión
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default Login;
