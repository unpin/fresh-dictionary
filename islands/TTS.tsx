import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { Volume, VolumeSolid } from "../components/Icons.tsx";
import { speak } from "../services/TTSService.ts";

interface TTSProps {
  text: string;
  defailtIcon?: JSX.Element;
  activeIcon?: JSX.Element;
}

export default function TTS({
  text,
  defailtIcon = <Volume />,
  activeIcon = <VolumeSolid />,
}: TTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    speak(text, () => {
      setIsPlaying(true);
    }, () => {
      setIsPlaying(false);
    });
  };

  useEffect(() => {}, []);

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
