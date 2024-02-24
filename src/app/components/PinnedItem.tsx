export default function PinnedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} w-max h-max bg-white rounded-md shadow-lg p-4`}
    >
      {children}
    </div>
  );
}
