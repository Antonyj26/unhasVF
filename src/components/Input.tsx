type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset>
      {legend && (
        <legend className="uppercase text-center text-sm mb-2 font-bold text-[#9e737a]">
          {legend}
        </legend>
      )}
      <input
        type={type}
        className="w-full h-13 border p-5 rounded-md bg-white"
        {...rest}
      />
    </fieldset>
  );
}
