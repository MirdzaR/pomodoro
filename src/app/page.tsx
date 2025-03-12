"use client"; // This is a client component
import { useState, useEffect } from 'react';

export default function PomodoroClock() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleTimeSelect = (minutes) => {
    if (!isRunning) {
      setSelectedValue(minutes)
      setSelectedTime(minutes * 60);
      setTimeLeft(minutes * 60);
    }

  };

  const handleStart = () => {
    if (selectedTime > 0) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
      <div className="fixed bottom-10 left-10 bg-purple-800/50 w-[530px] h-[260px] rounded-lg shadow ">
        <div className="w-full h-full flex justify-center items-center text-[300px] font-jomhuria leading-none text-white ">{formatTime(timeLeft)}</div>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          key={5}
          onClick={() => handleTimeSelect(5)}
          className={'hover:text-special-pink hover:text-larger fixed top-30 left-70'}
          >
          {isRunning && selectedValue !== 5 ? '' : '5'}
        </button>

        <button
          key={10}
          onClick={() => handleTimeSelect(10)}
          className={'hover:text-special-pink hover:text-larger fixed top-45 right-150'}
          >
          {isRunning && selectedValue !== 10 ? '' : '10'}
        </button>

        <button
          key={15}
          onClick={() => handleTimeSelect(15)}
          className={'hover:text-special-pink hover:text-larger fixed top-100 left-150'}
          >
          {isRunning && selectedValue !== 15 ? '' : '15'}
        </button>

        <button
          key={25}
          onClick={() => handleTimeSelect(25)}
          className={'hover:text-special-pink hover:text-larger fixed top-125 right-100'}
          >
          {isRunning && selectedValue !== 25 ? '' : '25'}
        </button>
      </div>

      <button
        onClick={handleStart}
        disabled={isRunning || selectedTime === 0}
        className="fixed bottom-10 right-50 hover:text-special-pink hover:text-larger "
      >
        {isRunning ? '' : 'Start'}
      </button>
    </div>
  );
}
