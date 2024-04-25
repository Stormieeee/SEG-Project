export function formatHour(value: number): string {
  // Pad single-digit hours with leading zero and return as HH:00:00
  return value.toString().padStart(2, "0") + ":00:00";
}

export const adjustTime = (hour: number): string => {
  // Convert hour to minutes and subtract 1
  let adjustedTime = hour * 60 - 1;

  // Ensure adjustedTime does not go below 0
  adjustedTime = Math.max(adjustedTime, 0);

  // Convert adjustedTime back to "HH:MM" format
  const adjustedHour = Math.floor(adjustedTime / 60);
  const adjustedMinute = adjustedTime % 60;
  return `${adjustedHour.toString().padStart(2, "0")}:${adjustedMinute.toString().padStart(2, "0")}:00`;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};


