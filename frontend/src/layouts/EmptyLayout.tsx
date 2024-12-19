import React from "react";

const EmptyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="content-container">{children}</div>
      <style>
        {`
          .main-layout {
            height: 100vh;
            font-family: 'Roboto', sans-serif;
            position: relative;
          }

          .content-container {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: stretch;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default EmptyLayout;
