import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import styles from '../../stylesheets/datastyles';
import { FIREBASE_AUTH, FIRESTORE_DB, REALTIME_DB } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, update } from 'firebase/database';

const Humidity = () => {
  const [humidityRating, setHumidityRating] = useState(40);
  const [humidityComment, setHumidityComment] = useState('');
  const [humidityHistory, setHumidityHistory] = useState([]);
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
        averageHumidityRating: averageRating,
        averageHumidityComment: averageComment,
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
    const updateHumidityData = () => {
      const newHumidityRating = Math.floor(Math.random() * 101);
      setHumidityRating(newHumidityRating);
      setUpdateCounter((prevCounter) => prevCounter + 1);
    };

    const intervalId = setInterval(updateHumidityData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const foundComment = humidityComments.find(
      (item) => item.range[0] <= humidityRating && humidityRating <= item.range[1]
    );
  
    setHumidityComment(foundComment ? foundComment.comment : '');
  
    const newArray = Array.from({ length: 10 }, (_, index) => ({
      rating: humidityRating,
      comment: foundComment ? foundComment.comment : '',
    }));
  
    setHumidityHistory((prevHistory) => [...prevHistory.slice(-9), newArray[0]]);
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }, [humidityRating]);
  
  useEffect(() => {
    const lastTenRatings = humidityHistory.slice(-10);
    const sumRating = lastTenRatings.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(lastTenRatings.length, 1);

    const foundAvgComment = averageRatingComments.reduce((closest, current) => {
        const currentDiff = Math.abs(avgRating - (current.range[0] + current.range[1]) / 2);
        const closestDiff = Math.abs(avgRating - (closest.range[0] + closest.range[1]) / 2);

        return currentDiff < closestDiff ? current : closest;
    });

    setAverageRating(parseFloat(avgRating.toFixed(2)));
    setAverageComment(foundAvgComment.comment);
}, [humidityHistory, updateCounter]);

  const humidityComments = [
    { range: [0, 20], comment: 'Extremely dry conditions. Consider moisturizing.' },
    { range: [21, 40], comment: 'Low humidity. Skin and respiratory care advised.' },
    { range: [41, 60], comment: 'Optimal humidity for comfort and well-being.' },
    { range: [61, 80], comment: 'Moderate humidity. Watch for potential discomfort.' },
    { range: [81, 100], comment: 'High humidity levels. Be mindful of respiratory effects.' },
  ];

  const averageRatingComments = [
    { range: [0, 20], comment: 'Extremely dry air.' },
    { range: [21, 40], comment: 'Dry air. Consider using a humidifier.' },
    { range: [41, 60], comment: 'Comfortable humidity levels.' },
    { range: [61, 80], comment: 'Humid air. Be cautious with respiratory issues.' },
    { range: [81, 100], comment: 'Very humid. May cause discomfort and respiratory issues.' },
  ];

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text style={styles.dataTitle}>Loudness</Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.historyText}>Decibel Level</Text>
          <Text style={styles.dataRating}>Rating: {humidityRating}%</Text>
          <Text style={styles.dataComment}>{humidityComment}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.averageRatingContainer}>
            <Text style={styles.dataRating}>Average Rating: {Math.round(averageRating)}%</Text>
            <Text style={styles.dataComment}>{averageComment}</Text>
          </View>    
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>History</Text>
        <FlatList
          data={humidityHistory.slice().reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyDataContainer}>
              <Text style={styles.dataRating}>{`Humidity Level: ${item.rating}%`}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Humidity;
