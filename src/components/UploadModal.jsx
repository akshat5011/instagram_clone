"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import ReactModal from "react-modal";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const { data: session } = useSession();
  function addImageToPost(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  async function uploadToCloudinary(imageBase64) {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", imageBase64);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  }

  async function uploadPost() {
    if (loading) return;

    setLoading(true);

    try {
      // Upload to Cloudinary first
      const imageUrl = await uploadToCloudinary(selectedFile);

      // Save to Firebase Firestore
      await addDoc(collection(db, "posts"), {
        caption: captionRef.current.value,
        username: session.user.username,
        profileImg: session.user.image,
        timestamp: serverTimestamp(),
        image: imageUrl,
      });

      setSelectedFile(null);
      dispatch(closeModal());
    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
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
              placeholder="Please Enter your Caption.."
              className="m-4 border-none text-center w-full focus:ring-0"
              ref={captionRef}
            />
            <button
              onClick={uploadPost}
              disabled={!selectedFile || loading}
              className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              {loading ? "Uploading..." : "Upload Post"}
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
