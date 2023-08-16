import React from "react";
//Component for applying lazy to all pages
export const Home = React.lazy(() => import('../containers/Home/Home'));
export const Cafe = React.lazy(() => import('../containers/Cafe/Cafe'));
export const Employee = React.lazy(() => import('../containers/Employee/Employee'));
export const NotFound = React.lazy(() => import('../components/NotFound/NotFound'));
