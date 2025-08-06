# English Learning App - Aplicación para Aprender Inglés

## ¿Dónde está el emulador? / Where is the emulator?

¡Esta es la respuesta a tu pregunta! Ahora tienes una aplicación completa de React Native con configuración de emulador Android.

## Requisitos Previos / Prerequisites

### Instalación del entorno Android:

1. **Android Studio**: Descarga e instala desde [https://developer.android.com/studio](https://developer.android.com/studio)
2. **Java Development Kit (JDK)**: Versión 8 o superior
3. **Node.js**: Versión 16 o superior

### Configuración del SDK de Android:

1. Abre Android Studio
2. Ve a **Tools → SDK Manager**
3. Instala:
   - Android SDK Platform 33
   - Android SDK Build-Tools 33.0.0
   - Android SDK Platform-Tools
   - Android SDK Tools

4. Ve a **Tools → AVD Manager** para crear un emulador
5. Crea un nuevo dispositivo virtual (AVD):
   - Dispositivo: Pixel 7
   - Imagen del sistema: API Level 34 (Android 14)
   - Nombre: `Pixel_7_API_34`

## Configuración de Variables de Entorno

Añade estas líneas a tu archivo `~/.bashrc` o `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Instalación y Ejecución

### 1. Instalar dependencias:
```bash
npm install
```

### 2. Ver emuladores disponibles:
```bash
npm run emulator-list
```

### 3. Iniciar el emulador Android:
```bash
npm run emulator-start
```

### 4. En una nueva terminal, ejecutar la aplicación:
```bash
npm run android
```

## Comandos Disponibles

### Emulador:
- `npm run emulator-list` - Lista todos los emuladores disponibles
- `npm run emulator-start` - Inicia el emulador Pixel_7_API_34
- `npm run emulator` - Instala y ejecuta la app en el emulador

### Desarrollo:
- `npm start` - Inicia el Metro bundler
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS (requiere macOS)

## Estructura del Proyecto

```
english-learning-app/
├── android/                    # Configuración Android
│   ├── app/
│   │   ├── build.gradle        # Configuración de build Android
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/com/englishlearningapp/
│   │           ├── MainActivity.java
│   │           └── MainApplication.java
│   ├── build.gradle           # Configuración global de Android
│   └── settings.gradle        # Configuración de módulos
├── src/
│   └── screens/
│       └── ExercisesScreen/
│           └── exercisesA2.json  # Ejercicios de inglés (A2)
├── App.js                     # Componente principal de la aplicación
├── index.js                   # Punto de entrada
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

## Características de la Aplicación

La aplicación incluye:

- ✅ **Ejercicios de gramática inglesa** en 4 categorías:
  - Presente Simple (Present Simple)
  - Presente Continuo (Present Continuous)
  - Pasado Simple (Past Simple)
  - Pasado Continuo (Past Continuous)

- ✅ **Interfaz intuitiva** con:
  - Selector de categorías
  - Sistema de puntuación
  - Feedback inmediato
  - Resultados finales

- ✅ **Configuración completa del emulador Android**
- ✅ **Scripts automatizados** para facilitar el desarrollo

## Solución de Problemas

### Si el emulador no inicia:
1. Verifica que Android Studio esté instalado
2. Asegúrate de que las variables de entorno estén configuradas
3. Reinicia tu terminal después de configurar las variables
4. Ejecuta `adb devices` para verificar la conexión

### Si la aplicación no se instala:
1. Limpia el proyecto: `cd android && ./gradlew clean && cd ..`
2. Reinstala node_modules: `rm -rf node_modules && npm install`
3. Reinicia Metro: `npm start -- --reset-cache`

### Si hay errores de compilación:
1. Verifica que tienes Java 8+ instalado
2. Asegúrate de que el SDK de Android esté actualizado
3. Revisa que el emulador esté ejecutándose

## Próximos Pasos

Puedes expandir la aplicación añadiendo:
- Más niveles de dificultad (B1, B2, C1, C2)
- Ejercicios de vocabulario
- Pronunciación y audio
- Progreso del usuario
- Modo offline

## Licencia

Este proyecto está bajo la licencia MIT.