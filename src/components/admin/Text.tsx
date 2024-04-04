interface Props {
  label: string;
  data: string | number | string[];
}

export default function Text({ label, data }: Props) {
  return (
    <div>
      <span>{label} : </span>
      {label === "문의사항" ? <pre>{data}</pre> : <span>{data}</span>}
    </div>
  );
}
