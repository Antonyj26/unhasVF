type Props = React.ComponentProps<"select"> & {
  legend?: string;
};

export function Select({ legend, children, ...rest }: Props) {
  return (
    <fieldset>
      {legend && (
        <legend className="uppercase text-center text-sm mb-2 font-bold text-[#9e737a]">
          {legend}
        </legend>
      )}
      <select
        className="w-full p-4 border border-black h-13 rounded-md bg-white"
        {...rest}
      >
        <option value="" disabled selected>
          Selecione
        </option>
        {children}
      </select>
    </fieldset>
  );
}
