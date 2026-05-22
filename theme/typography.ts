import { fontFamilies } from "./fonts";

export const typography = {
  h1: {
    label: "Page / Screen Title",
    fontSize: 32,
    lineHeight: 38.4,
    fontFamily: fontFamilies.bold,
  },
  h2: {
    label: "Section Title",
    fontSize: 24,
    lineHeight: 31.2,
    fontFamily: fontFamilies.semiBold,
  },
  h3: {
    label: "Card / Module Title",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fontFamilies.semiBold,
  },
  h4: {
    label: "Subheading",
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: fontFamilies.medium,
  },
  bodyLarge: {
    label: "Important content",
    fontSize: 16,
    lineHeight: 25.6,
    fontFamily: fontFamilies.regular,
  },
  bodyMedium: {
    label: "Body text",
    fontSize: 14,
    lineHeight: 22.4,
    fontFamily: fontFamilies.regular,
  },
  bodySmall: {
    label: "Supporting text",
    fontSize: 13,
    lineHeight: 20.8,
    fontFamily: fontFamilies.regular,
  },
  caption: {
    label: "Labels, meta text",
    fontSize: 11,
    lineHeight: 15.4,
    fontFamily: fontFamilies.regular,
  },
} as const;

export type TypographyRole = keyof typeof typography;
