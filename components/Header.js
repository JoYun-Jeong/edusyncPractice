import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>EDU SYNC</Text>
        <View style={{padding: 8}}>
          <Ionicons name="alarm-outline" size={24} color={'lightgray'}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});
