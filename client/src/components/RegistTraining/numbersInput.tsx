import React from "react";
import { Button } from "../ui/button";
import { DeleteIcon } from "lucide-react";

interface NumbersInputProps {
  handleNumberClick: (value: string) => void;
  handleDelete: () => void;
  onPinValidation: boolean;
}

const NumbersInput: React.FC<NumbersInputProps> = ({
  handleNumberClick,
  handleDelete,
  onPinValidation,
}) => {
  return (
    <div className="space-y-2 gap-4 ">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="h-16 flex items-center justify-center text-2xl font-bold cursor-pointer border"
          >
            {num}
          </Button>
        ))}
        {!onPinValidation ? (
          <Button
            onClick={() => handleNumberClick("+")}
            className="h-16 flex items-center justify-center text-2xl font-bold cursor-pointer border"
          >
            +
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          onClick={() => handleNumberClick("0")}
          className="h-16 flex items-center justify-center text-2xl font-bold cursor-pointer border"
        >
          0
        </Button>
        <Button
          onClick={handleDelete}
          variant={"ghost"}
          className="h-16 flex items-center justify-center text-3xl font-bold cursor-pointer border"
        >
          <DeleteIcon style={{ width: "24px", height: "60px" }} />
        </Button>
      </div>
    </div>
  );
};

export default NumbersInput;
