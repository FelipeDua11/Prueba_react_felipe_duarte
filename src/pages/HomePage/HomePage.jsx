import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Image,
  Text,
  Button,
  Input,
  Flex,
  IconButton,
  Tooltip,
  Stack,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { firestore, auth } from "../../firebase/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Register from "../../components/AuthForm/Register";
import Login from "../../components/AuthForm/Register";

const images = [
  { src: "/Logoani.jpg", alt: "Anime Logo", id: "1" },
  { src: "/img1.png", alt: "Dia Soleado", id: "2" },
  { src: "/img2.png", alt: "Incognico", id: "3" },
  { src: "/img3.png", alt: "Paz", id: "4" },
];

const HomePage = () => {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    fetchComments();
    return () => unsubscribe();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsCollection = collection(firestore, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsData = {};
      commentsSnapshot.forEach((doc) => {
        commentsData[doc.id] = doc.data().text;
      });
      setComments(commentsData);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const saveComment = async (id, text) => {
    try {
      const commentDoc = doc(firestore, "comments", id);
      await setDoc(commentDoc, { text }, { merge: true });
    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  };

  const handleCommentChange = (id, event) => {
    setComments({
      ...comments,
      [id]: event.target.value,
    });
  };

  const handleCommentSubmit = async (id) => {
    try {
      if (comments[id]) {
        await saveComment(id, comments[id]);
        setNewComment(""); // Limpiar el campo de comentario
        await fetchComments(); // Obtener comentarios actualizados
      } else {
        console.error("El comentario no existe");
        return;
      }
    } catch (error) {
      console.log("Error al enviar comentario:", error);
    }
  };

  const handleShare = (platform, src) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          src
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(src)}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/?url=${encodeURIComponent(src)}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) =>
      console.error("Error al cerrar sesión:", error)
    );
  };

  return (
    <Box p={4}>
      <Text
        fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
        fontWeight="bold"
        mb={6}
        color="#87CEEB" // Azul Cielo
        textAlign="center"
        bgGradient="linear(to-r, #DC143C, #FFA07A)"
        bgClip="text"
        textTransform="uppercase"
        letterSpacing="wide"
        lineHeight="short"
        shadow="lg"
        p={2}
      >
        AniImagenes
      </Text>
      {!user ? (
        showLogin ? (
          <>
            <Login />
            <Button
              onClick={() => setShowLogin(false)}
              colorScheme="blue"
              mt={4}
            >
              ¿No tienes una cuenta? Regístrate
            </Button>
          </>
        ) : (
          <>
            <Register />
            <Button
              onClick={() => setShowLogin(true)}
              colorScheme="blue"
              mt={4}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </>
        )
      ) : (
        <>
          <VStack spacing={6} align="center">
            {images.map((image) => (
              <Box
                key={image.id}
                borderRadius="md"
                overflow="hidden"
                position="relative"
                width="full"
                maxWidth="500px"
                mx="auto"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  objectFit="cover"
                  boxSize="100%"
                  borderRadius="md"
                  maxHeight="300px"
                />
                <Box
                  p={4}
                  bg="#e8daef" // Blanco Humo
                  borderRadius="md"
                  boxShadow="sm"
                  mt={2}
                >
                  <Text fontSize="sm" fontWeight="bold" mb={2} color="#2F4F4F">
                    {image.alt}
                  </Text>
                  <Stack spacing={4}>
                    <Flex justifyContent="space-between">
                      <Tooltip label="Compartir en Facebook">
                        <IconButton
                          aria-label="Compartir en Facebook"
                          icon={<FaFacebookF />}
                          onClick={() => handleShare("facebook", image.src)}
                          variant="ghost"
                          color="#2F4F4F"
                        />
                      </Tooltip>
                      <Tooltip label="Compartir en Twitter">
                        <IconButton
                          aria-label="Compartir en Twitter"
                          icon={<FaTwitter />}
                          onClick={() => handleShare("twitter", image.src)}
                          variant="ghost"
                          color="#2F4F4F"
                        />
                      </Tooltip>
                      <Tooltip label="Compartir en Instagram">
                        <IconButton
                          aria-label="Compartir en Instagram"
                          icon={<FaInstagram />}
                          onClick={() => handleShare("instagram", image.src)}
                          variant="ghost"
                          color="#2F4F4F"
                        />
                      </Tooltip>
                    </Flex>
                    <VStack spacing={2}>
                      <Input
                        placeholder="Escribe un comentario..."
                        value={comments[image.id] || ""}
                        onChange={(e) => handleCommentChange(image.id, e)}
                        bg="#D3D3D3" // Gris Claro
                        color="#2F4F4F" // Gris Oscuro
                      />
                      <Button
                        onClick={() => handleCommentSubmit(image.id)}
                        colorScheme="blue"
                        size="sm"
                        bg="#87CEEB" // Azul Cielo
                        _hover={{ bg: "#2F4F4F", color: "#FFFFFF" }} // Gris Oscuro en hover
                      >
                        Comentar
                      </Button>
                    </VStack>
                    <Box mt={4}>
                      {comments[image.id] && (
                        <Text fontSize="sm" color="#2F4F4F">
                          {comments[image.id]}
                        </Text>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Box>
            ))}
          </VStack>
        </>
      )}
    </Box>
  );
};

export default HomePage;
