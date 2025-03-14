"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import ReactModal from "react-modal";
import { useEffect } from "react";

export default function UploadModal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    // Set app element only on the client side
    if (typeof window !== "undefined") {
      ReactModal.setAppElement(document.body); // Use `document.body` instead of `#__next`
    }
  }, []);

  return (
    <div>
      <h1>Upload Modal</h1>
      {isOpen && (
        <ReactModal
          className="max-w-lg w-[90%] h-[300px] absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={isOpen}
          onRequestClose={() => dispatch(closeModal())}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <h1>Modal</h1>
            <button onClick={() => dispatch(closeModal())}>Close Modal</button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
