import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export interface InputWithSearchAddonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export function InputWithSearchAddon({
  onChange,
  value,
}: InputWithSearchAddonProps) {
  return (
    <div className="relative p-1 flex w-full max-w-[16rem]">
      <Input
        type="text"
        label=""
        placeholder="search the deck"
        value={value}
        onChange={onChange}
        className="px-5 bg-white !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-full"
        labelProps={{
          className: "hidden before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        crossOrigin={"true"}
        icon={
          <MagnifyingGlassIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
        }
      />
    </div>
  );
}
