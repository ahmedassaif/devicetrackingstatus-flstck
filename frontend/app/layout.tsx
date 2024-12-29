/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { CircleAlert, CircleCheck, CircleX, Info, RotateCw } from "lucide-react";
import NextBreadcrumb from '@/components/NextBreadcrumb'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Device Tracking Status",
  description: "Tracking Intranet IP Static Device Status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          {/* <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main> */}
          <AppSidebar />
          <SidebarInset className="relative">
            <header className="flex bg-slate-100 border-b-2 w-full h-16 shrink-0 fixed top-0 z-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" color="gray-400" />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
                <NextBreadcrumb
                  homeElement={'Home'}
                  separator={<span> {'>'} </span>}
                  activeClasses='text-amber-500'
                  containerClasses='flex py-5' 
                  listClasses='hover:underline mx-2 font-bold'
                  capitalizeLinks
                />
              </div>
            </header>
            <div className="flex flex-1 flex-col mt-16 overflow-y-auto gap-4 p-4 pt-0">
              {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
              <main>{children}</main>
              <Toaster
                toastOptions={{
                  classNames: {
                    error: 'bg-red-400',
                    success: 'bg-green-200',
                    warning: 'bg-yellow-400',
                    info: 'bg-blue-400',
                  },
                  closeButton: true,
                }}
                icons={{
                  success: <CircleCheck color="green" />,
                  info: <Info color="blue" />,
                  warning: <CircleAlert />,
                  error: <CircleX />,
                  loading: <RotateCw className="animate-spin" />,
                }}
                duration={3000}
                position="top-right"
              />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
