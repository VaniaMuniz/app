import * as React from 'react';
//bibliotecas
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = React.useState();

  //função para adicionar o audio, este esta sendo direcionado para o link
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      "http://assets.gospelmais.com.br/biblia/jo/jo_4.mp3?_=1"
      //  require('./assets/Hello.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  const onPause = () =>{
    sound?sound.pauseAsync():undefined
  }
//Função play e pause (precisa melhorar)
  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      {sound&&
      <Button title="Pause Sound" onPress={onPause} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#132440', 
    padding: 10,
  },
});
