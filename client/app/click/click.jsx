"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Utensils, Apple, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dumbbell className="w-8 h-8 text-blue-500" />
          </div>
          <div className="absolute top-1/2 right-0 translate-y-1/2 translate-x-1/2">
            <Apple className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <Timer className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200 animate-[spin_8s_linear_infinite_reverse]" />
      </div>
    </div>
  );
};

const CameraCapture = ({reload,setReload}) => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
  let router = useRouter();
  const startCamera = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const streamData = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isMobile ? "environment" : "user",
        },
      });
      videoRef.current.srcObject = streamData;
      setStream(streamData);
    } catch (err) {
      console.error("Error:", err);
    }
  };


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

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const backendUpload = async (base64) => {
    setLoading(true);
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const user = Cookies.get("user");
      console.log(user);
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-meal`,
        {
          user_id: user,
          image_base64: base64,
        },
        { headers }
      );
      setLoading(false);
      setReload(true)
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally{
      setLoading(false);
      setReload(true);
      router.push("/dashboard");
      router.refresh();
    }
  };

  const resetImage = () => {
    setPhoto(null);
    setUploadedPhotoUrl(null);
    if (stream) {
      startCamera();
    }
  };

  const uploadImage = () => {
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
          backendUpload(base64Image);
        };
        reader.readAsDataURL(file);
      }
    };
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
            <Button onClick={uploadImage}>Upload Image</Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={photo}
            alt="Captured or uploaded photo"
            className="w-full max-w-[500px] rounded-lg"
          />
          <Button onClick={resetImage} disabled={loading}>
            {stream ? "Retake Photo" : "Upload Another Image"}
          </Button>
          {loading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default CameraCapture;