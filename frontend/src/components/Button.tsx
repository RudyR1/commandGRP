export default function Button({
  type,
  id,
  nameClass,
  text,
  funct,
}: {
  type: "submit" | "reset" | "button" | undefined;
  id: string;
  nameClass: string;
  text: string;
  funct?: () => void;
}) {
  return (
    <button type={type} id={id} className={nameClass} onClick={funct}>
      {text}
    </button>
  );
}
