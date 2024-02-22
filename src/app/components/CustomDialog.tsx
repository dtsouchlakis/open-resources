import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type mode = "save" | "okay";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return { isOpen, closeModal, openModal };
}
export default function MyModal({
  title,
  children,
  mode,
  dialogHandler,
  onSubmit,
  onCancel,
  onOkay,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  mode: mode;
  dialogHandler: {
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
  onSubmit?: () => void;
  onClose: () => void;
  onCancel?: () => void;
  onOkay?: () => void;
}) {
  return (
    <>
      <Transition appear show={dialogHandler.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm mr-4 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={mode === "save" ? onSubmit : onOkay}
                    >
                      {mode === "save" ? "Save" : "Okay"}
                    </button>
                    {mode === "save" ? (
                      <button
                        type="button"
                        className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onCancel}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
