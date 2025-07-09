import { forwardRef } from "react";

interface CustomEmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const CustomEmailInput = forwardRef<HTMLInputElement, CustomEmailInputProps>(
  ({ className, suffix = "@domtech.com", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="text"
          className={`w-full bg-white/10 border border-white/10 text-white placeholder:text-white/50 rounded-lg px-3 py-2 pr-[140px] ${className}`}
          ref={ref}
          {...props}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
          {suffix}
        </span>
      </div>
    );
  }
);

CustomEmailInput.displayName = "CustomEmailInput";

export { CustomEmailInput }; 