#!/bin/bash

echo "🎯 Testing English Learning App - Emulator Support"
echo "=================================================="

# Test 1: JSON Data Validation
echo "📋 Test 1: Validating exercise data..."
if python3 -m json.tool src/screens/ExercisesScreen/exercisesA2.json > /dev/null 2>&1; then
    echo "✅ Exercise JSON is valid"
else
    echo "❌ Exercise JSON is invalid"
    exit 1
fi

# Test 2: Node.js can load the data
echo "📋 Test 2: Testing Node.js data loading..."
if node -e "require('./src/screens/ExercisesScreen/exercisesA2.json')" > /dev/null 2>&1; then
    echo "✅ Exercise data loads in Node.js"
else
    echo "❌ Exercise data fails to load in Node.js"
    exit 1
fi

# Test 3: Metro bundler can create development bundle
echo "📋 Test 3: Testing Metro development bundle..."
if npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output /tmp/dev-test.js > /dev/null 2>&1; then
    echo "✅ Development bundle created successfully"
    echo "   Bundle size: $(ls -lah /tmp/dev-test.js | awk '{print $5}')"
else
    echo "❌ Development bundle creation failed"
    exit 1
fi

# Test 4: Metro bundler can create production bundle
echo "📋 Test 4: Testing Metro production bundle..."
if npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /tmp/prod-test.js > /dev/null 2>&1; then
    echo "✅ Production bundle created successfully"
    echo "   Bundle size: $(ls -lah /tmp/prod-test.js | awk '{print $5}')"
else
    echo "❌ Production bundle creation failed"
    exit 1
fi

# Test 5: Android configuration files exist
echo "📋 Test 5: Checking Android configuration..."
required_files=(
    "android/app/build.gradle"
    "android/build.gradle"
    "android/settings.gradle"
    "android/app/src/main/AndroidManifest.xml"
    "android/app/src/main/java/com/englishlearningapp/MainActivity.java"
    "android/app/src/main/java/com/englishlearningapp/MainApplication.java"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 ALL TESTS PASSED! 🎉"
echo ""
echo "📱 The emulator support is fully configured!"
echo "🇪🇸 Respuesta a '¿Dónde está el emulador?': ¡Ya está aquí!"
echo "🇺🇸 Answer to 'Where is the emulator?': It's here now!"
echo ""
echo "To run the app:"
echo "1. Start Android emulator"
echo "2. Run: npx react-native run-android"
echo "3. Or run: npx react-native run-ios (on macOS)"