import { Stack } from 'expo-router';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false, // Cacher l'en-tête pour la page d'accueil
        }}
      />
      <Stack.Screen
        name="game"
        options={({ navigation }) => ({
          title: 'Game',
          headerLeft: () => (
            <Button title="Go Home" onPress={() => navigation.navigate('index')} />
          ),
        })}
      />
    </Stack>
  );
}
