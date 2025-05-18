import { View, Image } from 'react-native';

export default function TabIcon({ focused, icon, iconFocused }) {
  const iconSize = focused ? 30 : 28;

  return (
    <View
      style={{
        backgroundColor: focused ? '#00B031' : 'transparent',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: '2%',
      }}
    >
      <Image
        source={focused ? iconFocused : icon}
        style={{
          width: iconSize,
          height: iconSize,
        }}
      />
    </View>
  );
}
