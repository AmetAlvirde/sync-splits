export function decimalToSexagecimal(decimalMinutes: number) {
  const wholeMinutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - wholeMinutes) * 60);
  const adjustedSeconds = seconds === 60 ? 0 : seconds;
  const adjustedMinutes = seconds === 60 ? wholeMinutes + 1 : wholeMinutes;

  return `${adjustedMinutes.toString().padStart(2, "0")}:${adjustedSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatSpeedPerHour(base: string) {
  const speedSplit = base.toString().split(".");
  if (speedSplit[0].length !== 1) {
    return base;
  }
  speedSplit[0] = `0${speedSplit[0]}.`;

  return speedSplit.join("");
}

export function getConversions({
  from = "minkm",
  minutes = "",
  seconds = "",
  speedPerHour = "",
}: {
  from: string;
  minutes?: string;
  seconds?: string;
  speedPerHour?: string;
}) {
  const kmToMiles = 0.621371;
  const milesToKm = 1.60934;
  const totalMinutes = Number(minutes) + Number(seconds) / 60;

  switch (from) {
    case "minkm": {
      if (!minutes || !seconds)
        throw new Error("You need to enter minutes and seconds");

      return {
        minmi: decimalToSexagecimal(totalMinutes / kmToMiles),
        mih: formatSpeedPerHour(
          Number((60 / totalMinutes) * kmToMiles).toFixed(2)
        ),
        kmh: formatSpeedPerHour(Number(60 / totalMinutes).toFixed(2)),
      };
    }

    case "minmi": {
      if (!minutes || !seconds)
        throw new Error("You need to enter minutes and seconds");

      return {
        minkm: decimalToSexagecimal(Number(totalMinutes) / milesToKm),
        kmh: formatSpeedPerHour(
          ((60 / Number(totalMinutes)) * milesToKm).toFixed(2)
        ),
        mih: formatSpeedPerHour((60 / Number(totalMinutes)).toFixed(2)),
      };
    }
    case "kmh": {
      if (!speedPerHour)
        throw new Error("You need to enter the speed per hour");

      return {
        minkm: decimalToSexagecimal(60 / Number(speedPerHour)),
        minmi: decimalToSexagecimal(
          60 / (Number(speedPerHour) * Number(kmToMiles))
        ),
        mih: formatSpeedPerHour((Number(speedPerHour) * kmToMiles).toFixed(2)),
      };
    }
    case "mih": {
      if (!speedPerHour)
        throw new Error("You need to enter the speed per hour");

      return {
        minkm: decimalToSexagecimal(60 / (Number(speedPerHour) * milesToKm)),
        minmi: decimalToSexagecimal(60 / Number(speedPerHour)),
        kmh: formatSpeedPerHour((Number(speedPerHour) * milesToKm).toFixed(2)),
      };
    }
    default:
      throw new Error(
        "You need to choose a valid case(mih, kmh, minmi, minkm)"
      );
  }
}
