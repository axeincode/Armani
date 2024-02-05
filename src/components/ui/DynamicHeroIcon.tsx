import React from "react";
import { FC } from "react";
import * as HIcons from "@heroicons/react/24/solid";

export const DynamicHeroIcon: FC<{ icon: string; className: string }> = (
  props
) => {
  const { ...icons } = HIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className={props.className} aria-hidden="true" />
    </>
  );
};
