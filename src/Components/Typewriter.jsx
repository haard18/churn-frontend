"use client";
import { useNavigate } from "react-router-dom"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Scale up ",
    },
    {
      text: "your",
    },
    {
      text: "business",
    },
    {
      text: "with",
    },
    {
      text: "Churn-O-Analyzer.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/predict')
  }
  const handleClick2 = () => {
      navigate('/upload')
  }
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className=" btn btn-outline btn-primary" onClick={handleClick}>
        Go to Predict
        </button>
        <button className="btn btn-outline btn-primary" onClick={handleClick2}>
        Upload your custom Data
        </button>
      </div>
    </div>
  );
}
