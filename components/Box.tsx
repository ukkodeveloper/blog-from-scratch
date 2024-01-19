const Box = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2 rounded-md bg-neutral-100 px-2 pb-4 pt-2 shadow-md">
      <p className="border-b-neutral-400 text-xs text-neutral-400">{title}</p>
      {children}
    </div>
  );
};

export default Box;
