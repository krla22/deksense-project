import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Welcome' />
        <Stack.Screen name='Simple' />
        <Stack.Screen name='Basic' />
    </Stack>
  )
}

export default _layout