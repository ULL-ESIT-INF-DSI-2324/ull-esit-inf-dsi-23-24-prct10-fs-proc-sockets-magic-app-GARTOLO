[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7bX30zK4)

# Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic

Guillermo Emmanuel González Méndez - alu0101466941

## Índice

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Desarrollo de la práctica](#desarrollo-de-la-práctica)
- [Modificación](#modificación)
- [Conclusiones](#conclusiones)
- [Bibliografía](#bibliografía)

## Introducción
En esta práctica se implementa una aplicación cliente-servidor para coleccionistas de cartas Magic.
Tiene como objetivo modificar la base de la práctica 9 implementando un cliente-servidor mediante el uso de callbacks.

## Objetivos
- Implementar una aplicación cliente-servidor para coleccionistas de cartas Magic.
- Uso de callbacks para la comunicación entre cliente y servidor.

## Desarrollo de la práctica

En primer lugar, hemos implementado la siguiente estructura de archivos:

- `src/client`: Contiene el código del cliente. En la carpeta `commands` se encuentran los comandos que se pueden ejecutar en el cliente. 
En la carpeta functions se encuentran las funciones `createICard` y `printCard` que se utilizan en los comandos.
El archivo principal es `magic-app.ts` que se encarga de ejecutar los comandos.
Este archivo hace uso del sendRequest para enviar las peticiones al servidor. Contamos también con un `responseHandler` que se encarga de manejar las respuestas del servidor.
- `requests`: Contiene las peticiones y respuestas que se envían entre el cliente y el servidor.
- `src/server`: Contiene el código del servidor. Contamos con un archivo `index.ts` que se encarga de ejecutar el servidor.
En la carpeta `fileManager` se encuentran las funciones que se encargan de leer y escribir en los archivos.

Hemos añadido un script al `package.json` para poder ejecutar el servidor de manera sencilla:
```json
"start-server": "tsc -p . && node dist/server/index.js"
```

La ruta para ejecutar el cliente es `dist/client/magic-app.js`.

## Modificación

La modificación de esta práctica se encuentra bajo el directorio `src/mod` con el código implementado en la sesión de prácticas.

## Conclusiones
En esta práctica hemos implementado nuestra primera aplicación cliente-servidor, en la que hemos utilizado callbacks para la comunicación entre el cliente y el servidor.
En próximas prácticas utilizaremos promesas y async/await para mejorar la comunicación entre cliente y servidor, haciendola más eficiente y sencilla.

## Bibliografías
- [Módulo net](https://nodejs.org/api/net.html)
- [Módulo fs](https://nodejs.org/api/fs.html)
- [Node.js Events](https://nodejs.org/docs/latest/api/events.html)
