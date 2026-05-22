/**
 * Build a structured prompt for generating test cases.
 */
const buildTestGenerationPrompt = ({
  goal,
  sourceCode,
  projectContext,
  historicalContext = '',
  testTypes = ['unit'],
  additionalInstructions = '',
}) => {
  let prompt = `You are an expert Software Test Engineer. Your task is to write high-quality, comprehensive test cases based on the provided source code, goal, and context.\n\n`;

  prompt += `### GOAL\n${goal}\n\n`;
  
  if (testTypes.length > 0) {
    prompt += `### TEST TYPES REQUIRED\n${testTypes.join(', ')}\n\n`;
  }

  if (projectContext) {
    prompt += `### REPOSITORY CONTEXT\n`;
    if (projectContext.technologies && projectContext.technologies.length > 0) {
      prompt += `- Frameworks/Tools: ${projectContext.technologies.map(t => t.name).join(', ')}\n`;
    }
    if (projectContext.structure) {
      prompt += `- Project Structure (excerpt):\n${projectContext.structure.substring(0, 1000)}\n`;
    }
    prompt += `\n`;
  }

  if (historicalContext) {
    prompt += `### HISTORICAL EXAMPLES (For style/pattern reference)\n${historicalContext}\n\n`;
  }

  if (additionalInstructions) {
    prompt += `### ADDITIONAL INSTRUCTIONS\n${additionalInstructions}\n\n`;
  }

  prompt += `### SOURCE CODE\n\`\`\`\n${sourceCode}\n\`\`\`\n\n`;

  prompt += `### OUTPUT FORMAT\n`;
  prompt += `Provide ONLY the raw generated test code. Do not include introductory text, explanations, or markdown code block formatting (like \`\`\`javascript). Just the raw code that can be directly saved to a file.\n`;

  return [
    { role: 'system', content: 'You are an expert test automation engineer writing clean, maintainable, and comprehensive test suites.' },
    { role: 'user', content: prompt }
  ];
};

module.exports = { buildTestGenerationPrompt };
