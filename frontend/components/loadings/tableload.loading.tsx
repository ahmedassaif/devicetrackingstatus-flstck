"use client"
import loadingBackground from "@/public/images/beams.jpg";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import Image from "next/image";


const TableLoading: React.FC = () => {
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        src={loadingBackground}
                        alt="Loading Screen"
                        fill
                        className="h-full w-full rounded-md object-cover"                        
                    />
                    <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                        <div className="mx-auto max-w-md">
                            <Button disabled>
                                <RotateCw size="sm" className="animate-spin" />
                                <span className="pl-3">Loading...</span>
                            </Button>
                        </div>
                    </div>
                </div>
    )
};

export default TableLoading;