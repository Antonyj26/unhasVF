type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({ children, type = "button", ...rest }: Props) {
  return (
    <button
      type={type}
      className="w-full py-3 border border-black h-12 rounded-md cursor-pointer bg-[#9e737a] font-bold text-white hover:bg-[#e3b4b0] transition-colors hover:text-gray-950 "
      {...rest}
    >
      {children}
    </button>
  );
}
