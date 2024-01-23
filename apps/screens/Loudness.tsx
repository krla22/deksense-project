import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../stylesheets/datastyles';

const Loudness = () => {
  const [loudnessRating, setLoudnessRating] = useState(70);
  const [loudnessComment, setLoudnessComment] = useState('');
  const [loudnessHistory, setLoudnessHistory] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageComment, setAverageComment] = useState('');

  useEffect(() => {
    const foundComment = loudnessComments.find(
      (item) => item.range[0] <= loudnessRating && loudnessRating <= item.range[1]
    );

    setLoudnessComment(foundComment ? foundComment.comment : '');

    const newArray = Array.from({ length: 12 }, (_, index) => ({
      rating: loudnessRating,
      comment: foundComment ? foundComment.comment : '',
    }));

    const sumRating = newArray.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(newArray.length, 10);

    const foundAvgComment = averageRatingComments.find(
      (item) => item.range[0] <= avgRating && avgRating <= item.range[1]
    );

    setAverageRating(avgRating);
    setAverageComment(foundAvgComment ? foundAvgComment.comment : '');

    setLoudnessHistory(newArray.slice(0, 10));
  }, [loudnessRating]);

  const loudnessComments = [
    { range: [20, 40], comment: 'The environment is quiet and great for concentration.' },
    { range: [41, 60], comment: 'The noise level is moderate; it may not cause significant issues.' },
    { range: [61, 80], comment: 'The environment is quite loud, and prolonged exposure may lead to hearing issues.' },
    { range: [81, 100], comment: 'The noise level is very high and will cause hearing damage! Consider using ear protection.' },
  ];

  const averageRatingComments = [
    { range: [20, 40], comment: 'Quiet rooms are relaxing and peaceful' },
    { range: [41, 60], comment: 'Normal loudness levels for busy places' },
    { range: [61, 80], comment: 'Long term exposure might cause ear damage' },
    { range: [81, 100], comment: 'Health Risk: You will get ear damage!' },
  ];

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text style={styles.dataTitle}>Loudness</Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.historyText}>Decibel Level</Text>
          <Text style={styles.dataRating}>Rating: {loudnessRating}dB</Text>
          <Text style={styles.dataComment}>{loudnessComment}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.averageRatingContainer}>
            <Text style={styles.dataRating}>Average Rating: {Math.round(averageRating)}dB</Text>
            <Text style={styles.dataComment}>{averageComment}</Text>
          </View>    
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>History</Text>
        <FlatList
          data={loudnessHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyDataContainer}>
              <Text style={styles.dataRating}>{`Rating: ${item.rating}dB`}</Text>
              <Text style={styles.dataComment}>{`${item.comment}`}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Loudness;
