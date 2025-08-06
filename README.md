# English Learning App

Una aplicación móvil para aprender inglés con ejercicios interactivos.

## ¿Dónde está el emulador? / Where is the emulator?

**¡El emulador está aquí!** Esta aplicación ahora puede ejecutarse en emuladores Android e iOS.

### Configuración del Emulador / Emulator Setup

#### Prerrequisitos / Prerequisites

1. **Node.js** (versión 16 o superior)
2. **Android Studio** con Android SDK
3. **React Native CLI**: `npm install -g react-native-cli`

#### Para Android Emulator:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Android SDK:**
   - Abrir Android Studio
   - Ir a Tools > SDK Manager
   - Instalar Android SDK Platform 33
   - Instalar Android SDK Build-Tools

3. **Crear un emulador Android:**
   - Abrir Android Studio
   - Ir a Tools > AVD Manager
   - Crear un nuevo dispositivo virtual
   - Elegir un dispositivo (ej: Pixel 4)
   - Seleccionar una imagen del sistema (ej: API 33)

4. **Ejecutar la aplicación:**
   ```bash
   # Iniciar el emulador desde Android Studio o:
   npx react-native run-android
   ```

#### Para iOS Simulator (solo en macOS):

1. **Instalar Xcode** desde Mac App Store

2. **Instalar dependencias iOS:**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Ejecutar en iOS:**
   ```bash
   npx react-native run-ios
   ```

### Funcionalidades / Features

- ✅ **Emulador configurado** / Emulator configured
- ✅ **Ejercicios de gramática** / Grammar exercises
- ✅ **Múltiples categorías** / Multiple categories:
  - Present Simple
  - Present Continuous
  - Past Simple
  - Past Continuous
- ✅ **Sistema de puntuación** / Scoring system
- ✅ **Interfaz en español** / Spanish interface

### Estructura del Proyecto / Project Structure

```
english-learning-app/
├── App.js                    # Componente principal
├── index.js                  # Punto de entrada
├── package.json              # Dependencias
├── android/                  # Configuración Android
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/
├── src/
│   └── screens/
│       └── ExercisesScreen/
│           └── exercisesA2.json  # Datos de ejercicios
└── README.md
```

### Comandos Útiles / Useful Commands

```bash
# Instalar dependencias
npm install

# Ejecutar en Android
npx react-native run-android

# Ejecutar en iOS (solo macOS)
npx react-native run-ios

# Iniciar Metro Bundler
npx react-native start

# Limpiar cache
npx react-native start --reset-cache
```

### Solución de Problemas / Troubleshooting

#### Error: "Unable to load script from assets"
```bash
npx react-native start --reset-cache
npx react-native run-android
```

#### Error: "SDK location not found"
Crear archivo `android/local.properties`:
```
sdk.dir=/path/to/your/Android/Sdk
```

#### Error: "Command failed: gradlew.bat installDebug"
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

## Respuesta a "¿Dónde está el emulador?"

**¡Ya está aquí!** 🎉

El emulador ahora está completamente configurado y la aplicación puede ejecutarse en:
- ✅ Emuladores Android
- ✅ Simuladores iOS (en macOS)
- ✅ Dispositivos físicos

Solo necesitas seguir los pasos de instalación arriba para ejecutar la aplicación en tu emulador preferido.