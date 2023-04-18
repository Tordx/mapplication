//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AdminAccount = () => {

    const navigation = useNavigation();

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.replace('Welcome');
        ToastAndroid.show('Sucessfully signed out', ToastAndroid.BOTTOM)
      };
    
    return (
        <View style={styles.container}>
            <Pressable onPress={handleLogout} style = {{position: 'absolute', top: 8, right: 10, flexDirection: 'row'}}>
          <FontAwesome
          name = 'sign-out' size={35} color = 'red'/>
        </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AdminAccount;
