import { useEffect, useState } from "preact/hooks";

export default function BackLink() {
  const [history, setHistory] = useState<History>();

  useEffect(() => {
    setHistory(window.history);
  }, []);

  const goBack = () => {
    history?.back();
  };

  return (
    <>
      <div class="back-btn" onClick={goBack}>
        {history && (history.length > 0) &&
          <img src="/icons/chevron-left.svg" alt="" />}
      </div>
    </>
  );
}
