import {
  Box,
  Link,
  Flex,
  Button,
  Text,
  Tooltip,
  useTheme,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  InstagramLogo,
  InstagramMobileLogo,
  SearchLogo,
} from "../../assets/contants";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Ejemplo de hook de logout
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/auth"); // Redirige a la página de login o la que prefieras
    }, 1000);
  };

  return (
    <Box
      height={"100vh"}
      border={"1px solid"}
      borderColor={"gray.200"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
      bgGradient="linear(to-r, brand.200, brand.300)" // Fondo degradado
      borderRadius="md" // Bordes redondeados
      boxShadow="xl" // Sombra más pronunciada
    >
      <Flex
        direction={"column"}
        gap={5}
        w="full"
        height={"full"}
        alignItems="center"
      >
        {/* Logo */}
        <Tooltip label="Instagram" aria-label="Instagram Logo">
          <Link
            to={"/"}
            as={RouterLink}
            p={2}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
          >
            <InstagramLogo />
          </Link>
        </Tooltip>

        {/* Iconos */}
        <Flex direction={"row"} align="center" gap={4}>
          <Link
            to={"/search"}
            as={RouterLink}
            p={2}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
            borderRadius="md"
            _hover={{ bg: "whiteAlpha.200" }}
            border={2}
            borderColor="brand.100" // Color del borde
            bg="whiteAlpha.300" // Fondo del botón
          >
            <SearchLogo />
          </Link>

          <Link
            to={"/home"}
            as={RouterLink}
            p={2}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
            borderRadius="md"
            _hover={{ bg: "whiteAlpha.200" }}
            border={2}
            borderColor="brand.100" // Color del borde
            bg="whiteAlpha.300" // Fondo del botón
          >
            <Text>Home</Text>
          </Link>
        </Flex>

        {/* Iconos en móvil */}
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          border={2}
          cursor={"pointer"}
          _hover={{ bg: "whiteAlpha.200" }}
          borderColor="brand.100" // Color del borde
          bg="whiteAlpha.300" // Fondo del botón
        >
          <InstagramMobileLogo />
        </Link>

        {/* Botón de salida */}
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
            cursor="pointer" // Añadido cursor pointer
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
