import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "@/components/ui/separator";
import { getConversions } from "./utils";

type ConversionResults = {
  minmi?: string;
  minkm?: string;
  kmh?: string;
  mih?: string;
};

export const PaceConverter = () => {
  const [unitFrom, setUnitFrom] = useState("minkm");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [speedPerHour, setspeedPerHour] = useState("");
  const [conversionResults, setConversionResults] =
    useState<ConversionResults>();

  function triggerConversion() {
    const { minkm, minmi, kmh, mih } = getConversions({
      from: unitFrom,
      minutes,
      seconds,
      speedPerHour,
    });

    setConversionResults({
      minkm,
      minmi,
      kmh,
      mih,
    });
  }

  function handleUnitChange(newUnit: string) {
    setUnitFrom(newUnit);
    setConversionResults({
      minmi: "",
      kmh: "",
      minkm: "",
      mih: "",
    });

    if (newUnit === "minkm" || newUnit === "minmi") {
      setspeedPerHour("");
    } else {
      setMinutes("");
      setSeconds("");
    }
  }

  return (
    <>
      <section className="flex flex-col min-w-[280px] md:flex-row md:flex-wrap">
        {unitFrom === "minkm" || unitFrom === "minmi" ? (
          <div className="flex flex-col md:flex-row md:w-full">
            <Input
              className="h-12 md:mr-1 my-2"
              id="minutes"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              type="number"
              placeholder="minutes"
            ></Input>
            <Input
              className="h-12 my-2 md:ml-1 "
              id="second"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              type="number"
              placeholder="seconds"
            ></Input>
          </div>
        ) : null}
        {unitFrom === "kmh" || unitFrom === "mih" ? (
          <Input
            className="h-12 my-2"
            value={speedPerHour}
            onChange={e => setspeedPerHour(e.target.value)}
            id="ph-time"
            type="number"
            placeholder="8.5"
          ></Input>
        ) : null}
        <Select onValueChange={handleUnitChange}>
          <SelectTrigger className="h-12 my-2">
            <SelectValue placeholder={unitFrom} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="minkm">min/km</SelectItem>
            <SelectItem value="minmi">min/mi</SelectItem>
            <SelectItem value="kmh">Km/h</SelectItem>
            <SelectItem value="mih">Mi/h</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="h-14 md:h-12 md:w-full my-2"
          onClick={triggerConversion}
        >
          Convert
        </Button>
      </section>
      {conversionResults ? (
        <>
          <Separator
            className="my-4 bg-gray-300"
            orientation="horizontal"
          ></Separator>

          <section>
            <ul className="flex flex-wrap">
              {conversionResults?.minkm ? (
                <li className="w-full md:w-1/3 my-2 md:px-2">
                  <span className="text-3xl font-mono">
                    {conversionResults.minkm}
                  </span>
                  <span className="text-md font-light ml-1">min/km</span>
                </li>
              ) : null}
              {conversionResults?.minmi ? (
                <li className="w-full md:w-1/3 my-2 md:px-2">
                  <span className="text-3xl font-mono">
                    {conversionResults?.minmi}
                  </span>
                  <span className="text-md font-light ml-1">min/mi</span>
                </li>
              ) : null}
              {conversionResults?.mih ? (
                <li className="w-full md:w-1/3 my-2 md:px-2">
                  <span className="text-3xl font-mono">
                    {conversionResults?.mih}
                  </span>
                  <span className="text-md font-light ml-1">mi/h</span>
                </li>
              ) : null}
              {conversionResults?.kmh ? (
                <li className="w-full md:w-1/3 my-2 md:px-2">
                  <span className="text-3xl font-mono">
                    {conversionResults?.kmh}
                  </span>
                  <span className="text-md font-light ml-1">km/h</span>
                </li>
              ) : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};
