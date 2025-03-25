import { useState, useEffect } from "react";

interface ICounterProps {
  targetDate: number;
  sale?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, sale }: ICounterProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );

        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds: Math.floor(seconds),
        });
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  const padNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <>
      {sale ? (
        <div className="flex items-center lg:gap-4 gap-2">
          <div className="bg-white text-black rounded-full py-1 w-[50px] h-[50px] lg:py-3 lg:w-[70px] lg:h-[70px] flex flex-col items-center">
            <div className="lg:text-xl font-bold">
              {padNumber(timeLeft.days)}
            </div>
            <div className="lg:text-xs text-[9px] font-medium">Days</div>
          </div>

          <div className="bg-white text-black rounded-full py-1 w-[50px] h-[50px] lg:py-3 lg:w-[70px] lg:h-[70px] flex flex-col items-center">
            <div className="lg:text-xl font-bold">
              {padNumber(timeLeft.hours)}
            </div>
            <div className="lg:text-xs text-[9px] font-medium">Hours</div>
          </div>

          <div className="bg-white text-black rounded-full py-1 w-[50px] h-[50px] lg:py-3 lg:w-[70px] lg:h-[70px] flex flex-col items-center">
            <div className="lg:text-xl font-bold">
              {padNumber(timeLeft.minutes)}
            </div>
            <div className="lg:text-xs text-[9px] font-medium">Minutes</div>
          </div>

          <div className="bg-white text-black rounded-full py-1 w-[50px] h-[50px] lg:py-3 lg:w-[70px] lg:h-[70px] flex flex-col items-center">
            <div className="lg:text-xl font-bold">
              {padNumber(timeLeft.seconds)}
            </div>
            <div className="lg:text-xs text-[9px] font-medium">Seconds</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center sm:gap-8 gap-2">
          <div className="flex flex-col">
            <div className="mt-2 font-medium text-sm">Days</div>
            <div className="flex items-center">
              <div className="text-4xl font-bold">
                {padNumber(timeLeft.days)}
              </div>
              <div className="text-[#DB4444] text-4xl font-medium pb-2 sm:pl-6 pl-3">
                :
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mt-2 font-medium text-sm">Hours</div>
            <div className="flex items-center">
              <div className="text-4xl font-bold">
                {padNumber(timeLeft.hours)}
              </div>
              <div className="text-[#DB4444] text-4xl font-medium pb-2 sm:pl-6 pl-3">
                :
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mt-2 font-medium text-sm">Minutes</div>
            <div className="flex items-center">
              <div className="text-4xl font-bold">
                {padNumber(timeLeft.minutes)}
              </div>
              <div className="text-[#DB4444] text-4xl font-medium pb-2 sm:pl-6 pl-4">
                :
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-medium pt-1 text-sm">Seconds</div>
            <div className="text-4xl font-bold pt-1">
              {padNumber(timeLeft.seconds)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
