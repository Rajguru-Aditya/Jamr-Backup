import React from "react";
import { Outlet } from "react-router";
import FilterBar from "../FilterBar/FilterBar";

export const WithFilterBar = () => {
  return (
    <>
      <FilterBar />
      <Outlet />
    </>
  );
};
