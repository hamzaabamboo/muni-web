import React from "react";

interface CommonPageProps {
  head?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  backgroundImage?: string;
  isStatic?: boolean;
}

export type PageProps<T = {}> = CommonPageProps & T;
