import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const FormDataScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const uploadImage = require('../assets/images/upload.jpg');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [photoUriError, setPhotoUriError] = useState('');

  const handlePhotoCapture = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setPhotoUri(imageUri);
      }
      setPhotoUriError('');
    });
  };

  const handlePhotoCaptures = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    } else {
      
    }
    setPhotoUriError('');
  };

  const handleSubmit = () => {
    const errors = [];

    if (!name.trim()) {
      errors.push('Please enter a valid name!');
    }
  
    if (!email.trim() || !validateEmail(email)) {
      errors.push('Please enter a valid email address!');
    }
  
    if (!age.trim() || isNaN(Number(age))) {
      errors.push('Please enter a valid age!');
    }

    if (!photoUri) {
      errors.push('Please select an image!');
    }
    
    if (errors.length > 0) {
      setNameError(errors.includes('Please enter a valid name!') ? 'Please enter a valid name!' : '');
      setEmailError(errors.includes('Please enter a valid email address!') ? 'Please enter a valid email address!' : '');
      setAgeError(errors.includes('Please enter a valid age!') ? 'Please enter a valid age!' : '');
      setPhotoUriError(errors.includes('Please select an image!') ? 'Please select an image!' : '');
      return;
    
    } else {
      setNameError('');
      setEmailError('');
      setAgeError('');
      setPhotoUriError('');
    }

    navigation.navigate('UserDataScreen', { name, email, age, photoUri });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
    
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar barStyle={'dark-content'}/>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
              <Image source={photoUri ? { uri: photoUri } : uploadImage} style={styles.photo} />
              {photoUriError ? <Text style={{color: 'red',fontFamily: 'Raleway_500Medium',fontSize: 10,paddingTop: 10}}>{photoUriError}</Text> : null}
                <TouchableOpacity style={styles.photoButton} onPress={handlePhotoCapture}>
                  <Text style={styles.buttonText}>Click to Upload Image</Text>
                </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Full Name"
            onChangeText={(text) => {
              setName(text);
              setNameError('');
            }}
            onFocus={() => setNameError('')}
            value={name}
          />
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
        </View>
        <View>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email Address"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            onFocus={() => setEmailError('')}
            value={email}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        </View>
        <View>
          <Text style={styles.label}><Text style={styles.required}>*</Text> Age</Text>
          <TextInput
            style={styles.input}
            placeholder="How old are you?"
            onChangeText={(text) => {
              setAge(text);
              setAgeError('');
            }}
            onFocus={() => setAgeError('')}
            value={age}
            keyboardType="numeric"
          />
          {ageError ? <Text style={styles.error}>{ageError}</Text> : null}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonGoBack} onPress={() => (navigation.goBack())}>
            <Text style={styles.buttonTextGoBack}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#FFEBFC'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    borderWidth: .25,
    borderColor: 'black',
    borderRadius: 10,
    width: 175,
    height: 175,
    resizeMode: 'cover',
  },
  input: {
    borderWidth: .75,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    width: '100%',
    fontFamily: 'Raleway_700Bold'
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Raleway_500Medium'
  },
  required: {
    color: 'red',
  },
  error: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'Raleway_500Medium',
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20
  },
  buttonGoBack: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
    flex: 0.5
  },
  buttonTextGoBack: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Jost_400Regular',
  },
  button: {
    backgroundColor: '#7A0068',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 0.5
  },  
  photoButton: {
    backgroundColor: '#775253',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    width: '75%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jost_400Regular'
  },

});

export default FormDataScreen;
