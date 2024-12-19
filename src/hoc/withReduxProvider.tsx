import React, { ComponentType } from "react";
import ReduxProvider from "@/store/reduxProvider";

const withReduxProvider = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithRedux = (props: P) => (
    <ReduxProvider>
      <WrappedComponent {...props} />
    </ReduxProvider>
  );

  return ComponentWithRedux;
};

export default withReduxProvider;
