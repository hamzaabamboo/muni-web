import React, {
  Component,
  FunctionComponent,
  memo,
  ReactElement,
  useMemo,
} from "react";

export const ComposeProviders = ({
  providers,
  children,
}: {
  providers: React.FunctionComponent<{ children: React.ReactNode }>[];
  children: React.ReactNode;
}) => {
  return providers
    .reverse()
    .map(
      (component: FunctionComponent<{ children: React.ReactNode }>) => component
    )
    .reduce<React.ReactElement>(
      (previous, Current: FunctionComponent<{ children: React.ReactNode }>) => {
        return <Current>{previous}</Current>;
      },
      children as React.ReactElement
    );
};
