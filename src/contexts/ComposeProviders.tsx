import React, { FunctionComponent, memo, ReactElement, useMemo } from "react";

export const ComposeProviders: React.FC<{
  providers: React.FunctionComponent[];
}> = ({ providers, children }) => {
  return providers
    .reverse()
    .map((component: FunctionComponent) => component)
    .reduce<React.ReactElement>((previous, Current: FunctionComponent) => {
      return <Current>{previous}</Current>;
    }, children as React.ReactElement);
};
