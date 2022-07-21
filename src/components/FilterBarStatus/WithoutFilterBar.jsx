import React from "react";
import { Outlet } from "react-router";

export const WithoutFilterBar = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
