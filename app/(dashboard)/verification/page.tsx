"use client";

import React, { useRef, useState, useEffect } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import { validateIdentity } from "@/hooks/useUser";
import { toast } from "sonner";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import dynamic from "next/dynamic";

// Dynamically import the Image component to ensure it's only loaded on the client side
const Image = dynamic(() => import("next/image"), { ssr: false });

function IDVerification() {
  const videoRef: any = useRef(null);
  const canvasRef: any = useRef(null);
  const [step, setStep] = useState(0); // Start with step 0 for ID card type selection
  const [idImage, setIdImage] = useState<any>(null);
  const [faceImage, setFaceImage] = useState<any>(null);
  const [idCardType, setIdCardType] = useState<string>(""); // State for ID card type
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitVerifificationHandler = async () => {
    console.log("Submit Verification");
    const payload = {
      idImage,
      selfie: faceImage,
      idType: idCardType,
    };
    setLoading(true);
    const res = await validateIdentity(payload);
    setLoading(false);
    if (res) {
      toast.success("Verification submitted successful");
      setShowSuccessModal(true);
    }
  };

  // Start camera only in the browser (client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      };
      startCamera();
    }
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/png");

      if (step === 1) {
        setIdImage(imageData);
        setStep(2);
      } else {
        setFaceImage(imageData);
        setStep(3);
      }
    }
  };

  const handleIdCardTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIdCardType(event.target.value);
    setStep(1); // Move to the next step after selecting ID card type
  };

  return (
    <ContentLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
        <div className="max-w-3xl w-full bg-black p-8 rounded-3xl shadow-2xl text-center text-white border border-gray-700">
          <h2 className="text-4xl font-bold mb-6 text-white">
            {step === 0 && "Select ID Card Type"}
            {step === 1 && "Capture Your ID"}
            {step === 2 && "Capture Your Face"}
            {step === 3 && "Verification Complete"}
          </h2>
          {step === 0 && (
            <div className="mb-6">
              <label
                htmlFor="idCardType"
                className="block text-lg font-semibold text-gray-300 mb-2"
              >
                Select ID Card Type
              </label>
              <select
                id="idCardType"
                value={idCardType}
                onChange={handleIdCardTypeChange}
                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Select ID Card Type --</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVERS_LICENSE">Driver's License</option>
                <option value="NATIONAL_ID">National ID</option>
                <option value="VOTERS_CARD">Voters Card</option>
                <option value="vNIN">Virtual NIN</option>
              </select>
            </div>
          )}

          {step > 0 && step < 3 && (
            <div className="relative w-full flex justify-center mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-96 h-96 rounded-xl border-4 border-blue-500 shadow-lg"
              />
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          )}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">
                  Captured ID
                </h3>
                <Image
                  src={idImage}
                  alt="ID Capture"
                  height={400}
                  width={400}
                  className="w-full rounded-xl shadow-lg border-2 border-gray-500"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-300">
                  Captured Face
                </h3>
                <Image
                  src={faceImage}
                  height={400}
                  width={400}
                  alt="Face Capture"
                  className="w-full rounded-xl shadow-lg border-2 border-gray-500"
                />
              </div>
            </div>
          )}
          <div className="mt-8 space-y-4">
            {step === 1 && (
              <button
                onClick={captureImage}
                className="w-full bg-green-500 hover:bg-green-600 py-3 text-lg font-semibold rounded-xl shadow-lg"
              >
                Capture ID
              </button>
            )}
            {step === 2 && (
              <button
                onClick={captureImage}
                className="w-full bg-green-500 hover:bg-green-600 py-3 text-lg font-semibold rounded-xl shadow-lg"
              >
                Capture Face
              </button>
            )}
            {step === 3 && (
              <button
                disabled={loading}
                onClick={submitVerifificationHandler}
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg font-semibold rounded-xl shadow-lg"
              >
                {loading ? "PLEASE WAIT..." : "SUBMIT"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <TransactionSuccess
          open={showSuccessModal}
          setOpen={setShowSuccessModal}
          description="Your ID verification has been submitted successfully and is being processed. You will be notified once it is completed."
        />
      )}
    </ContentLayout>
  );
}

export default IDVerification;
