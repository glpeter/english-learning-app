#!/bin/bash

# Script para configurar y ejecutar el emulador Android
# Script to setup and run the Android emulator

echo "🚀 Configurando el emulador de Android / Setting up Android emulator..."

# Verificar si Android Studio está instalado
if ! command -v adb &> /dev/null; then
    echo "❌ Error: Android SDK no encontrado. Por favor instala Android Studio primero."
    echo "❌ Error: Android SDK not found. Please install Android Studio first."
    echo "📥 Descarga desde / Download from: https://developer.android.com/studio"
    exit 1
fi

echo "✅ Android SDK encontrado / Android SDK found"

# Verificar emuladores disponibles
echo "📱 Emuladores disponibles / Available emulators:"
emulator -list-avds

# Verificar si existe el emulador recomendado
if emulator -list-avds | grep -q "Pixel_7_API_34"; then
    echo "✅ Emulador Pixel_7_API_34 encontrado / Pixel_7_API_34 emulator found"
    echo "🔄 Iniciando emulador / Starting emulator..."
    emulator -avd Pixel_7_API_34 -no-snapshot-load &
    
    # Esperar a que el emulador esté listo
    echo "⏳ Esperando que el emulador esté listo / Waiting for emulator to be ready..."
    adb wait-for-device
    echo "✅ Emulador listo / Emulator ready!"
    
    # Instalar dependencias si no existen
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependencias / Installing dependencies..."
        npm install
    fi
    
    # Ejecutar la aplicación
    echo "🚀 Ejecutando la aplicación / Running the application..."
    npm run android
    
else
    echo "❌ Emulador Pixel_7_API_34 no encontrado / Pixel_7_API_34 emulator not found"
    echo "📝 Para crear un emulador / To create an emulator:"
    echo "   1. Abre Android Studio / Open Android Studio"
    echo "   2. Ve a Tools → AVD Manager / Go to Tools → AVD Manager" 
    echo "   3. Crea un nuevo AVD con: / Create a new AVD with:"
    echo "      - Dispositivo: Pixel 7 / Device: Pixel 7"
    echo "      - API Level: 34 (Android 14) / API Level: 34 (Android 14)"
    echo "      - Nombre: Pixel_7_API_34 / Name: Pixel_7_API_34"
    
    echo ""
    echo "📱 Emuladores actuales disponibles / Current available emulators:"
    emulator -list-avds
    
    if [ "$(emulator -list-avds | wc -l)" -gt 0 ]; then
        echo "🎯 Usando el primer emulador disponible / Using first available emulator..."
        FIRST_EMULATOR=$(emulator -list-avds | head -n 1)
        echo "📱 Iniciando: $FIRST_EMULATOR / Starting: $FIRST_EMULATOR"
        emulator -avd "$FIRST_EMULATOR" -no-snapshot-load &
        adb wait-for-device
        
        if [ ! -d "node_modules" ]; then
            echo "📦 Instalando dependencias / Installing dependencies..."
            npm install
        fi
        
        echo "🚀 Ejecutando la aplicación / Running the application..."
        npm run android
    else
        echo "❌ No hay emuladores disponibles / No emulators available"
        echo "🔧 Por favor crea un emulador usando Android Studio / Please create an emulator using Android Studio"
    fi
fi