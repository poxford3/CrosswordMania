import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Edit app/index.tsx to edit this screen.</ThemedText>
      <Link href={"/home"}>
        <ThemedText>
          Go To home
        </ThemedText>
      </Link>
      <View style={{height: 80}} />
      <Link href={"/login"}>
        <ThemedText>
          Go To login
        </ThemedText>
      </Link>
    </ThemedView>
  );
}
