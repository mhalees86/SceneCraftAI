import { OutputDisplay } from '../output-display';

export default function OutputDisplayExample() {
  const samplePrompt = "A cinematic shot of a lone astronaut standing on the surface of Mars during golden hour. The scene features dramatic lighting with the setting sun casting long shadows across the rust-colored terrain. Camera slowly pulls back to reveal the vast, desolate landscape. Shot on ARRI Alexa with anamorphic lenses, f/2.8, creating a shallow depth of field.";

  return (
    <div className="p-4 h-96">
      <OutputDisplay 
        prompt={samplePrompt}
        onRegenerate={() => console.log('Regenerate clicked')}
        onPromptChange={(value) => console.log('Prompt changed:', value)}
        isAiMode={true}
      />
    </div>
  );
}
