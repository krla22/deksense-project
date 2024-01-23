import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from 'firebase/firestore';

const Temperature = () => {
  const [temperatureRating, setTemperatureRating] = useState(30);
  const [temperatureComment, setTemperatureComment] = useState('');

  useEffect(() => {
    const foundComment = temperatureComments.find(
      (item) => item.range[0] <= temperatureRating && temperatureRating <= item.range[1]
    );

    // Set the comment to the state
    setTemperatureComment(foundComment ? foundComment.comment : '');
  }, [temperatureRating]);

  const temperatureComments = [
    { range: [20, 25], comment: 'It is too cold, consider warming up.' },
    { range: [26, 30], comment: 'The temperature is comfortable.' },
    { range: [31, 35], comment: 'It is getting warm, stay cool.' },
    { range: [36, 40], comment: 'It is hot, make sure to stay hydrated.' },
    { range: [41, 50], comment: 'It is extremely hot, take necessary precautions.' },
  ];
  
  return (
    <ScrollView>
      <View>
        <Text>Temperature</Text>
      </View>
      <View>
        <View>
          <Text>Current Temperature Data</Text>
          <Text>Temperature: {temperatureRating}°C</Text>
          <Text>Comment: {temperatureComment}</Text>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

export default Temperature;
