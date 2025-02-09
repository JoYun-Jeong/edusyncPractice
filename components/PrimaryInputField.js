import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PrimaryInputField({ children, placeholder, style }) {
  let IsPwd =
    placeholder === undefined ? (
      <Pressable>
        <Ionicons name="eye-off" size={24} color={"black"} />
      </Pressable>
    ) : null;

  return (
    <View style={[styles.container, style]}>
      <Text>{children}</Text>
      <View style={styles.textInputContainer}>
        <TextInput placeholder={placeholder} style={{flex: 1}} />
        {IsPwd}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderBottomColor: '#00000022',
    },
    textInputContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
