// Function to identify skills in the text
function identifySkills(text) {
  // Similar to traits, this might need more complex pattern matching
  const skillPattern = /["']([^"']+)["']/g;
  return (text.match(skillPattern) || []).map((match) =>
    match.replace(/["']/g, "")
  );
}
