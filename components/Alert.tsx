interface AlertProps {
  type: "error" | "success";
  message: string;
  onClose: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  return (
    <div class={`alert alert-${type}`}>
      <p class="alert-text">{message}</p>
      <div class="alert-close" onClick={onClose}>&#10005;</div>
    </div>
  );
}
