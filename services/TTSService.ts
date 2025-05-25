let voice: SpeechSynthesisVoice | undefined;

export async function speak(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
): Promise<void> {
  const synth = self.speechSynthesis;

  if (!voice) {
    await new Promise<void>((resolve) => {
      const voices = synth.getVoices();
      if (voices.length) {
        voice = pickGermanVoice(voices);
        resolve();
      } else {
        synth.onvoiceschanged = () => {
          voice = pickGermanVoice(synth.getVoices());
          resolve();
        };
      }
    });
  }

  return new Promise<void>((resolve) => {
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice ?? null;

    utterance.onend = () => {
      onEnd?.();
      resolve();
    };

    utterance.onerror = () => {
      onEnd?.();
      resolve();
    };

    onStart?.();
    synth.speak(utterance);
  });
}

function pickGermanVoice(voices: SpeechSynthesisVoice[]) {
  return voices.find((v) => v.lang === "de-DE" && !v.localService) ??
    voices.find((v) => v.lang === "de-DE");
}
