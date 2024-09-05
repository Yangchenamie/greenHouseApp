/* import React, { FC, useEffect } from "react";
import jsQR from "jsqr";
import { NavigateFunction, useNavigate } from "react-router-dom";
let scanner: any = null;

let video: HTMLVideoElement;
let canvasElement: HTMLCanvasElement;
let canvas: CanvasRenderingContext2D;
let loadingMessage: HTMLElement;
let outputContainer: HTMLElement;
let outputMessage: HTMLElement;
let outputData: HTMLElement;

interface BaseProps {
  navigate: NavigateFunction;
}

const ScanCode: FC<BaseProps> = function ScanCode({ navigate }) {
  const drawLine = (
    begin: { x: number; y: number },
    end: { x: number; y: number },
    color: string
  ) => {
    if (canvas) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }
  };

  const handleQRCodeData = (data: string) => {
    console.log("识别到的二维码数据:", data);
    // 根据识别到的二维码数据进行页面跳转
    navigate("/bindDevice", { state: { data }, replace: true });
  };

  const tick = () => {
    loadingMessage.innerText = "⌛ Loading video...";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code && code.data) {
        console.log(code);
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );
        outputMessage.hidden = true;
        outputData.parentElement!.hidden = false;
        outputData.innerText = code.data;

        // 调用处理二维码数据的函数
        handleQRCodeData(code.data);
      } else {
        outputMessage.hidden = false;
        outputData.parentElement!.hidden = true;
      }
    }
    window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    video = document.createElement("video");
    canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    loadingMessage = document.getElementById("loadingMessage") as HTMLElement;
    outputContainer = document.getElementById("output") as HTMLElement;
    outputMessage = document.getElementById("outputMessage") as HTMLElement;
    outputData = document.getElementById("outputData") as HTMLElement;

    console.log(navigator.mediaDevices);

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        return navigator.mediaDevices.getDisplayMedia(constraints);
      };
    }

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: "environment" } })
      .then(function (stream) {
        // 旧的浏览器可能没有srcObject
        video.srcObject = stream;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        window.requestAnimationFrame(tick);
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div id="loadingMessage">
        🎥 Unable to access video stream (please make sure you have a webcam
        enabled)
      </div>
      <canvas id="canvas" hidden></canvas>
      <div id="output" hidden>
        <div id="outputMessage">No QR code detected.</div>
        <div hidden>
          <b>Data:</b> <span id="outputData"></span>
        </div>
      </div>
    </div>
  );
};

export default ScanCode; */

/* 
import React, { useRef } from 'react';
const CameraComponent = () => {

 const cameraVideoRef = useRef(null);
 const cameraCanvasRef = useRef(null);

  function successFunc(mediaStream) {
    const video = cameraVideoRef.current;
    // const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    // 旧的浏览器可能没有srcObject
    if ('srcObject' in video) {
      video.srcObject = mediaStream;
    }
    video.onloadedmetadata = () => {
      video.play();
    };
  }

  function errorFunc(err) {
    console.log(`${err.name}: ${err.message}`);
    // always check for errors at the end.
  }
    // 启动摄像头
  const openMedia = () => { // 打开摄像头
    const opt = {
      audio: false,
      video: {
        width: 1280,
        height: 720
      }
    };
    navigator.mediaDevices.getUserMedia(opt).then(successFunc).catch(errorFunc);
  };
  // 关闭摄像头
  const closeMedia = () => {
    // const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    const video = cameraVideoRef.current;
    const stream = video.srcObject;
    if ('getTracks' in stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
  };

  const getImg = () => { // 获取图片资源
    // const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    // const canvas = document.getElementById('cameraCanvas') as HTMLCanvasElement;
    const video = cameraVideoRef.current;
    const canvas = cameraCanvasRef.current;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // 把视频中的一帧在canvas画布里面绘制出来
    const imgStr = canvas.toDataURL(); // 将图片资源转成字符串
    const base64Img = imgStr.split(';base64,').pop(); // 将图片资源转成base64格式
    const imgData = {
      base64Img
    };
    closeMedia(); // 获取到图片之后可以自动关闭摄像头
    return imgData;
  };


return(
 <div>
   <video
     id="cameraVideo"
     ref={cameraVideoRef}
     style={{
       width: '1280px', height: '720px'
     }}
    />
    <canvas
      id="cameraCanvas"
      ref={cameraCanvasRef}
      width={1280}
      height={720}
      style={{
        width: '1280px', height: '720px'
      }}
    />
    <img id="imgTag" src="" alt="imgTag"/>
    <button onClick={openMedia} >打开摄像头</button>
    
    <button onClick={closeMedia} >关闭摄像头</button>
 </div>
)
} */

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { NavigateFunction } from "react-router-dom";

interface BaseProps {
  navigate: NavigateFunction;
}

const ScanCode: React.FC<BaseProps> = ({ navigate }) => {
  let video: HTMLVideoElement;
  let canvasElement: HTMLCanvasElement;
  let canvas: CanvasRenderingContext2D;
  let loadingMessage: HTMLElement;
  let outputContainer: HTMLElement;
  let outputMessage: HTMLElement;
  let outputData: HTMLElement;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const handleQRCodeData = (data: string) => {
    console.log("识别到的二维码数据:", data);
    // 根据识别到的二维码数据进行页面跳转
    navigate("/bindDevice", { state: { data }, replace: true });
  };

  const drawLine = (begin: any, end: any, color: string) => {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  };

  const tick = () => {
    loadingMessage.innerText = "⌛ Loading video...";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code && code.data) {
        console.log(code);
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );
        outputMessage.hidden = true;
        outputData.parentElement!.hidden = false;
        outputData.innerText = code.data;

        // 调用处理二维码数据的函数
        handleQRCodeData(code.data);
      } else {
        outputMessage.hidden = false;
        outputData.parentElement!.hidden = true;
      }
    }
    window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    video = document.createElement("video");
    canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    loadingMessage = document.getElementById("loadingMessage") as HTMLElement;
    outputContainer = document.getElementById("output") as HTMLElement;
    outputMessage = document.getElementById("outputMessage") as HTMLElement;
    outputData = document.getElementById("outputData") as HTMLElement;

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        return navigator.mediaDevices.getDisplayMedia(constraints);
      };
    }

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: "environment" } })
      .then(function (stream) {
        // 旧的浏览器可能没有srcObject
        video.srcObject = stream;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        window.requestAnimationFrame(tick);
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImageSrc(imageSrc || null);
  }, [webcamRef, setImageSrc]);

  return (
    <div>
      <h1>Camera Component</h1>
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
          height={"100vh"}
          style={{ display: "block", margin: "auto" }}
        />
      </div>
      <button onClick={capture}>Capture Photo</button>
      <div>
        <canvas id="canvas" hidden />
        <div id="loadingMessage">Loading video...</div>
        <div id="output" hidden>
          <div id="outputMessage">No QR code detected.</div>
          <div id="outputData"></div>
        </div>
      </div>
      {imageSrc && (
        <div>
          <h2>Captured Photo</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default ScanCode;
