export default function Number({ value }) {
  const colors = [
    "text-stone-950",
    "text-lime-600",
    "text-amber-400",
    "text-orange-500",
    "text-red-600",
    "text-pink-600",
    "text-fuchsia-600",
    "text-violet-500",
    "text-indigo-600",
  ];
  return (
    <div className='flex items-center justify-center size-8 border bg-gray-300 border-gray-400 text-xl font-extrabold'>
      <div className={`${colors[value]}`}>{value}</div>
    </div>
  );
}
