import { css } from "@emotion/css";
import React from "react";
import HomePageContent from "../view/CreateRouteForm";

const HomePage = () => {
  return (
    <div className={rootContainer}>
      <HomePageContent></HomePageContent>
    </div>
  );
};

const rootContainer = css`
  min-height: 380px;
`

const logo = css`
float: left;
width: 120px;
height: 31px;
margin: 16px 24px 16px 0;
background: rgba(255, 255, 255, 0.3);
`

export default HomePage;
