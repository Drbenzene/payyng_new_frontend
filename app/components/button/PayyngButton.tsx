import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PayyngButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
  bgColor?: string;
  textColor?: string;
}

function PayyngButton({
  onClick,
  disabled,
  isProcessing,
  text,
  bgColor,
  textColor,
}: PayyngButtonProps) {
  return (
    <Button
      className={`flex w-full items-center hover:text-white hover:bg-black   justify-center space-x-2 p-5 bg-${
        bgColor || "black"
      }  text-${textColor || "white"} rounded-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      {isProcessing && <Loader2 className="animate-spin" />}
      {isProcessing ? "Please wait..." : text}
    </Button>
  );
}

export default PayyngButton;
