import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Input,
  Button,
  Text,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Para almacenar la URL de la imagen
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleUpload = async () => {
    if (!avatar) {
      setError("Por favor, seleccione una imagen.");
      return;
    }

    const imageRef = ref(storage, `avatars/${uuidv4()}_${avatar.name}`);
    setUploading(true);

    try {
      await uploadBytes(imageRef, avatar);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      setAvatar(null); // Limpiar selección de archivo después de la carga
      fetchGallery(); // Actualizar la galería después de subir una nueva imagen
      setError("");
    } catch (err) {
      console.error("Detalles del error de carga:", err);
      setError(
        "Error al subir la imagen: " + (err.message || "Error desconocido")
      );
    } finally {
      setUploading(false);
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const listRef = ref(storage, "avatars/");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          try {
            return await getDownloadURL(itemRef);
          } catch (err) {
            console.error("Error al obtener la URL de imagen:", err);
            return null; // Filtrar URLs nulas más tarde
          }
        })
      );
      setGallery(urls.filter((url) => url !== null)); // Filtrar URLs nulas
    } catch (err) {
      console.error("Error al cargar la galería:", err);
      setError(
        "Error al cargar la galería: " + (err.message || "Error desconocido")
      );
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(); // Cargar la galería al montar el componente
  }, []);

  return (
    <Container maxW="container.md" py={5}>
      <Flex direction="column" align="center" justify="center">
        {/* Avatar Section */}
        <Box
          bg="gray.100"
          p={5}
          borderRadius="md"
          shadow="md"
          textAlign="center"
          w="full"
          mb={6}
        >
          <VStack spacing={4}>
            <Image
              src={imageUrl || "/default-avatar.png"} // Ruta a una imagen por defecto si no hay imagen cargada
              alt="Avatar"
              borderRadius="full"
              boxSize={{ base: "120px", md: "150px" }}
              objectFit="cover"
              borderWidth="2px"
              borderColor="teal.500"
            />
            <Text fontSize="lg" fontWeight="bold" color="teal.600">
              {imageUrl ? "Imagen Actual" : "Sube tu Avatar"}
            </Text>
            <Input
              type="file"
              onChange={handleFileChange}
              mt={4}
              borderColor="teal.500"
              _hover={{ borderColor: "teal.600" }}
            />
            <Button
              onClick={handleUpload}
              colorScheme="teal"
              isLoading={uploading}
              mt={4}
              borderRadius="md"
            >
              Subir Imagen
            </Button>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
          </VStack>
        </Box>

        {/* Gallery Section */}
        <Box w="full">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Mi Galería
          </Text>
          {galleryLoading ? (
            <Text>Cargando...</Text>
          ) : (
            <Grid
              templateColumns={{
                base: "repeat(auto-fill, minmax(120px, 1fr))",
                md: "repeat(auto-fill, minmax(150px, 1fr))",
              }}
              gap={4}
            >
              {gallery.map((url, index) => (
                <GridItem key={index}>
                  <Image
                    src={url}
                    alt={`Galería ${index}`}
                    borderRadius="md"
                    boxSize="100%"
                    objectFit="cover"
                    borderWidth="2px"
                    borderColor="teal.500"
                  />
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
