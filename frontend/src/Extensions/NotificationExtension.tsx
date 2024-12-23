import React from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX, HiInformationCircle } from "react-icons/hi";
import type { FlowbiteToastTheme, ToastProps } from "flowbite-react";

type ToastMethod = (message: string) => React.ReactNode;
type ToastListMethod = (messages: string[]) => React.ReactNode[];

interface NotificationExtension {
  addSuccess: ToastMethod;
  addInfo: ToastMethod;
  addWarning: ToastMethod;
  addError: ToastMethod;
  addWarnings: ToastListMethod;
  addErrors: ToastListMethod;
}

const notificationExtension: NotificationExtension = {
  addSuccess: (message: string): React.ReactNode => (
    <Toast>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  ),

  addInfo: (message: string): React.ReactNode => (
    <Toast>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
        <HiInformationCircle className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  ),

  addWarning: (message: string): React.ReactNode => (
    <Toast>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  ),

  addError: (message: string): React.ReactNode => (
    <Toast>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  ),

  addWarnings: (messages: string[]): React.ReactNode[] => messages.map((message) => (
    <Toast key={message}>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  )),

  addErrors: (messages: string[]): React.ReactNode[] => messages.map((message) => (
    <Toast key={message}>
      <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="size-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </Toast>
  )),
};

export default notificationExtension;
