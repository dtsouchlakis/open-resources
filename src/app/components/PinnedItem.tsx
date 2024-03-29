export default function PinnedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} w-max bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg p-4`}
    >
      {children}
    </div>
  );
}
