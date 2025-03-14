"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import ReactModal from "react-modal";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";

export default function UploadModal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    // Set app element only on the client side
    if (typeof window !== "undefined") {
      ReactModal.setAppElement(document.body); // Use `document.body` instead of `#__next`
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  function addImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  return (
    <div>
      {isOpen && (
        <ReactModal
          className="max-w-lg w-[90%] p-6 absolute top-40 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={isOpen}
          onRequestClose={() => {
            dispatch(closeModal());
            setSelectedFile(null);
          }}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                src={selectedFile}
                alt="post picture"
                className="w-full max-h-[250px] object-cover cursor-pointer"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <CameraIcon
                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
                onClick={() => filePickerRef.current.click()}
              />
            )}
            <input
              type="file"
              ref={filePickerRef}
              hidden
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Please Enter you Caption.."
              className="m-4 border-none text-center w-full focus:ring-0"
            />
            <button
              disabled
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
