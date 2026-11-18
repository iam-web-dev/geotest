export default function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[45vh] w-full py-12">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--primary-soft)] border-t-[var(--primary)] animate-spin" />
    </div>
  );
}
