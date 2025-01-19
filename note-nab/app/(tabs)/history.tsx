import { StyleSheet, Image, Platform, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HistoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </ThemedView>
      <ThemedText>Your previously nabbed notes.</ThemedText>
      <Collapsible title="Coming soon">
        <ThemedText>This isn't working yet.</ThemedText>
      </Collapsible>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  handwritingMode: {
    fontFamily: 'Cursive',
    fontSize: 20,
  },
  typeWriter: {
    fontFamily: 'American Typewriter',
    fontSize: 18,
  },
  appContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 8,
  },
});
