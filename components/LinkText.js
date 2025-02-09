import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LinkText({ children }) {
  function onPress() {
    
  }
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        color: 'gray'
    }
});
