"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";

export default function UploadModal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Upload Modal</h1>
      {isOpen && (
        <>
          <h1>The Modal is open</h1>
          <button onClick={() => dispatch(closeModal())}>Close Modal</button>
        </>
      )}
    </div>
  );
}
