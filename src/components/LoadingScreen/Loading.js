import React from "react";

const Loading = ({ isForgotPass }) => {
  return (
    <main
      style={{
        height: isForgotPass ? "unset" : "calc(80vh - 10rem)",
      }}
    >
      <div
        className="loading"
        style={{
          marginTop: isForgotPass ? "2rem" : "10rem",
          marginBottom: isForgotPass ? "2rem" : "10rem",
        }}
      ></div>
    </main>
  );
};

export default Loading;
