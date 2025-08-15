import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface CountdownTimerProps {
  endTime: string | Date;
  showSeconds?: boolean;
}

export default function CountdownTimer({ endTime, showSeconds = true }: CountdownTimerProps) {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, expired: false };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return <span className="text-red-600 font-medium">{t('countdown.expired')}</span>;
  }

  // Show different formats based on time remaining
  if (timeLeft.days > 1) {
    return <span>{timeLeft.days}d {timeLeft.hours}h</span>;
  } else if (timeLeft.days === 1) {
    return <span>1d {timeLeft.hours}h</span>;
  } else if (timeLeft.hours > 0) {
    return <span>{timeLeft.hours}h {timeLeft.minutes}m</span>;
  } else if (showSeconds) {
    return <span>{timeLeft.minutes}m {timeLeft.seconds}s</span>;
  } else {
    return <span>{timeLeft.minutes}m</span>;
  }
}
