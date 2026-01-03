/// <reference types="vite/client" />

declare module "host/GlobalContext" {
  export interface CartItem {
    bookId: string;
    image: string;
    title: string;
    quantity: number;
    price?: number;
  }

  interface GlobalContextType {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    selectedBook: string | null;
    setSelectedBook: React.Dispatch<React.SetStateAction<string | null>>;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    addToCart: (data: CartItem) => void;
  }

  export function useGlobalContext(): GlobalContextType;
  export const GlobalProvider: React.FC<{ children: React.ReactNode }>;
}

declare module "shared/Button" {
  import { ButtonHTMLAttributes } from "react";

  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
  }

  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "shared/ErrorBoundary" {
  import { ReactNode, ErrorInfo } from "react";

  interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
  }

  const ErrorBoundary: React.ComponentType<ErrorBoundaryProps>;
  export default ErrorBoundary;
}

declare module "shared/ModuleFederationErrorBoundary" {
  import { ReactNode } from "react";

  interface ModuleFederationErrorBoundaryProps {
    children: ReactNode;
    moduleName?: string;
    fallback?: ReactNode;
  }

  const ModuleFederationErrorBoundary: React.ComponentType<ModuleFederationErrorBoundaryProps>;
  export default ModuleFederationErrorBoundary;
}
