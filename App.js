import React from 'react';
import { StyleSheet, Text, StatusBar, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDataScreen from './src/screens/UserDataScreen';
import FormDataScreen from './src/screens/FormDataScreen';
import { Raleway_200ExtraLight, Raleway_500Medium, Raleway_700Bold, Raleway_600SemiBold_Italic} from "@expo-google-fonts/raleway";
import { Jost_400Regular, Jost_700Bold } from '@expo-google-fonts/jost';
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserDataScreen" component={UserDataScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormDataScreen" component={FormDataScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Jost_400Regular,
    Raleway_700Bold,
    Raleway_500Medium,
    Jost_700Bold,
    Raleway_600SemiBold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.imageContainer}>
        <Image source={require('./src/assets/images/magghub.png')} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FormDataScreen')}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFEBFC'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#7A0068',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jost_400Regular'
  },
});
