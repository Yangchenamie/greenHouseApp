import React, { Suspense, useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import routes from "./router";

const Element = function Element(props: {
  path: string;
  name: string;
  component: any;
}): JSX.Element {
  let { path, name, component: Component } = props;

  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  return <Component navigate={navigate} location={location} params={params} usp={usp} />;
};

export default function RouterView() {
  return (
    <Suspense>
      <Routes>
        {routes.map((item) => {
          let { name, path } = item;
          return (
            <Route key={name} path={path} element={<Element {...item} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
