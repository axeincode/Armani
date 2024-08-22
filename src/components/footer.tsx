import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-4 flex flex-row gap-1 justify-center items-center border-t bg-gray-800">
      Powered by
      <Link
        href="https://canari.com"
        target="_blank"
        className="underline underline-offset-4"
      >
        Canari solutions
      </Link>
    </footer>
  );
}
