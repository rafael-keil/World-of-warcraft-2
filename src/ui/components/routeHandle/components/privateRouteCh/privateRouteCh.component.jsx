import { Redirect } from "react-router";
import { useGlobalCharacter } from "../../../../../context";
import { PATH } from "../../../../../constants";
import { PrivateRoute } from "../privateRoute/privateRoute.component";

export function PrivateRouteCh({ path, children }) {
  const [character] = useGlobalCharacter();

  if (!character) {
    return <Redirect to={PATH.SELECTION} />;
  }

  return (
    <PrivateRoute path={path} exact>
      {children}
    </PrivateRoute>
  );
}
