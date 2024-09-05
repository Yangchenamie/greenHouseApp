/* 
  封装 Flv格式视频组件  调用该组件只需要传入url
*/

import { FC, useEffect, useRef } from "react";
import flvjs from "flv.js";

interface BaseProps {
  url: string;
}

const FlvPlayer: FC<BaseProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const flvPlayerRef = useRef<any>(null);

  useEffect(() => {
    console.log(flvjs.isSupported());

    if (flvjs.isSupported()) {
      flvPlayerRef.current = flvjs.createPlayer({
        type: "flv",
        url: url,
        isLive: true, // 是否为直播流
      });

      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();
    }
    console.log(flvPlayerRef.current);
    return () => {
      if (flvPlayerRef.current) {
        flvPlayerRef.current.unload();
        flvPlayerRef.current.detachMediaElement();
        flvPlayerRef.current.destroy();
      }
    };
  });

  return (
    <div className="flv-box">
      <video ref={videoRef} controls width="100%" height="100%" autoPlay />
    </div>
  );
};
export default FlvPlayer;
