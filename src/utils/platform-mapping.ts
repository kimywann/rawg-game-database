export const platformIconMap: Record<string, string> = {
  pc: "/src/assets/icons/platforms/pc.svg",
  macos: "/src/assets/icons/platforms/macos.svg",
  linux: "/src/assets/icons/platforms/linux.svg",
  web: "/src/assets/icons/platforms/pc.svg", // 웹 플랫폼 추가

  playstation: "/src/assets/icons/platforms/playstation.svg",
  playstation5: "/src/assets/icons/platforms/playstation.svg",
  "playstation-5": "/src/assets/icons/platforms/playstation.svg",
  playstation4: "/src/assets/icons/platforms/playstation.svg",
  "playstation-4": "/src/assets/icons/platforms/playstation.svg",
  playstation3: "/src/assets/icons/platforms/playstation.svg",
  "playstation-3": "/src/assets/icons/platforms/playstation.svg",
  playstation2: "/src/assets/icons/platforms/playstation.svg",
  "playstation-2": "/src/assets/icons/platforms/playstation.svg",
  playstation1: "/src/assets/icons/platforms/playstation.svg",
  "playstation-1": "/src/assets/icons/platforms/playstation.svg",
  psp: "/src/assets/icons/platforms/playstation.svg",
  "ps-vita": "/src/assets/icons/platforms/playstation.svg",

  xbox: "/src/assets/icons/platforms/xbox.svg",
  "xbox-series-x": "/src/assets/icons/platforms/xbox.svg",
  "xbox-one": "/src/assets/icons/platforms/xbox.svg",
  "xbox-360": "/src/assets/icons/platforms/xbox.svg",
  xbox360: "/src/assets/icons/platforms/xbox.svg",
  "xbox-old": "/src/assets/icons/platforms/xbox.svg",

  nintendo: "/src/assets/icons/platforms/nintendo.svg",
  "nintendo-switch": "/src/assets/icons/platforms/nintendo.svg",
  "nintendo-3ds": "/src/assets/icons/platforms/nintendo.svg",
  "nintendo-ds": "/src/assets/icons/platforms/nintendo.svg",
  "wii-u": "/src/assets/icons/platforms/nintendo.svg",
  wii: "/src/assets/icons/platforms/nintendo.svg",
  gamecube: "/src/assets/icons/platforms/nintendo.svg",

  android: "/src/assets/icons/platforms/android.svg",
  ios: "/src/assets/icons/platforms/ios.svg",
};

export const platformGroups: Record<string, string[]> = {
  pc: ["pc"],
  macos: ["macos"],
  linux: ["linux"],
  web: ["web"], // 웹 플랫폼 그룹 추가
  playstation: [
    "playstation",
    "playstation5",
    "playstation-5",
    "playstation4",
    "playstation-4",
    "playstation3",
    "playstation-3",
    "playstation2",
    "playstation-2",
    "playstation1",
    "playstation-1",
    "psp",
    "ps-vita",
  ],
  xbox: [
    "xbox",
    "xbox-series-x",
    "xbox-one",
    "xbox-360",
    "xbox360",
    "xbox-old",
  ],
  nintendo: [
    "nintendo",
    "nintendo-switch",
    "nintendo-3ds",
    "nintendo-ds",
    "wii-u",
    "wii",
    "gamecube",
  ],
  android: ["android"],
  ios: ["ios"],
};

export const getPlatformIcon = (platformSlug: string): string | null => {
  return platformIconMap[platformSlug.toLowerCase()] || null;
};

export const getPlatformName = (platformSlug: string): string => {
  const nameMap: Record<string, string> = {
    pc: "PC",
    macos: "macOS",
    linux: "Linux",
    web: "Web",
    playstation5: "PS5",
    "playstation-5": "PS5",
    playstation4: "PS4",
    "playstation-4": "PS4",
    playstation3: "PS3",
    "playstation-3": "PS3",
    "xbox-series-x": "Xbox Series X/S",
    "xbox-one": "Xbox One",
    "xbox-360": "Xbox 360",
    xbox360: "Xbox 360",
    "nintendo-switch": "Nintendo Switch",
    android: "Android",
    ios: "iOS",
  };

  return nameMap[platformSlug.toLowerCase()] || platformSlug;
};

// 플랫폼 그룹별로 중복 제거하는 함수
export const getUniquePlatformGroups = (
  platforms: Array<{ platform: { slug: string; name: string; id: number } }>,
): string[] => {
  const foundGroups = new Set<string>();

  platforms.forEach(({ platform }) => {
    const slug = platform.slug.toLowerCase();

    // 어느 그룹에 속하는지 찾기
    for (const [groupKey, groupSlugs] of Object.entries(platformGroups)) {
      if (groupSlugs.includes(slug)) {
        foundGroups.add(groupKey);
        break;
      }
    }
  });

  return Array.from(foundGroups);
};
