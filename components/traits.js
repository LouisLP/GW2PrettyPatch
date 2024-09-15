// Function to identify traits in the text
function identifyTraits(text) {
  // This is a simplified version. You might need more complex pattern matching
  const traitPattern = /["']([^"']+)["']/g;
  return (text.match(traitPattern) || []).map((match) =>
    match.replace(/["']/g, "")
  );
}
