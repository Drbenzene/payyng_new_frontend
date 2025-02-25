import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
function PayyngBackButton() {
  const { back } = useRouter();
  return (
    <div>
      <div
        onClick={() => back()}
        className="flex items-center justify-start cursor-pointer"
      >
        <IoChevronBackCircle size={30} />
      </div>
    </div>
  );
}

export default PayyngBackButton;
