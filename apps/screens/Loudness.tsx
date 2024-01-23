import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Loudness = () => {
  const [loudnessRating, setLoudnessRating] = useState(70);
  const [loudnessComment, setLoudnessComment] = useState('');

  useEffect(() => {
    // Find the corresponding comment based on the current loudness rating
    const foundComment = loudnessComments.find(
      (item) => item.range[0] <= loudnessRating && loudnessRating <= item.range[1]
    );

    // Set the comment to the state
    setLoudnessComment(foundComment ? foundComment.comment : '');
  }, [loudnessRating]);

  const loudnessComments = [
    { range: [20, 40], comment: 'The environment is quiet and conducive for concentration.' },
    { range: [41, 60], comment: 'The noise level is moderate; it may not cause significant issues.' },
    { range: [61, 80], comment: 'The environment is quite loud, and prolonged exposure may lead to hearing issues.' },
    { range: [81, 100], comment: 'The noise level is very high and will cause hearing damage! Consider using ear protection.' },
  ];

  return (
    <ScrollView >
      <View>
        <Text>Loudness</Text>
      </View>
      <View>
        <View>
          <Text>Current Loudness Data</Text>
          <Text>Rating: {loudnessRating} dB</Text>
          <Text>Comment: {loudnessComment}</Text>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default Loudness;
