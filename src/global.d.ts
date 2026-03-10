import type * as React from "react";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.Ref<HTMLElement>;

        src?: string;
        "environment-image"?: string;
        "auto-rotate"?: boolean;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean;
        "camera-orbit"?: string;
        "interaction-prompt"?: "auto" | "none";
        exposure?: string;
        "shadow-intensity"?: string;
        ar?: boolean;
        "ar-modes"?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export {};
