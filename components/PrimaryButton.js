import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PrimaryButton({ children, onPress, style, textStyle }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
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