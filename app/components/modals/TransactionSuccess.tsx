// Import Lottie dynamically, disabling SSR
import dynamic from "next/dynamic";
import ModalLayout from "../layouts/ModalLayout";
import PayyngButton from "../button/PayyngButton";

// Dynamically import the Lottie component
const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false, // Disable SSR for this component
});

import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";
import successAnimationData from "@/public/lottie/success.json"; // Import animation data directly

interface TransactionSuccessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  description?: string;
}

function TransactionSuccess({
  open,
  setOpen,
  description,
}: TransactionSuccessProps) {
  const { push } = useRouter();
  return (
    <ModalLayout maxWidth="max-w-sm" open={open} setOpen={setOpen} title={""}>
      <div>
        <div>
          <div className="flex flex-col justify-center items-center">
            <Lottie
              loop
              animationData={successAnimationData}
              play
              style={{ width: 150, height: 150 }}
            />
            <p className="text-gray-500 mt-2">
              {description ||
                "Your transaction was completed successfully. Thanks for choosing Payyng"}
            </p>
          </div>
          <div className="mt-5">
            <PayyngButton
              onClick={() => {
                setOpen(false);
                push(APP_PATH.OVERVIEW);
              }}
              text={"PROCEED"}
            />
            {/* <button
              onClick={() => {
                setOpen(false);
                push(APP_PATH.OVERVIEW);
              }}
              className="w-full bg-blue-500 text-white p-3 rounded-xl"
            >
              PROCEED
            </button> */}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

export default TransactionSuccess;
