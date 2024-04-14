[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7bX30zK4)

# Práctica 10 - Aplicación cliente-servidor para coleccionistas de cartas Magic

Guillermo Emmanuel González Méndez - alu0101466941

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-GARTOLO/actions/workflows/node.js.yml)

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

### Funcionamiento de la aplicación

Desde el punto de entrada del cliente (magic-app.ts) se ejecutan los comandos que se encuentran en la carpeta `commands`.
Cada comando crea los parámetros pertinents (véase la carta en el comando de añadir) y crea la petición correspondiente.
Mediante la función `sendRequest` se envía la petición al servidor, que se encarga de procesarla y enviar una respuesta.
Esta función conecta un socket al servidor y crea la petición con un `\f` al final para indicar el final de la petición.
Lo mismo hacemos para recibir los datos del servidor, y mediante el uso de un `responseHandler` se procesan los datos recibidos.

En este manejador, tenemos un switch con los diferentes tipos de respuestas que puede recibir el cliente:

- `success`: Indica que la petición se ha realizado correctamente. Imprime un mensaje en la consola.
- `error`: Indica que ha habido un error en la petición. Imprime un mensaje en la consola.
- `get`: Indica que se ha realizado una petición de tipo get. Imprime la carta que se ha recibido.
- `list`: Indica que se ha realizado una petición de tipo list. Imprime la lista de cartas que se han recibido.

En el servidor, se ha implementado un manejador de eventos para recibir las peticiones del cliente.
Se recibe en el archivo `index.ts` y se envía a un manejador de eventos que se encarga de procesar la petición.
Tras ello, se envía una respuesta y se cierra la conexión.

En el manejador de eventos, se ha implementado un switch para procesar las diferentes peticiones que se pueden recibir:

- `add`: Añade una carta a la base de datos. Hace uso de la función `addCard` del `fileManager`.
- `list`: Lista todas las cartas de la base de datos. Hace uso de la función `listCards` del `fileManager`.
- `show`: Muestra una carta de la base de datos. Hace uso de la función `showCard` del `fileManager`.
- `update`: Actualiza una carta de la base de datos. Hace uso de la función `updateCard` del `fileManager`.
- `remove`: Elimina una carta de la base de datos. Hace uso de la función `removeCard` del `fileManager`.

El propio manejador de eventos se encarga mediante los callbacks de recibir errores si existiesen y devolverlos al cliente.

Por último, en cada archivo de `fileManager` se ha implementado una función que recibe un callback para devolver los datos al servidor, mediante el uso de la librería asíncrona `fs` basada en callbacks.

### Pruebas

Los archivos de pruebas se encuentran en la carpeta `tests`. Probamos todas las variantes de la función `createICard` y todas las funciones del `fileManager`.

## Modificación

La modificación de esta práctica se encuentra bajo el directorio `src/mod` con el código implementado en la sesión de prácticas.

## Conclusiones

En esta práctica hemos implementado nuestra primera aplicación cliente-servidor, en la que hemos utilizado callbacks para la comunicación entre el cliente y el servidor.
En próximas prácticas utilizaremos promesas y async/await para mejorar la comunicación entre cliente y servidor, haciendola más eficiente y sencilla.

## Bibliografías

- [Módulo net](https://nodejs.org/api/net.html)
- [Módulo fs](https://nodejs.org/api/fs.html)
- [Node.js Events](https://nodejs.org/docs/latest/api/events.html)
