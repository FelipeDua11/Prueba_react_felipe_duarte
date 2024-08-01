import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { mode } from "@chakra-ui/theme-tools";

// Definir la paleta de colores
const colors = {
  brand: {
    100: "#87CEEB", // Azul Cielo
    200: "#DC143C", // Rojo Carmesí
    300: "#FFA07A", // Naranja
    400: "#98FB98", // Verde Pastel
    500: "#2F4F4F", // Gris Oscuro
    600: "#FFFFFF", // Blanco para contraste
    700: "#F5F5F5", // Blanco Humo
    800: "#D3D3D3", // Gris Claro
  },
};

// Configuración de fuentes
const fonts = {
  heading: `"Noto Sans JP", sans-serif`,
  body: `"Noto Sans JP", sans-serif`,
};

// Estilos globales
const styles = {
  global: (props) => ({
    body: {
      bg: mode("brand.700", "brand.800")(props), // Fondo claro o oscuro
      color: mode("brand.500", "brand.600")(props),
      fontFamily: fonts.body,
      lineHeight: "base",
      transition: "background-color 0.3s ease",
    },
    a: {
      color: mode("brand.100", "brand.300")(props), // Color de enlaces
      _hover: {
        textDecoration: "none",
        color: mode("brand.200", "brand.400")(props),
      },
    },
  }),
};

// Configuración del tema
const theme = extendTheme({
  config: {
    initialColorMode: "light", // O dark si prefieres fondo oscuro
    useSystemColorMode: false,
  },
  colors,
  fonts,
  styles,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
