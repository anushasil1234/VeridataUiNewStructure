import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const originalWarn = console.error;

// console.log('originalWarn', originalWarn);
// console.error = function(message, ...args) {
//   if (message.includes('A non-serializable value was detected in the state')) {
//     console.log("inside errro");
//     // Do nothing if the warning message matches
//   }else{

//     console.log('message33333', message);
//     // If not the suppressed warning, call the original console.warn
//     console.log('error23423423', [message, ...args]);
//     // originalWarn.apply(console, ["message jffffsdj jsdfjdsfsdk sdfsdlkj ksdfj sdkf sdkfjsjf", ...args]);
//     originalWarn.apply(console, [, ...args]);
//   }
// };
// console.error = () => {}
root.render(
  <Suspense>
    <Provider store={store}>
      <BrowserRouter>
        {WrappedApp}
        {/* <App /> */}
      </BrowserRouter>
    </Provider>
  </Suspense>
);
