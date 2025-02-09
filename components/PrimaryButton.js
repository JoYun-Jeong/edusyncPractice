import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PrimaryButton({ children, onPress }) {
  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'blue',
        borderRadius: 8,
        marginVertical: 32
    },
    text: {
        color: 'white',
        fontSize: 16
    }
});