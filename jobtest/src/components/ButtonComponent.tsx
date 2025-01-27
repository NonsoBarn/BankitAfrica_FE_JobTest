import { ButtonProps } from "../types/generalTypes";

const ButtonComponent = ({ text, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-blue-500 text-white rounded-md py-2"
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
