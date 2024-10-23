import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import { StyledEngineProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Suspense>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          {WrappedApp}
        </BrowserRouter>
      </Provider>
    </StyledEngineProvider>
  </Suspense>
);
