import React, { useState } from "react";
import { Box, Input, Button, Text, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase"; // Asegúrate de que la ruta es correcta
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!inputs.email || !inputs.password) {
      setError("Por favor llene todos los campos");
      return;
    }
    if (!isLogin && inputs.password !== inputs.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (isLogin) {
        // Lógica para iniciar sesión con email y contraseña
        await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
        navigate("/"); // Redirige a la página principal después del inicio de sesión
      } else {
        // Lógica para registrarse
        await createUserWithEmailAndPassword(
          auth,
          inputs.email,
          inputs.password
        );
        navigate("/"); // Redirige a la página principal después del registro
      }
    } catch (error) {
      setError("Error al procesar la solicitud: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log("User Info:", user);

      navigate("/"); // Redirige a la página principal después del inicio de sesión
    } catch (error) {
      console.error(
        "Error durante el inicio de sesión con Google:",
        error.message
      );
      setError(
        "Error durante el inicio de sesión con Google: " + error.message
      );
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="#D3D3D3"
      p={6}
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
        <Image src="/Logoani.jpg" h={24} alt="AniSpace logo" />
        <Text fontSize="xl" mb={4}>
          {isLogin ? "Iniciar Sesión" : "Registro"}
        </Text>
        <Input
          placeholder="Correo electrónico"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          mb={2}
          borderColor="brand.500"
          borderRadius="md"
          bg="brand.800"
          color="brand.600"
          _placeholder={{ color: "brand.300" }}
        />
        {!isLogin && (
          <Input
            placeholder="Confirmación de contraseña"
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
            mb={4}
            borderColor="brand.500"
            borderRadius="md"
            bg="brand.800"
            color="brand.600"
            _placeholder={{ color: "brand.300" }}
          />
        )}
        <Button
          w="full"
          bg="#d7bde2"
          color="brand.500"
          _hover={{ bg: "#d7bde2", opacity: 0.8 }}
          onClick={handleAuth}
          mb={4}
        >
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </Button>
        <Button
          w="full"
          bg="#4285F4" // Color de fondo del botón de Google
          color="white"
          _hover={{ bg: "#357AE8" }}
          onClick={handleGoogleSignIn}
          mb={4}
        >
          Inicia sesión con Google
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </Box>
      <Box
        mt={4}
        bg="#fadbd8"
        borderRadius="md"
        p={4}
        w="full"
        color="gray.600"
        textAlign="center"
        border="1px solid brand.500"
      >
        <Flex align="center" justify="center">
          <Text fontSize="sm" mx={2}>
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
          </Text>
          <Text
            onClick={() => setIsLogin(!isLogin)}
            color="brand.300"
            cursor="pointer"
            fontWeight="bold"
            ml={2}
          >
            {isLogin ? "Registrarse" : "Iniciar Sesión"}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthForm;
