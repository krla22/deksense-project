import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from 'firebase/firestore';
import styles from '../../stylesheets/datastyles';

const Temperature = () => {
  const [temperatureRating, setTemperatureRating] = useState(35);
  const [temperatureComment, setTemperatureComment] = useState('');
  const [temperatureHistory, setTemperatureHistory] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageComment, setAverageComment] = useState('');

  useEffect(() => {
    const foundComment = temperatureComments.find(
      (item) => item.range[0] <= temperatureRating && temperatureRating <= item.range[1]
    );

    setTemperatureComment(foundComment ? foundComment.comment : '');

    const newArray = Array.from({ length: 12 }, (_, index) => ({
      rating: temperatureRating,
      comment: foundComment ? foundComment.comment : '',
    }));

    const sumRating = newArray.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(newArray.length, 10);

    const foundAvgComment = averageRatingComments.find(
      (item) => item.range[0] <= avgRating && avgRating <= item.range[1]
    );

    setAverageRating(avgRating);
    setAverageComment(foundAvgComment ? foundAvgComment.comment : '');

    setTemperatureHistory(newArray.slice(0, 10));
  }, [temperatureRating]);

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
          <Text style={styles.dataRating}>Rating: {temperatureRating}</Text>
          <Text style={styles.dataComment}>Comment: {temperatureComment}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.averageRatingContainer}>
            <Text style={styles.dataRating}>Average Rating: {Math.round(averageRating)}</Text>
            <Text style={styles.dataComment}>{averageComment}</Text>
          </View>    
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>History</Text>
        <FlatList
          data={temperatureHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyDataContainer}>
              <Text style={styles.dataRating}>{`Rating: ${item.rating}`}</Text>
              <Text style={styles.dataComment}>{`${item.comment}`}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Temperature;
