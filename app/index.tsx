import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors, typography } from "@/theme";

const primaryColors = [
  ["LINGUA PURPLE", colors.primary.linguaPurple],
  ["LINGUA DEEP PURPLE", colors.primary.linguaDeepPurple],
  ["LINGUA BLUE", colors.primary.linguaBlue],
  ["LINGUA GREEN", colors.primary.linguaGreen],
] as const;

const semanticColors = [
  ["SUCCESS", colors.semantic.success],
  ["WARNING", colors.semantic.warning],
  ["STREAK", colors.semantic.streak],
  ["ERROR", colors.semantic.error],
  ["INFO", colors.semantic.info],
] as const;

const neutralColors = [
  ["TEXT / PRIMARY", colors.neutral.textPrimary],
  ["TEXT / SECONDARY", colors.neutral.textSecondary],
  ["BORDER", colors.neutral.border],
  ["SURFACE", colors.neutral.surface],
  ["BACKGROUND", colors.neutral.background],
] as const;

const typographyRows = [
  ["H1", typography.h1.label, "32px", "Bold", "1.2", "h1"],
  ["H2", typography.h2.label, "24px", "SemiBold", "1.3", "h2"],
  ["H3", typography.h3.label, "20px", "SemiBold", "1.3", "h3"],
  ["H4", typography.h4.label, "16px", "Medium", "1.4", "h4"],
  ["Body Large", typography.bodyLarge.label, "16px", "Regular", "1.6", "body-large"],
  ["Body Medium", typography.bodyMedium.label, "14px", "Regular", "1.6", "body-medium"],
  ["Body Small", typography.bodySmall.label, "13px", "Regular", "1.6", "body-small"],
  ["Caption", typography.caption.label, "11px", "Regular", "1.4", "caption"],
] as const;

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="gap-2">
      <Text className="eyebrow">{title}</Text>
      <View className="design-system__divider" />
    </View>
  );
}

function ColorSwatch({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-[108px] gap-3">
      <View
        style={[styles.swatchTile, { backgroundColor: value }]}
      />
      <View className="gap-1">
        <Text className="caption font-poppins-semibold uppercase text-text-secondary">
          {label}
        </Text>
        <Text className="body-small text-text-secondary">{value}</Text>
      </View>
    </View>
  );
}

function ColorGroup({
  title,
  swatches,
}: {
  title: string;
  swatches: readonly (readonly [string, string])[];
}) {
  return (
    <View className="gap-4">
      <Text className="section-label">{title}</Text>
      <View className="flex-row flex-wrap gap-x-9 gap-y-8">
        {swatches.map(([label, value]) => (
          <ColorSwatch key={label} label={label} value={value} />
        ))}
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[1480px] gap-6 web:flex-row">
          <View className="flex-1 gap-5">

            {/* Brand Section */}
            <View className="design-system__card gap-8 p-9">
              <SectionHeader title="Brand" />
              <View className="items-center justify-center gap-7 py-2 min-[560px]:flex-row">
                <Image
                  source={images.mascotLogo}
                  contentFit="contain"
                  className="h-[128px] w-[128px]"
                />
                <Text className="brand__wordmark">lingua</Text>
              </View>
              <Link href="/onboarding" asChild>
                <TouchableOpacity activeOpacity={0.88} style={styles.onboardingLink}>
                  <Text className="font-poppins-semibold text-[16px] leading-[22px] text-white">
                    Open Onboarding
                  </Text>
                  <Feather name="chevron-right" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </Link>
            </View>

            {/* Colors Section */}
            <View className="design-system__card gap-8 p-9">
              <SectionHeader title="Colors" />
              <ColorGroup title="Primary" swatches={primaryColors} />
              <ColorGroup title="Semantic" swatches={semanticColors} />
              <ColorGroup title="Neutrals" swatches={neutralColors} />
            </View>
          </View>

          <View className="design-system__card flex-1 gap-8 p-9">
            <SectionHeader title="Typography" />
            <View className="gap-4">
              <Text className="section-label">Font Family</Text>
              <Text className="text-[64px] leading-[76.8px] font-poppins-bold text-text-primary">
                Poppins
              </Text>
              <Text className="body-large text-text-secondary max-w-[560px]">
                Poppins is a modern, geometric sans-serif typeface that provides
                excellent readability and a friendly personality.
              </Text>
            </View>

            <View className="gap-9 pt-4">
              {typographyRows.map(([name, role, size, weight, leading, className]) => (
                <View
                  key={name}
                  className="gap-3 min-[680px]:flex-row min-[680px]:items-center"
                >
                  <Text className={`${className} min-[680px]:w-[160px]`}>
                    {name}
                  </Text>
                  <Text className="body-medium text-text-secondary min-[680px]:flex-1">
                    {role}
                  </Text>
                  <Text className="body-medium text-text-secondary min-[680px]:w-[92px]">
                    {size}
                  </Text>
                  <Text className="body-medium text-text-secondary min-[680px]:w-[108px]">
                    {weight}
                  </Text>
                  <Text className="body-medium text-text-secondary min-[680px]:w-[48px]">
                    {leading}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  scroll: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    padding: 24,
  },
  swatchTile: {
    borderColor: colors.neutral.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 82,
    width: 108,
  },
  onboardingLink: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.primary.linguaDeepPurple,
    borderBottomColor: "#402BD6",
    borderBottomWidth: 3,
    borderRadius: 16,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 22,
  },
});
