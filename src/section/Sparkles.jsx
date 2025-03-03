"use client";
import React from "react";
import { SparklesCore } from "../components/UI/Spark";

const SparklesPreview=()=> {
  return (
    (<div
      className="h-full relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={5}
          className="w-full h-full"
          particleColor="#FFFFFF" />
      </div>
    
    </div>)
  );
}
export default SparklesPreview;