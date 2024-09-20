import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { Volume, VolumeSolid } from "../components/Icons.tsx";

interface TTSProps {
  text: string;
  defailtIcon?: JSX.Element;
  activeIcon?: JSX.Element;
}

export default function TTS(
  {
    text,
    defailtIcon = <Volume class="icon" />,
    activeIcon = <VolumeSolid class="icon" />,
  }: TTSProps,
) {
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
    <span
      class="tts"
      onClick={handlePlay}
      role="button"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Stop TTS" : "Play TTS"}
    >
      {isPlaying ? activeIcon : defailtIcon}
    </span>
  );
}
