const Container: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col items-start w-[560px] h-[466px] rounded-2xl bg-white ml-8 p-8">
      <h1 className="font-extralight text-2xl ml-2 mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default Container;
