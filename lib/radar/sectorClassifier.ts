export const SECTORS = {
  INSAAT: ["demir", "çimento", "beton", "tuğla", "seramik", "boya", "mermer"],
  GIDA: ["bakliyat", "yağ", "şeker", "un", "zeytin", "peynir", "et", "meyve"],
  TEKSTIL: ["kumaş", "iplik", "pamuk", "dikim", "hazır giyim", "tekstil"],
  ENERJI: ["güneş", "panel", "trafo", "elektrik", "yakıt", "akaryakıt"]
};

export function autoClassify(text: string): string {
  const lowerText = text.toLowerCase();
  for (const [sector, keywords] of Object.entries(SECTORS)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return sector;
    }
  }
  return "GENEL_TICARET";
}
