# ConexaNews 📰

Es una aplicación móvil moderna para consulta de noticias desarrollada con React Native y Expo que muestra información de la API pública JSONPlaceholder.

## 🏗️ Arquitectura y Patrones de Diseño

### Patrón de Arquitectura

ConexaNews utiliza una arquitectura basada en **componentes** con **gestión de estado centralizada**, siguiendo los principios de:

- **Separación de responsabilidades**: La lógica de negocio, la presentación y los datos están claramente separados.
- **Modularidad**: Componentes reutilizables e independientes.
- **Estado centralizado**: Usando Zustand para gestionar el estado global de la aplicación.

## 📚 Bibliotecas Principales

- **Expo Router**: Sistema de enrutamiento basado en archivos.
- **Zustand**: Gestión de estado global ligera y simple.
- **React Query**: Gestión de estado del servidor y caché.
- **Axios**: Cliente HTTP para peticiones a la API.
- **AsyncStorage**: Almacenamiento persistente.
- **i18next**: Internacionalización.

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**

```bash
git clone [https://github.com/franblanco95/conexa-news.git]
cd ConexaNews
```

2. **Instalar dependencias**

```bash
npm install / yarn install
```

3. **Iniciar la aplicación**

```bash
npm run ios
```

## 🧪 Pruebas

La aplicación incluye pruebas unitarias implementadas con Jest y React Testing Library para garantizar la calidad del código y el correcto funcionamiento de los componentes.

### Ejecutar pruebas

Para ejecutar todas las pruebas unitarias:

```bash
npm test
```

Para ejecutar las pruebas en modo watch (útil durante el desarrollo):

```bash
npm run test:watch
```

Para generar un informe de cobertura de código:

```bash
npm run test:coverage
```

## 🌐 Internacionalización

La aplicación soporta por ahora idiomas como español e ingles, utilizando i18next. Los archivos de traducción se encuentran en `src/i18n/`.

## 📋 Funcionalidades Principales

- Listado de noticias y usuarios.
- Detalle de noticias y usuarios.
- Sistema de favoritos
- Cambio de idioma
