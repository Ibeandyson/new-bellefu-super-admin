import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import { adminValidation } from "../Utils";

const ProductRoute = ({ component: Component, userSignin, ...rest }) => {
  const { role } = useSelector((state) => state.adminSignin);

  return (
    <Route
      {...rest}
      render={(props) =>
        Cookie.get("admin") && adminValidation(role, "product_admin") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProductRoute;
