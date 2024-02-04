/* eslint-disable @next/next/no-img-element */
import { variant } from "@material-tailwind/react/types/components/typography";

export interface EditorCompanyLogoProps {
  inverse: boolean;
  variant: variant | undefined;
  logoUrl?: string;
}

export const EditorCompanyLogo = ({
  inverse,
  variant,
  logoUrl,
}: EditorCompanyLogoProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 min-w-[200px]`}
      data-testid="logo"
    >
      {logoUrl && (
        <>
          <img
            src={logoUrl}
            alt="Company Logo"
            className="h-40 w-full rounded-lg object-scale-down"
          />
        </>
      )}
      {!logoUrl && (
        <>
          <img
            src={"https://placehold.co/550x100"}
            alt="Company Logo"
            className="h-[24px] w-full rounded-lg"
          />
        </>
      )}
    </div>
  );
};
