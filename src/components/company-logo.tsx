import { Typography } from "@material-tailwind/react";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { variant } from "@material-tailwind/react/types/components/typography";

export interface CompanyLogoProps {
  inverse: boolean;
  variant: variant | undefined;
  iconSize: string;
}

export const CompanyLogo = ({
  inverse,
  variant,
  iconSize,
}: CompanyLogoProps) => {
  const backgroundColorClass = inverse ? "bg-gray-800" : "bg-white";
  const textColorClass = inverse ? "text-white" : "text-black";
  const textVariant = variant || "h2";
  const logoIconSize = iconSize || "h-10 w-10";

  return (
    <div
      className={`${backgroundColorClass} px-8 flex flex-row items-center gap-2`}
    >
      <BuildingOffice2Icon className={`${logoIconSize} text-amber-700`} />
      <Typography
        variant={textVariant}
        color="blue-gray"
        className={` ${textColorClass} `}
      >
        DIAMOND
      </Typography>
      <Typography variant={textVariant} color="amber">
        REALTY
      </Typography>
    </div>
  );
};
