import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../stylesheets/datastyles';

const Posture = () => {
  const [postureRating, setPostureRating] = useState(7);
  const [postureComment, setPostureComment] = useState('');

  useEffect(() => {
    // Find the corresponding comment based on the current posture rating
    const foundComment = postureComments.find(
      (item) => item.range[0] <= postureRating && postureRating <= item.range[1]
    );

    // Set the comment to the state
    setPostureComment(foundComment ? foundComment.comment : '');
  }, [postureRating]);

  const postureComments = [
    { range: [1, 3], comment: 'Your posture is horrible! This is bad for your back!' },
    { range: [4, 5], comment: 'Your posture could be better' },
    { range: [6, 7], comment: 'Your posture is good' },
    { range: [8, 10], comment: 'Your posture is excellent' },
  ];

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text style={styles.dataTitle}>Posture</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.innerContainer}>
          <Text>Current Posture Data</Text>
          <Text style={styles.dataRating}>Rating: {postureRating}</Text>
          <Text style={styles.dataComment}>Comment: {postureComment}</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text>Posture Data History</Text>
          <Text>Show previous posture data history up to 10 lines only</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Posture;
