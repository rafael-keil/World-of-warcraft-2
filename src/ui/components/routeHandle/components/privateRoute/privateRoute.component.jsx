import { Redirect, Route } from "react-router";
import { useGlobalUser } from "../../../../../context";
import { PATH } from "../../../../../constants";

export function PrivateRoute({ path, children }) {
  const [user] = useGlobalUser();

  if (!user.token) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <Route path={path} exact>
      {children}
    </Route>
  );
}
