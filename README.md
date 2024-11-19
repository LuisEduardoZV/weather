
# Weather App

Weather App es una aplicación web la cual le permite ver informacion climatológica de su región. Tambien cuenta con un buscador para seleccionar la región/ciudad/país que quiera así como cambiar las mediciones entre sistema europeo e imperial.

La aplicación le permite ver la temperatura actual así como máximos y mínimos, sensación térmica y humedad; puede ver la presión del aire, condición climática, información del viento y horas aproximadas de atardecer y amanecer. 

También le muestra al usuario la contaminación atmosférica actual mostrando la concentración de ciertos elementos que hay en el aire.

Se cuenta con un mapa interactivo donde el usuario podrá ver representado la región en la que se esta haciendo la consulta del clima.

## Despliegue

El proyecto se generó con ayuda de Vite, por lo que para desplegar el proyecto bastará con ejecutar el siguiente comando:

```bash
  npm run dev
```

Asegurese de ejecutarlo una vez que haya intalado los paquetes necesarios usando: 

```bash
  npm install
```

## Variables de Entorno

Para desplegar correctamente el proyecto sera necesario que agregues un par de variables de entorno en tu archivo `.env`, localizado al mismo nivel que el archivo `package.json`:

`VITE_KEY_API`

API KEY proporcionada por [OpenWeather](https://home.openweathermap.org/api_keys) para ejecutar consultas del clima.


`VITE_KEY_GOOGLE_API`

Tu API KEY personal de [Google Maps](https://console.cloud.google.com/) con la cual podrás hacer busquedas de clima por localización.
## Screenshots

### Inicio
![Home App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/WeatherMain.png?raw=true)

Pantalla inicial al entrar a la aplicación. Podrá buscar por región y consultar hasta 4 días a futuro.

### Categorías

![Category App Screenshot](https://github.com/LuisEduardoZV/portafolio/blob/main/src/assets/projects/WeatherHour.jpg?raw=true)

Al hacer una consulta a futuro, tendrá la opción de ver las condiciones climaticas por hora en rangos de 3 horas.

> *Nota:
> Al iniciar la aplicación por primera vez solicitará acceso a la ubicación para generarle por default la busqueda de su zona.*
## Construido con

- **[Ant Design](https://ant.design/)**: Framework utlizado para crear la interfaz de usuario.
- **[Framet Motion](https://motion.dev/)**: Efectos visuales y animaciones a la página.
- **[Three.js](https://threejs.org/)**: Utilizado para el mundo interactivo.


## Licencia

Este proyecto esta bajo la licencia [MIT](https://choosealicense.com/licenses/mit/).

