import { ErrorIcon } from "src/assets/icons";

function ErrorTimeTracker(): JSX.Element {
  return (
    <div>
      <div>
        <ErrorIcon className="block cursor-pointer mx-auto hover:text-[#29C81E]/[.75] transition text-[#29C81E]" />
      </div>
      <div className="mt-14">
        <div className="py-5 relative before:content-[''] before:absolute before:h-16 before:w-px before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-red-400 after:content-[''] after:absolute after:h-16 after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-red-400 stripes"></div>
      </div>
      <div className="mt-6 flex items-center gap-1">
        <ErrorIcon className="w-12 h-12 shrink-0" />
        <p className="font-bold text-[#FE3434]">
          An error occurred with the time tracker, please clear cache and
          refresh the page
        </p>
      </div>
    </div>
  );
}

export default ErrorTimeTracker;
