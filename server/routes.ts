import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const { description, parameters, mode } = req.body;

      if (mode === 'ai') {
        // Use OpenAI to enhance the prompt
        const systemPrompt = `You are an expert AI video prompt engineer. Your task is to create detailed, professional video prompts optimized for AI video generation platforms like Veo 3, Sora 2, Runway, Pika, and Stability AI.

Create vivid, specific prompts that:
- Include precise visual details and atmosphere
- Specify camera work and composition clearly
- Describe lighting, mood, and color palette
- Are optimized for AI video generation
- Are concise but comprehensive (150-250 words)`;

        const userPrompt = buildUserPrompt(description, parameters);

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 500,
        });

        const enhancedPrompt = completion.choices[0].message.content;
        res.json({ prompt: enhancedPrompt });
      } else {
        // Manual mode - combine parameters
        const prompt = buildManualPrompt(description, parameters);
        res.json({ prompt });
      }
    } catch (error: any) {
      console.error('Error generating prompt:', error);
      res.status(500).json({ 
        error: 'Failed to generate prompt',
        message: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function buildUserPrompt(description: string, parameters: any): string {
  let prompt = `Create a professional AI video generation prompt based on:\n\n`;
  
  if (description) {
    prompt += `Scene Description: ${description}\n\n`;
  }
  
  prompt += `Parameters:\n`;
  if (parameters.genre) prompt += `- Genre: ${parameters.genre}\n`;
  if (parameters.landscape) prompt += `- Setting: ${parameters.landscape}\n`;
  if (parameters.timeOfDay) prompt += `- Time of Day: ${parameters.timeOfDay}\n`;
  if (parameters.weather) prompt += `- Weather: ${parameters.weather}\n`;
  if (parameters.lighting) prompt += `- Lighting: ${parameters.lighting}\n`;
  if (parameters.mood) prompt += `- Mood: ${parameters.mood}\n`;
  if (parameters.tone) prompt += `- Tone: ${parameters.tone}\n`;
  if (parameters.cameraAngle) prompt += `- Camera Angle: ${parameters.cameraAngle}\n`;
  if (parameters.framing) prompt += `- Framing: ${parameters.framing}\n`;
  if (parameters.cameraMovement) prompt += `- Camera Movement: ${parameters.cameraMovement}\n`;
  if (parameters.motionStyle) prompt += `- Motion Style: ${parameters.motionStyle}\n`;
  if (parameters.colorGrading) prompt += `- Color Grading: ${parameters.colorGrading}\n`;
  if (parameters.filmStock) prompt += `- Film Stock: ${parameters.filmStock}\n`;
  if (parameters.lens) prompt += `- Lens: ${parameters.lens}\n`;
  if (parameters.depth) prompt += `- Depth of Field: ${parameters.depth}\n`;
  if (parameters.aspectRatio) prompt += `- Aspect Ratio: ${parameters.aspectRatio}\n`;
  if (parameters.duration) prompt += `- Duration: ${parameters.duration}\n`;
  if (parameters.platform) prompt += `- Target Platform: ${parameters.platform}\n`;
  
  return prompt;
}

function buildManualPrompt(description: string, parameters: any): string {
  const parts = [description];
  
  if (parameters.genre) parts.push(`Genre: ${parameters.genre}`);
  if (parameters.landscape) parts.push(`Setting: ${parameters.landscape}`);
  if (parameters.timeOfDay) parts.push(`Time: ${parameters.timeOfDay}`);
  if (parameters.weather) parts.push(`Weather: ${parameters.weather}`);
  if (parameters.lighting) parts.push(`Lighting: ${parameters.lighting}`);
  if (parameters.cameraAngle) parts.push(`Camera: ${parameters.cameraAngle}`);
  if (parameters.framing) parts.push(`Framing: ${parameters.framing}`);
  if (parameters.mood) parts.push(`Mood: ${parameters.mood}`);
  if (parameters.tone) parts.push(`Tone: ${parameters.tone}`);
  if (parameters.cameraMovement) parts.push(`Movement: ${parameters.cameraMovement}`);
  if (parameters.motionStyle) parts.push(`Motion: ${parameters.motionStyle}`);
  if (parameters.aspectRatio) parts.push(`Aspect Ratio: ${parameters.aspectRatio}`);
  if (parameters.duration) parts.push(`Duration: ${parameters.duration}`);
  if (parameters.colorGrading) parts.push(`Color: ${parameters.colorGrading}`);
  if (parameters.filmStock) parts.push(`Film Stock: ${parameters.filmStock}`);
  if (parameters.lens) parts.push(`Lens: ${parameters.lens}`);
  if (parameters.depth) parts.push(`Depth: ${parameters.depth}`);
  if (parameters.transition) parts.push(`Transition: ${parameters.transition}`);
  if (parameters.pacing) parts.push(`Pacing: ${parameters.pacing}`);
  if (parameters.visualStyle) parts.push(`Style: ${parameters.visualStyle}`);
  if (parameters.soundscape) parts.push(`Sound: ${parameters.soundscape}`);
  
  return parts.filter(p => p).join('. ');
}
