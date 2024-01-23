import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Humidity = () => {
  const [humidityRating, setHumidityRating] = useState(40);
  const [humidityComment, setHumidityComment] = useState('');

  useEffect(() => {
    // Find the corresponding comment based on the current humidity rating
    const foundComment = humidityComments.find(
      (item) => item.range[0] <= humidityRating && humidityRating <= item.range[1]
    );

    // Set the comment to the state
    setHumidityComment(foundComment ? foundComment.comment : '');
  }, [humidityRating]);

  const humidityComments = [
    { range: [0, 30], comment: 'The air is very dry, which may cause discomfort and respiratory issues.' },
    { range: [31, 60], comment: 'The humidity level is within the comfortable range for most people.' },
    { range: [61, 100], comment: 'High humidity may lead to a muggy feeling and promote mold growth, impacting respiratory health.' },
  ];

  return (
    <ScrollView >
      <View>
        <Text>Humidity</Text>
      </View>
      <View>
        <View>
          <Text>Current Humidity Data</Text>
          <Text>Rating: {humidityRating}%</Text>
          <Text>Comment: {humidityComment}</Text>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default Humidity;
