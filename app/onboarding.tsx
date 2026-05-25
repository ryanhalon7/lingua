import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const screenHeight = Platform.select<ViewStyle["height"]>({
  default: "100%",
  web: "100vh" as unknown as ViewStyle["height"],
});

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[430px] flex-1">

          {/* Logo */}
          <View className="items-center pt-10">
            <View className="flex-row items-center justify-center gap-0.5">
              <Image
                source={images.mascotLogo}
                contentFit="contain"
                 className="h-16 w-16"
              />              
              <Text className="font-poppins-bold h2 text-text-primary">
                lingua
              </Text>
            </View>
          </View>

          {/* Title */}
          <View className="mt-[24px]">
            <Text className="font-poppins-bold h1 text-text-primary">
              Your AI language{"\n"}
              <Text className="text-lingua-deep-purple">teacher.</Text>
            </Text>
            <Text className="mt-[8px] text-[16px] text-[#69708A]">
              Real conversations, personalized{"\n"}
              lessons, anytime, anywhere.
            </Text>
          </View>

          {/* Bubbles + Mascot */}
          <View className="relative mt-[24px] h-[360px] w-full">
            <View className="absolute left-[6px] top-[42px] z-10 rotate-[-11deg]">
              <View className="rounded-[20px] bg-[#EEF7FF] px-5 py-3">
                <Text className="font-poppins-medium text-[18px] leading-[31px] text-text-primary">
                  Hello!
                </Text>
              </View>
              <View style={[styles.bubbleTail, styles.helloTail]} />
            </View>

            <View className="absolute right-[26px] top-[-10px] z-10 rotate-[11deg]">
              <View className="rounded-[18px] bg-[#F5F3FF] px-5 py-3">
                <Text className="font-poppins-medium text-[18px] italic leading-[31px] text-lingua-deep-purple">
                  ¡Hola!
                </Text>
              </View>
              <View style={[styles.bubbleTail, styles.holaTail]} />
            </View>

            <View className="absolute right-[-2px] top-[60px] z-10 rotate-[10deg]">
              <View className="rounded-[17px] bg-[#FFF4EE] px-5 py-3">
                <Text className="font-poppins-medium text-[18px] leading-[21px] text-[#FF4D3D]">
                  你好!
                </Text>
              </View>
              <View style={[styles.bubbleTail, styles.nihaoTail]} />
            </View>

            <Image
              source={images.mascotWelcome}
              contentFit="contain"
              className="absolute h-[360px] w-[360px] left-0 top-[-10px]"
            />
          </View>

          {/* Button */}
          <Link href="/sign-up" asChild>
            <TouchableOpacity activeOpacity={0.88} style={styles.primaryButton}>
              <Text className="font-poppins-semibold text-[14px] text-white">
                 Get Started
               </Text>            
              <Feather name="chevron-right" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.neutral.background,
    flex: 1,
    height: screenHeight,
  },
  scroll: {
    backgroundColor: colors.neutral.background,
    flex: 1,
    height: screenHeight,
  },
  scrollContent: {
    alignItems: "center",
    flexGrow: 1,
    height: screenHeight,
    justifyContent: "space-between",
    paddingBottom: 38,
    paddingHorizontal: 28,
  },
  bubbleTail: {
    height: 18,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    width: 18,
  },
  helloTail: {
    backgroundColor: "#EEF7FF",
    bottom: -9,
    right: 26,
  },
  holaTail: {
    backgroundColor: "#F5F3FF",
    bottom: -8,
    left: 24,
  },
  nihaoTail: {
    backgroundColor: "#FFF4EE",
    bottom: -8,
    left: 22,
  },
  logoImage: {
    height: 64,
    width: 64,
  },

  primaryButton: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.primary.linguaDeepPurple,
    borderBottomColor: "#402BD6",
    borderBottomWidth: 4,
    borderRadius: 22,
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
    marginBottom: 16,
    gap: 4,
  },
});
