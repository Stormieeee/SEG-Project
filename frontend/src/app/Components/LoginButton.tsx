import React from "react";

import { loginButtonStyle } from "./componentStyle";

const LoginButton = () => {
  return (
    <button
      type="submit"
      className={`${loginButtonStyle}`}
    >
      Login
    </button>
  );
};

export default LoginButton;
