interface Props {
  label: string;
  data: string | number | string[];
}

export default function Text({ label, data }: Props) {
  return (
    <div>
      <span>{label} : </span>
      {label === "문의사항" ? (
        <pre className="w-full whitespace-pre-wrap break-words">{data}</pre>
      ) : (
        <span>{data}</span>
      )}
    </div>
  );
}
