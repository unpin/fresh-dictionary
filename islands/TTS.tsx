import { useEffect, useState } from "preact/hooks";
import { Volume, VolumeSolid } from "../components/Icons.tsx";

interface TTSProps {
  text: string;
}

export default function TTS({ text }: TTSProps) {
  const synth = self.speechSynthesis;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

  useEffect(() => {
    const germanVoices = synth.getVoices().filter((v) => v.lang === "de-DE");
    const voice = germanVoices.find((voice) => {
      if (voice.localService === false) return voice;
    }) || germanVoices[0];

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.addEventListener("start", () => setIsPlaying(true));
    utterThis.addEventListener("end", () => setIsPlaying(false));
    utterThis.voice = voice;
    setUtterance(utterThis);
  }, []);

  const handlePlay = () => {
    if (synth.speaking) {
      return synth.cancel();
    }
    if (utterance) synth.speak(utterance);
  };
  return (
    <span onClick={handlePlay}>
      {isPlaying ? <VolumeSolid class="icon" /> : <Volume class="icon" />}
    </span>
  );
}
