import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInput as TextInputType,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors, fontFamilies } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const CODE_LENGTH = 6;

const screenHeight = Platform.select<ViewStyle["height"]>({
  default: "100%",
  web: "100vh" as unknown as ViewStyle["height"],
});

const authCopy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    bottomText: "Already have an account?",
    bottomAction: "Log in",
    bottomHref: "/sign-in",
    initialEmail: "alex@gmail.com",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    button: "Sign In",
    bottomText: "Don't have an account?",
    bottomAction: "Sign up",
    bottomHref: "/sign-up",
    initialEmail: "alex@gmail.com",
  },
} as const;

const socialButtons = [
  { label: "Continue with Google", icon: "google", color: "#f44242" },
  { label: "Continue with Facebook", icon: "facebook", color: "#1877F2" },
  { label: "Continue with Apple", icon: "apple", color: colors.neutral.textPrimary },
] as const;

function AuthInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
}) {
  return (
    <View className="h-[64px] justify-center rounded-[22px] border border-border bg-white px-5">
      <Text className="font-poppins-medium text-[12px] leading-[20px] text-[#737A9A]">
        {label}
      </Text>
      <View className="flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.authInput}
          underlineColorAndroid="transparent"
        />
        {secureTextEntry ? (
          <Feather name="eye" size={24} color="#737A9A" />
        ) : null}
      </View>
    </View>
  );
}

function SocialButton({
  label,
  icon,
  color,
}: {
  label: string;
  icon: (typeof socialButtons)[number]["icon"];
  color: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.socialButton}>
      <FontAwesome name={icon} size={28} color={color} />
      <Text className="font-poppins-medium text-[14px] leading-[20px] text-text-primary">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function VerificationModal({
  visible,
  email,
  onClose,
}: {
  visible: boolean;
  email: string;
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInputType>(null);
  const navigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      const focusTimeout = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(focusTimeout);
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, []);

  const handleCodeChange = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(nextCode);

    if (nextCode.length === CODE_LENGTH) {
      navigationTimeout.current = setTimeout(() => {
        onClose();
        router.replace("/");
      }, 200);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalKeyboardView}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.modalBackdrop}
        />
        <View style={styles.modalCard}>
          <View className="items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-[#F2EEFF]">
              <Feather name="mail" size={25} color={colors.primary.linguaDeepPurple} />
            </View>
            <Text className="font-poppins-bold text-[24px] leading-[31px] text-text-primary">
              Check your email
            </Text>
            <Text className="max-w-[300px] text-center font-poppins-regular text-[14px] leading-[22px] text-[#737A9A]">
              We sent a verification code to {email || "your email"}. Enter it below
              to continue.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.codeRow}
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.codeBox,
                  code[index] ? styles.codeBoxFilled : null,
                  code.length === index ? styles.codeBoxFocused : null,
                ]}
              >
                <Text style={styles.codeDigit}>{code[index] ?? ""}</Text>
              </View>
            ))}
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={CODE_LENGTH}
            style={styles.hiddenCodeInput}
            underlineColorAndroid="transparent"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const copy = authCopy[mode];
  const [email, setEmail] = useState<string>(copy.initialEmail);
  const [password, setPassword] = useState<string>("password1");
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const isSignUp = mode === "sign-up";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-[430px] flex-1">
          {/* <Link href="/onboarding" asChild>
            <TouchableOpacity activeOpacity={0.75} style={styles.backButton}>
              <Feather name="chevron-left" size={35} color={colors.neutral.textPrimary} />
            </TouchableOpacity>
          </Link> */}

          <View className="mt-[24px]">
            <Text className="font-poppins-bold text-[30px] text-text-primary">
              {copy.title}
            </Text>
            <Text className="mt-[8px] font-poppins-regular text-[16px] leading-[24px] text-[#69708A]">
              {copy.subtitle}
            </Text>
          </View>

          <View className="relative mt-[24px] h-[182px] items-center">
            <Text className="absolute left-[87px] top-[58px] z-10 text-[22px] text-[#FF8A00]">
              ✦
            </Text>
            <Text className="absolute right-[84px] top-[74px] z-10 text-[21px] text-[#6EA8FF]">
              ✦
            </Text>
            <Text className="absolute right-[98px] top-[112px] z-10 text-[22px] text-[#FFC800]">
              ✦
            </Text>
            <Image
              source={images.mascotAuth}
              contentFit="contain"
              style={styles.mascotImage}
            />
          </View>

          <View className="gap-4">
            <AuthInput label="Email" value={email} onChangeText={setEmail} />
            {isSignUp ? (
              <AuthInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            ) : null}

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setIsVerificationVisible(true)}
              style={styles.primaryButton}
            >
              <Text className="font-poppins-semibold text-[14px] leading-[20px] text-white">
                {copy.button}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-[24px] flex-row items-center gap-6">
            <View className="h-px flex-1 bg-border" />
            <Text className="font-poppins-regular text-[16px] leading-[22px] text-[#737A9A]">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="gap-4">
            {socialButtons.map((button) => (
              <SocialButton key={button.label} {...button} />
            ))}
          </View>

          <View className="flex-1 justify-end pb-4 pt-10">
            <View className="flex-row justify-center">
              <Text className="font-poppins-regular text-[16px] leading-[24px] text-[#737A9A]">
                {copy.bottomText}{" "}
              </Text>
              <Link href={copy.bottomHref} asChild>
                <TouchableOpacity activeOpacity={0.75}>
                  <Text className="font-poppins-semibold text-[16px] leading-[24px] text-lingua-deep-purple">
                    {copy.bottomAction}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={isVerificationVisible}
        email={email}
        onClose={() => setIsVerificationVisible(false)}
      />
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
    minHeight: screenHeight,
    paddingBottom: 38,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    marginLeft: -7,
    width: 44,
  },
  mascotImage: {
    height: 220,
    marginTop: 10,
    width: 260,
  },
  authInput: {
    color: colors.neutral.textPrimary,
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    padding: 0,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primary.linguaDeepPurple,
    borderBottomColor: "#402BD6",
    borderBottomWidth: 4,
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
  },
  socialButton: {
    alignItems: "center",
    borderColor: "#EEF0F6",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 24,
    height: 64,
    paddingHorizontal: 48,
  },
  modalKeyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 19, 43, 0.38)",
  },
  modalCard: {
    backgroundColor: colors.neutral.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    gap: 28,
    paddingBottom: 38,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  codeBox: {
    alignItems: "center",
    borderColor: colors.neutral.border,
    borderRadius: 15,
    borderWidth: 1,
    height: 54,
    justifyContent: "center",
    width: 48,
  },
  codeBoxFilled: {
    borderColor: colors.primary.linguaDeepPurple,
  },
  codeBoxFocused: {
    borderColor: colors.primary.linguaDeepPurple,
    borderWidth: 2,
  },
  codeDigit: {
    color: colors.neutral.textPrimary,
    fontFamily: fontFamilies.semiBold,
    fontSize: 22,
    lineHeight: 28,
  },
  hiddenCodeInput: {
    height: 1,
    opacity: 0,
    position: "absolute",
    width: 1,
  },
});
