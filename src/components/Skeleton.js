import * as React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, Alert, Image, FlatList, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';


export default function Skeleton({ visible, children }) {
  const AnimatedValue = new Animated.Value(0);


  useEffect(() => {
    circleAnimated();
    return () => circleAnimated();
  })

  const circleAnimated = () => {
    AnimatedValue.setValue(0)
    Animated.timing(
      AnimatedValue,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: false
      }
    ).start(() => {
      setTimeout(() => {
        circleAnimated()
      }, 1000)
    })
  }

  const translateX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200]
  });

  const translateX2 = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 450]
  });


  if (visible) {

    return (
      <View style={styles.NavigationContainer}>
        <View style={styles.picture}>
          <Animated.View
            style={{
              width: '50%',
              height: '100%',
              opacity: 0.2,
              backgroundColor: '#dcdcdc',
              transform: [{ translateX: translateX }]
            }}

          >
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.searchBox}>
          <Feather name="search" size={34} color="black" />
        </TouchableOpacity>
        <View style={{ backgroundColor: '#f1f1f1', width: 200, height: 20, top: -50, borderRadius: 10, overflow: 'hidden' }}>
          <Animated.View
            style={{
              width: '30%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: '#ffff',
              transform: [{ translateX: translateX }]
            }}
          >
          </Animated.View>
        </View>
        <View style={{ backgroundColor: '#f1f1f1', width: 150, height: 20, top: -45, borderRadius: 10, overflow: 'hidden' }}>
          <Animated.View
            style={{
              width: '24%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: 'white',
              transform: [{ translateX: translateX }]
            }}
          >
          </Animated.View>
        </View>
        <View style={{
          height: 350,
          width: "80%",
          top: -30,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#f1f1f1',
          justifyContent: 'flex-start',
          alignItems: 'center', overflow: 'hidden'
        }}>
          <Animated.View
            style={{
              width: '14%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: '#f1f1f1',
              transform: [{ translateX: translateX2 }]
            }}
          >
          </Animated.View>
        </View>

        <View style={{
          flex: 0.3,
          backgroundColor: "white",
          height: 60,
          width: "80%",
          borderRadius: 20,
          borderColor: '#f1f1f1',
          borderWidth: 2, overflow: 'hidden'
        }}>
          <Animated.View
            style={{
              width: '24%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: '#f1f1f1',
              transform: [{ translateX: translateX2 }]
            }}
          >
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  picture: {
    height: 190,
    width: 190,
    backgroundColor: '#808080',
    borderRadius: 50,
    top: -20,
    overflow: 'hidden'
  },

  searchBox: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    top: -60,
    left: 70
  },

});