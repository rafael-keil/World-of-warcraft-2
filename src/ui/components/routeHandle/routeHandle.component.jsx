import { Redirect, Route, Switch } from "react-router";
import {
  Login,
  Menu,
  Selection,
  CreateCharacter,
  MissionScreen,
  BusyScreen,
  Battle,
  Pvp,
  Buy,
  Sell,
  Loading,
} from "../../screens";
import { PrivateRoute, PrivateRouteCh } from "./components";
import { PATH } from "../../../constants";

export function RouteHandle() {
  return (
    <Switch>
      <Route path={PATH.LOGIN} exact>
        <Login />
      </Route>
      <PrivateRoute path={PATH.SELECTION} exact>
        <Selection />
      </PrivateRoute>
      <PrivateRouteCh path={PATH.MISSION}>
        <MissionScreen />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.BUSY} exact>
        <BusyScreen />
      </PrivateRouteCh>
      <PrivateRoute path={PATH["CREATE-CHARACTER"]} exact>
        <CreateCharacter />
      </PrivateRoute>
      <PrivateRouteCh path={PATH.MENU} exact>
        <Menu />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.BUY} exact>
        <Buy />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.SELL} exact>
        <Sell />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.PVP} exact>
        <Pvp />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.BATTLE} exact>
        <Battle />
      </PrivateRouteCh>
      <PrivateRouteCh path={PATH.LOADING} exact>
        <Loading />
      </PrivateRouteCh>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
