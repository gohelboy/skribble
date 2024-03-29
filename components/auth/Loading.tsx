import { cn } from "@/lib/utils";
import Image from "next/image";

export const Loading = ({ classes }: { classes?: string }) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Image src="/logo.svg" alt="Logo" width={240} height={70} className={cn("animate-pulse duration-1000", classes)} />
        </div>
    );
}