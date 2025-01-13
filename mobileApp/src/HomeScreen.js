import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => {
  console.log('Route Params:', route.params); // Debug route params

  const { user } = route.params || {};
  const { facultyInfo } = user || {};

  const [selectedAvailability, setSelectedAvailability] = useState(facultyInfo?.availability || ''); // Initial value from facultyInfo

  const handleAvailabilityChange = (newAvailability) => {
    updateAvailability(newAvailability);
    setSelectedAvailability(newAvailability);
  };

  const updateAvailability = async (newAvailability) => {
    try {
      const response = await axios.put(
        `http://192.168.0.104:3001/update-availability/${facultyInfo.id}`,
        { availability: newAvailability }
      );
      console.log('Availability updated:', response.data);
    } catch (error) {
      console.error('Error updating availability:', error);
      Alert.alert('Error', 'Failed to update availability');
    }
  };

  if (!facultyInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Faculty Information</Text>
        {/* Add form elements as needed */}
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, {facultyInfo.firstname}!</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.info}>{facultyInfo.firstname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.info}>{facultyInfo.lastname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>RFID</Text>
          <Text style={styles.info}>{facultyInfo.rfid}</Text>
        </View>
        <Text style={styles.label}>Availability</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.availabilityBox, selectedAvailability === '1' && styles.greenBox]}
            onPress={() => handleAvailabilityChange('1')}
          />
          <TouchableOpacity
            style={[styles.availabilityBox, selectedAvailability === '2' && styles.orangeBox]}
            onPress={() => handleAvailabilityChange('2')}
          />
          <TouchableOpacity
            style={[styles.availabilityBox, selectedAvailability === '0' && styles.redBox]}
            onPress={() => handleAvailabilityChange('0')}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.info}>{facultyInfo.status}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light blue background
  },
  header: {
    backgroundColor: '#007acc', // Blue header background
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // White header text
  },
  card: {
    backgroundColor: '#ffffff', // White card background
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007acc', // Blue label text
  },
  info: {
    fontSize: 18,
    color: '#333', // Dark text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  availabilityBox: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  greenBox: {
    backgroundColor: '#32CD32', // Green
    borderColor: '#32CD32',
  },
  orangeBox: {
    backgroundColor: '#FFA500', // Orange
    borderColor: '#FFA500',
  },
  redBox: {
    backgroundColor: '#FF6347', // Red
    borderColor: '#FF6347',
  },
});

export default HomeScreen;
