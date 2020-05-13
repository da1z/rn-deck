import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Deck from 'rn-deck';

const DATA = [
  {
    id: '1',
    text: 'Card #1',
    uri: 'https://loremflickr.com/320/240',
  },
  {
    id: '2',
    text: 'Card #2',
    uri: 'https://loremflickr.com/320/240',
  },
  {
    id: '3',
    text: 'Card #3',
    uri: 'https://loremflickr.com/320/240',
  },
  {
    id: '4',
    text: 'Card #4',
    uri: 'https://loremflickr.com/320/240',
  },
];
export default function App() {
  const renderCard = (item) => {
    return <Card key={item.id} title={item.text} image={{ uri: item.uri }} />;
  };

  const renderNomoreCard = () => {
    return <Text>No cards!</Text>;
  };

  return (
    <View style={styles.container}>
      <Deck
        key={DATA}
        data={DATA}
        renderCard={renderCard}
        renderNomoreCard={renderNomoreCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
