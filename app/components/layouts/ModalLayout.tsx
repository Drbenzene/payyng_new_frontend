import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalLayoutProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: any;
  hideCancel?: boolean;
  maxWidth?: string;
}

export default function ModalLayout({
  open,
  setOpen,
  title,
  children,
  hideCancel,
  maxWidth = "max-w-2xl",
}: ModalLayoutProps) {
  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          static={false}
          as="div"
          className="fixed z-50 md:modalUp inset-0 overflow-y-auto"
          onClose={() => null}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/90 transition duration-300 data-[closed]:opacity-0" />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={`relative inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-4 align-middle ${
                  maxWidth ? maxWidth : "max-w-3xl"
                } w-full`}
              >
                {/* Close Icon Positioned Outside the Modal */}
                {!hideCancel && (
                  <FaTimes
                    className="absolute   right-10 top-10 translate-x-3 -translate-y-3 cursor-pointer text-black bg-white rounded-full p-1 shadow-md"
                    size={24}
                    onClick={() => setOpen(false)}
                  />
                )}

                <div className="bg-white px-4 pt-4 pb-4 sm:p-4 sm:pb-4">
                  <div className=" sm:mt-0 text-left pt-4">
                    <div className="px-4 mt-2 mb-5">{children}</div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
