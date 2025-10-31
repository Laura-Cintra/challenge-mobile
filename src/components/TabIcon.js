import { Image } from "react-native";
import { MotiView } from "moti";

export default function TabIcon({ focused, icon, iconFocused }) {
  const iconSize = focused ? 30 : 28;

  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{
        opacity: 1,
        backgroundColor: focused ? "#00B031" : "transparent",
      }}
      transition={{
        type: "timing",
        duration: 250,
      }}
      style={{
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: "2%",
      }}
    >
      <Image
        source={focused ? iconFocused : icon}
        style={{
          width: iconSize,
          height: iconSize,
        }}
      />
    </MotiView>
  );
}