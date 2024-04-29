export default function Loading() {
  return (
    <div className="contents-center w-full text-slate-600">
      <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-b-sub" />
      <p>Loading</p>
      <span className="animate-[bounce_1s_infinite_0ms]">.</span>
      <span className="animate-[bounce_1s_infinite_150ms]">.</span>
      <span className="animate-[bounce_1s_infinite_300ms]">.</span>
    </div>
  );
}
