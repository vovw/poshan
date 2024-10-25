"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
const CameraCapture = () => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        video: true,
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
    console.log("Captured Photo Data:", photoData); // Console log the photo data
    setPhoto(photoData);

    // Upload photo to Cloudinary via API route

    // Stop camera after taking photo
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const user = Cookies.get("user");
      let response = await axios.post(
        "http://127.0.0.1:8000/upload-meal",
        { photoData, user },
        { headers },
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Upload photo to Cloudinary via API route

  // Retake photo
  const retakePhoto = () => {
    setPhoto(null);
    setUploadedPhotoUrl(null);
    startCamera();
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
          {!stream ? (
            <Button onClick={startCamera}>Start Camera</Button>
          ) : (
            <Button onClick={takePhoto}>Take Photo</Button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={photo}
            alt="Captured photo"
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
          <Button onClick={retakePhoto}>Retake Photo</Button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
