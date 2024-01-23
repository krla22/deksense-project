import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../stylesheets/datastyles';

const Humidity = () => {
  const [humidityRating, setHumidityRating] = useState(40);
  const [humidityComment, setHumidityComment] = useState('');
  const [humidityHistory, setHumidityHistory] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageComment, setAverageComment] = useState('');

  useEffect(() => {
    const foundComment = humidityComments.find(
      (item) => item.range[0] <= humidityRating && humidityRating <= item.range[1]
    );

    setHumidityComment(foundComment ? foundComment.comment : '');

    const newArray = Array.from({ length: 12 }, (_, index) => ({
      rating: humidityRating,
      comment: foundComment ? foundComment.comment : '',
    }));

    const sumRating = newArray.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(newArray.length, 10);

    const foundAvgComment = averageRatingComments.find(
      (item) => item.range[0] <= avgRating && avgRating <= item.range[1]
    );

    setAverageRating(avgRating);
    setAverageComment(foundAvgComment ? foundAvgComment.comment : '');

    setHumidityHistory(newArray.slice(0, 10));
  }, [humidityRating]);

  const humidityComments = [
    { range: [0, 30], comment: 'The air is very dry, which may cause discomfort and respiratory issues.' },
    { range: [31, 60], comment: 'The humidity level is within the comfortable range for most people.' },
    { range: [61, 100], comment: 'High humidity may lead to a muggy feeling and promote mold growth, impacting respiratory health.' },
  ];

  const averageRatingComments = [
    { range: [0, 30], comment: 'Your air is dry; this is bad for your skin' },
    { range: [31, 60], comment: 'Healthy humidity! No issues will arise' },
    { range: [61, 100], comment: 'Your air is very humid. Respiratory issues might occur' },
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
          data={humidityHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyDataContainer}>
              <Text style={styles.dataRating}>{`Rating: ${item.rating}%`}</Text>
              <Text style={styles.dataComment}>{`${item.comment}`}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Humidity;
