"use client";
import { get } from "lodash";
import React from "react";
import ReactPlayer from "react-player/lazy";

export interface VideoPlayerProps {
  data?: any;
}

export const VideoPlayer = ({ data }: VideoPlayerProps) => {
  const videoData = get(data, "data", { id: 0, url: "" });

  return (
    <div className="flex flex-grow">
      <ReactPlayer
        className="react-player"
        url={videoData.url || "https://www.youtube.com/watch?v=ysz5S6PUM-U"}
        width="100%"
        height="100%"
      />
    </div>
  );
};
