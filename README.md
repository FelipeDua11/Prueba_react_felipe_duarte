Mi Aplicación de React con Firebase

Descripción

Este proyecto es una aplicación web moderna construida con React y Firebase. Permite a los usuarios gestionar sus perfiles mediante la carga y visualización de imágenes de perfil, así como interactuar con una galería de imágenes almacenadas en Firebase Storage. Además, el proyecto incluye funcionalidades básicas de gestión de comentarios utilizando Firestore.

La aplicación utiliza Chakra UI para una interfaz de usuario accesible y estéticamente agradable.

Tecnologías Utilizadas
React: Biblioteca para construir interfaces de usuario interactivas.
Firebase: Plataforma que proporciona servicios backend como autenticación, almacenamiento en la nube y bases de datos en tiempo real.
Chakra UI: Biblioteca de componentes para React que facilita el diseño de interfaces accesibles y responsivas.
Funcionalidades
Subida de Imágenes de Perfil:

Los usuarios pueden seleccionar y subir imágenes que se almacenan en Firebase Storage.
La imagen seleccionada se muestra en el perfil del usuario.
Galería de Imágenes:

Muestra todas las imágenes almacenadas en Firebase Storage en una galería visual.
Las imágenes se cargan dinámicamente desde Firebase Storage.
Gestión de Comentarios:

Permite a los usuarios agregar, actualizar y eliminar comentarios.
Los comentarios se almacenan y gestionan en Firebase Firestore.
Instalación
Requisitos Previos
Asegúrate de tener las siguientes herramientas instaladas:

Node.js y npm: Puedes descargarlos desde nodejs.org.
Clonar el Repositorio
Clona este repositorio en tu máquina local usando el siguiente comando:

![image](https://github.com/user-attachments/assets/6921ee34-5e71-4677-904f-2395a4cdf306)

Instalar Dependencias
Instala las dependencias necesarias utilizando npm:

![image](https://github.com/user-attachments/assets/c6367c24-93c5-48de-bab7-82ed3c9abf71)

Configuración de Firebase
1 .Accede a la Consola de Firebase.
2 .Crea un nuevo proyecto o selecciona uno existente.
3 .Configura Firebase Storage y Firestore en la consola de Firebase.
4 .Copia la configuración de Firebase (disponible en la consola de Firebase) y pégala en el archivo src/firebase/firebase.js.
5 .El archivo firebase.js debe tener el siguiente aspecto:

Uso
Para iniciar el servidor de desarrollo y ver la aplicación en tu navegador, ejecuta:

![image](https://github.com/user-attachments/assets/a5fc0899-81ea-4a1d-8334-f76107e5e6b0)

Documentación del Código
ProfilePage.jsx
Este componente maneja la carga de imágenes de perfil y la visualización de la galería. Incluye:

handleFileChange: Maneja el cambio de archivo cuando el usuario selecciona una imagen.
handleUpload: Sube la imagen seleccionada a Firebase Storage y actualiza la URL del perfil.
fetchGallery: Recupera las imágenes almacenadas en Firebase Storage y las muestra en una galería.
useEffect: Carga la galería al montar el componente.
firebase.js
Este archivo configura e inicializa los servicios de Firebase que se utilizan en la aplicación:

firestore: Configuración para interactuar con la base de datos Firestore.
auth: Configuración para gestionar la autenticación de usuarios.
storage: Configuración para gestionar el almacenamiento de archivos.
Contribución
Para contribuir a este proyecto, sigue estos pasos:

Haz un Fork del repositorio.
Crea una Rama para tu nueva característica (git checkout -b feature/nueva-caracteristica).
Realiza los Cambios y haz commit (git commit -am 'Añadir nueva característica').
Empuja los Cambios a tu repositorio (git push origin feature/nueva-caracteristica).
Crea un Pull Request para revisar y fusionar tus cambios.


Contacto
Para cualquier pregunta o comentario, puedes contactar al autor:

Nombre: Felipe Buitrago
Correo Electrónico: felipeduarte2895@gmail.com

Este README proporciona una visión clara y profesional de tu proyecto, asegurando que cualquier persona que lo consulte tenga toda la información necesaria para comprender, instalar y contribuir al proyecto. ¡Espero que te sea útil para tu prueba técnica!



