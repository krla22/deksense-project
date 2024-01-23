import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../stylesheets/datastyles';

const Posture = () => {
  const [postureRating, setPostureRating] = useState(7);
  const [postureComment, setPostureComment] = useState('');
  const [postureHistory, setPostureHistory] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageComment, setAverageComment] = useState('');

  useEffect(() => {
    const foundComment = postureComments.find(
      (item) => item.range[0] <= postureRating && postureRating <= item.range[1]
    );

    setPostureComment(foundComment ? foundComment.comment : '');

    const newArray = Array.from({ length: 12 }, (_, index) => ({
      rating: postureRating,
      comment: foundComment ? foundComment.comment : '',
    }));

    const sumRating = newArray.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = sumRating / Math.max(newArray.length, 10);

    const foundAvgComment = averageRatingComments.find(
      (item) => item.range[0] <= avgRating && avgRating <= item.range[1]
    );

    setAverageRating(avgRating);
    setAverageComment(foundAvgComment ? foundAvgComment.comment : '');

    setPostureHistory(newArray.slice(0, 10));
  }, [postureRating]);

  const postureComments = [
    { range: [1, 2], comment: 'Your posture is horrible! This is bad for your back!' },
    { range: [3, 4], comment: 'Your posture could definitely do better' },
    { range: [5, 6], comment: 'Your posture looks okay' },
    { range: [7, 8], comment: 'Your posture is good' },
    { range: [9, 10], comment: 'Your posture is excellent!' },
  ];

  const averageRatingComments = [
    { range: [0, 2], comment: 'This is a health risk! Please care for your posture' },
    { range: [3, 4], comment: 'Your posture is unhealthy and can cause health risks' },
    { range: [5, 6], comment: 'Sit straight, you could do better' },
    { range: [7, 8], comment: 'Good! Your back will thank you!' },
    { range: [9, 10], comment: 'Your posture is perfect!' },
  ];

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text style={styles.dataTitle}>Posture</Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.historyText}>Current Posture</Text>
          <Text style={styles.dataRating}>Rating: {postureRating}</Text>
          <Text style={styles.dataComment}>Comment: {postureComment}</Text>
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
          data={postureHistory}
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

export default Posture;
