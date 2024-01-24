import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import styles from '../../stylesheets/datastyles';
import { FIREBASE_AUTH, FIRESTORE_DB, REALTIME_DB } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, update } from 'firebase/database';

const Temperature = () => {
  const [temperatureRating, setTemperatureRating] = useState(30);
  const [temperatureComment, setTemperatureComment] = useState('');
  const [temperatureHistory, setTemperatureHistory] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageComment, setAverageComment] = useState('');
  const [updateCounter, setUpdateCounter] = useState(0);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  const getUsername = async (user: string) => {
    if (user) {
        const userEmail = user.email;
        const retrieveDoc = doc(FIRESTORE_DB, 'users', userEmail);

        const docSnapshot = await getDoc(retrieveDoc);
        const userData = docSnapshot.data();

        const retrievedUsername = userData.username;
        setUsername(retrievedUsername);
    } else {
        console.log(error)
    }
  }

  useEffect(() => {
    const setAuth = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);
      getUsername(user);
    });
  }, []);

  useEffect(() => {
    if (user && username) {
      const userDataRef = ref(REALTIME_DB, `/${username}`);
      const averageData = {
        averageTemperatureRating: averageRating,
        averageTemperatureComment: averageComment,
      };

      update(userDataRef, averageData)
        .then(() => {
          console.log('Average data sent to Firebase successfully');
        })
        .catch((error) => {
          console.error('Error sending average data to Firebase: ', error);
        });
    }
  }, [user, username, averageRating, averageComment]);

  useEffect(() => {
    const updateTemperatureData = () => {
      const newTemperatureRating = Math.floor(Math.random() * 30) + 20;
      setTemperatureRating(newTemperatureRating);
      setUpdateCounter((prevCounter) => prevCounter + 1);
    };

    const intervalId = setInterval(updateTemperatureData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const foundComment = temperatureComments.find(
      (item) => item.range[0] <= temperatureRating && temperatureRating <= item.range[1]
    );
  
    setTemperatureComment(foundComment ? foundComment.comment : '');
  
    const newArray = Array.from({ length: 10 }, (_, index) => ({
      rating: temperatureRating,
      comment: foundComment ? foundComment.comment : '',
    }));
  
    setTemperatureHistory((prevHistory) => [...prevHistory.slice(-9), newArray[0]]);
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }, [temperatureRating]);
  
  useEffect(() => {
    const lastTenRatings = temperatureHistory.slice(-10);
    const sumRating = lastTenRatings.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(lastTenRatings.length, 1);

    const foundAvgComment = averageRatingComments.reduce((closest, current) => {
        const currentDiff = Math.abs(avgRating - (current.range[0] + current.range[1]) / 2);
        const closestDiff = Math.abs(avgRating - (closest.range[0] + closest.range[1]) / 2);

        return currentDiff < closestDiff ? current : closest;
    });

    setAverageRating(parseFloat(avgRating.toFixed(2)));
    setAverageComment(foundAvgComment.comment);
}, [temperatureHistory, updateCounter]);


  const temperatureComments = [
    { range: [20, 25], comment: 'It is too cold, consider warming up.' },
    { range: [26, 30], comment: 'The temperature is comfortable.' },
    { range: [31, 35], comment: 'It is getting warm, stay cool.' },
    { range: [36, 40], comment: 'It is hot, make sure to stay hydrated.' },
    { range: [41, 50], comment: 'It is extremely hot, take necessary precautions.' },
  ];

  const averageRatingComments = [
    { range: [20, 25], comment: 'Consider warming yourself up!' },
    { range: [26, 30], comment: 'The temperatures are comfortable and good!' },
    { range: [31, 35], comment: 'The room is getting hotter' },
    { range: [36, 40], comment: 'Consider cooling your room to prevent health risks!' },
    { range: [41, 50], comment: 'Health Risk! Please get out of the room!' },
  ];
  
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text style={styles.dataTitle}>Temperature</Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.historyText}>Current Temperature</Text>
          <Text style={styles.dataRating}>Rating: {temperatureRating}°C</Text>
          <Text style={styles.dataComment}>{temperatureComment}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.averageRatingContainer}>
            <Text style={styles.dataRating}>Average Rating: {averageRating}°C</Text>
            <Text style={styles.dataComment}>{averageComment}</Text>
          </View>    
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>History</Text>
        <FlatList
          data={temperatureHistory.slice().reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyDataContainer}>
              <Text style={styles.dataRating}>{`Recorded Temperature: ${item.rating}°C`}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Temperature;
