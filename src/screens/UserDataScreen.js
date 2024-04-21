import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';

const UserInformation = ({ route, navigation }) => {

  const { name, email, age, photoUri } = route.params;
  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'}/>
        <Image source={{ uri: photoUri }} style={styles.photo} />
        <Text style={styles.textLabel}>Name </Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.textLabel}>Email</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.textLabel}>Age</Text>
        <Text style={styles.text}> {age}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to home</Text>
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
    photo: {
      borderWidth: .25,
      borderColor: 'black',
      borderRadius: 10,
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    textLabel: {
      fontSize: 12,
      marginBottom: 5,
      fontFamily: 'Raleway_600SemiBold_Italic'
    },
    text: {
      fontSize: 18,
      fontFamily: 'Jost_700Bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#7A0068',
      padding: 10,
      marginVertical: 20,
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

export default UserInformation;
