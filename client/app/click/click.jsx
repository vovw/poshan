"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const streamData = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isMobile ? "environment" : "user",
          // 'environment' for back camera on mobile
          // 'user' for front camera on desktop/laptop
        },
      });
      videoRef.current.srcObject = streamData;
      setStream(streamData);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Take photo
  const takePhoto = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const photoData = canvas.toDataURL("image/jpeg");
    setPhoto(photoData);
    backendUpload(photoData);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setPhoto(photoData);
        backendUpload(photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  let backendUpload = async (base64) => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const user = Cookies.get("user");
      console.log(user);
      let response = await axios.post(
        "http://127.0.0.1:8000/upload-meal",
        {
          user_id: user,
          image_base64: base64,
        },
        { headers },
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Retake photo or reset upload
  const resetImage = () => {
    setPhoto(null);
    setUploadedPhotoUrl(null);
    if (stream) {
      startCamera();
    }
  };

  const uploadImage = () => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target.result;
          setPhoto(base64Image);

          // Upload photo to backend
          backendUpload(base64Image);
        };
        reader.readAsDataURL(file);
      }
    };

    // Trigger file input click
    input.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-[500px] rounded-lg"
          />
          <div className="flex flex-row gap-6">
            {!stream ? (
              <Button onClick={startCamera}>Start Camera</Button>
            ) : (
              <Button onClick={takePhoto}>Take Photo</Button>
            )}

            <Button onClick={uploadImage}>upload image</Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={photo}
            alt="Captured or uploaded photo"
            className="w-full max-w-[500px] rounded-lg"
          />
          {uploadedPhotoUrl && (
            <div>
              <p>Uploaded Photo URL:</p>
              <a
                href={uploadedPhotoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadedPhotoUrl}
              </a>
            </div>
          )}
          <Button onClick={resetImage}>
            {stream ? "Retake Photo" : "Upload Another Image"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
