import { InputComponentProps } from "../types/generalTypes";

const InputComponent = ({
  id,
  name,
  type,
  placeholder,
  label,
  value,
  onChange,
  error,
}: InputComponentProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputComponent;
