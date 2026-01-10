import { cn } from "@/lib/utils";

export const inputBaseClasses = cn(
    "h-11 px-4 pr-12 rounded-lg",
    "bg-white! dark:bg-ui-dark!",
    "border-gray-200! dark:border-gray-700!",
    "text-ui-main! dark:text-white!",
    "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
    "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
);

export const buttonBaseClasses = cn(
    "w-full h-11 bg-ui-primary",
    "hover:bg-ui-primary-dark",
    "active:bg-[#0c3ca3] disabled:opacity-60",
    "text-white text-sm font-bold rounded-lg",
    "transition-all duration-200",
    "shadow-[0_4px_14px_rgba(19,91,236,0.25)]",
    "hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]",
    "flex items-center justify-center gap-2 mt-1 cursor-pointer"
)