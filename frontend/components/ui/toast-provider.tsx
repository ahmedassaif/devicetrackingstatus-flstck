"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
    addToast: (toast: { title: string; description: string }) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<{ title: string; description: string }[]>([]);

    const addToast = (toast: { title: string; description: string }) => {
        setToasts([...toasts, toast]);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
        {children}
        {toasts.map((toast, index) => (
            <div key={index}>
            {/* Customize your toast component */}
            <p>{toast.title}</p>
            <p>{toast.description}</p>
            </div>
        ))}
        </ToastContext.Provider>
    );
};
