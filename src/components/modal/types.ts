import { ReactNode } from "react";

export interface IModal {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}
