import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

export interface CorrectionResult {
  correctedContent: string;
  corrections: {
    grammar: number;
    style: number;
    clarity: number;
  };
}

const stylePrompts = {
  professional: "Convert this text to a professional, formal, business-appropriate style with clear and concise language.",
  casual: "Convert this text to a casual, conversational, friendly tone that's easy to read and engaging.",
  academic: "Convert this text to an academic style with scholarly language, precise terminology, and research-oriented tone.",
  creative: "Convert this text to a creative, expressive, imaginative style with artistic and engaging language."
};

export async function correctGrammar(
  content: string, 
  writingStyle: keyof typeof stylePrompts
): Promise<CorrectionResult> {
  try {
    const prompt = `${stylePrompts[writingStyle]}

Please correct the grammar and improve the following text while maintaining its original meaning and intent. 

Original text:
${content}

Return your response in JSON format with:
- "correctedContent": the improved text
- "grammarCorrections": number of grammar fixes made
- "styleImprovements": number of style improvements made  
- "clarityEnhancements": number of clarity enhancements made`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert grammar correction and writing enhancement AI. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      correctedContent: result.correctedContent || content,
      corrections: {
        grammar: result.grammarCorrections || 0,
        style: result.styleImprovements || 0,
        clarity: result.clarityEnhancements || 0,
      }
    };
  } catch (error) {
    console.error("OpenAI grammar correction error:", error);
    throw new Error("Failed to process grammar correction: " + (error as Error).message);
  }
}
