import React from "react";
import { Input } from "@material-tailwind/react";

export type LabelInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const BasicInput = ({
  value = "",
  onChange = () => {},
  placeholder,
}: LabelInputProps) => {
  return (
    <>
      <Input
        size="md"
        placeholder={placeholder || ""}
        crossOrigin={"true"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 py-1 !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "!min-w-[20px] flex-grow flex !py-0 !px-0",
        }}
      />
    </>
  );
};
