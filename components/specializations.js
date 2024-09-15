// Function to identify specializations in the text
function identifySpecializations(text) {
  // This would need to be populated with actual specialization names
  const specializationNames = [
    "Dragonhunter",
    "Berserker",
    "Scrapper" /* ... */,
  ];
  const specializationPattern = specializationNames.join("|");
  const regex = new RegExp(`\\b(${specializationPattern})\\b`, "g");
  return text.match(regex) || [];
}
