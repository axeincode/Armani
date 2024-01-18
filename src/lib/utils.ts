import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalLettersOfName(name: string) {
  const splitted = name.split(" ");

  if (splitted.length > 1) {
    const firstLetter = splitted[0].charAt(0);
    const lastLetter = splitted[1].charAt(0);

    const capitalLetters = (firstLetter + lastLetter).toLocaleUpperCase();

    return capitalLetters;
  } else {
    const firstLetter = name[0];
    const lastLetter = name.at(-1);

    const capitalLetters = (firstLetter + lastLetter).toLocaleUpperCase();

    return capitalLetters;
  }
}

export function randomNumberBetween(min = 0, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDateBefore(startingDate = new Date()) {
  const randomNumberOfDays = randomNumberBetween(20, 80);
  const randomDate = new Date(
    Number(startingDate) - randomNumberOfDays * 24 * 60 * 60 * 1000
  );
  return randomDate;
}

export function getRandomDateAfter(startingDate = new Date()) {
  const randomNumberOfDays = randomNumberBetween(1, 19);
  const randomDate = new Date(
    startingDate.getTime() + randomNumberOfDays * 24 * 60 * 60 * 1000
  );
  return randomDate;
}
