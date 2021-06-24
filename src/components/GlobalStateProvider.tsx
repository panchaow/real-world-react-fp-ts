import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import * as R from "fp-ts/Reader";
import * as IO from "fp-ts/IO";
import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import { error } from "fp-ts/Console";
import { User, decodeResponseUser } from "../types";
import { Auth } from "../agent";

import { configureAxiosDefaults } from "../requests";
import { getItem, removeItem, setItem } from "../utils/localStorage";
import { pipe, flow } from "fp-ts/function";


interface GlobalState {
  appLoaded: boolean;
  currentUser: User | null;
  updateCurrentUser: (user: User | null) => IO.IO<void>;
}

const noop: IO.IO<void> = () => {}

const globalStateContext = createContext<GlobalState>({
  appLoaded: false,
  currentUser: null,
  updateCurrentUser: () => noop,
});

const getToken = getItem("jwt");
const setToken = setItem("jwt");
const removeToken = removeItem("jwt");

export const GlobalStateProvider = (props: { children: ReactNode }) => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const updateCurrentUser = (user: User | null) => pipe(
    O.fromNullable(user),
    O.fold(
      () => pipe(
        IO.Do,
        IO.chain(() => () => setCurrentUser(null)),
        IO.chain(() => removeToken)
      ),
      (user) => pipe(
        IO.Do,
        IO.chain(() => () => setCurrentUser(user)),
        IO.chain(() => setToken(user.token))
      )
    )
  )

  useEffect(() => {
    const setupAxios = (tok: string) =>
      configureAxiosDefaults(
        R.Functor.map(
          R.ask(),
          (axios) => (axios.headers["authorization"] = `Token ${tok}`)
        )
      );

    const loadCurrent = pipe(
      TE.Do,
      TE.chain(() => Auth.current()),
      TE.fold(
        flow(error, T.fromIO),
        flow(
          decodeResponseUser,
          E.fold(error, (response) => updateCurrentUser(response.user)),
          T.fromIO
        )
      ),
    );

    const tryLogin = pipe(
      T.fromIO(getToken),
      T.chain((o) =>
        pipe(
          o,
          O.fold(
            () => T.fromIO(noop),
            (tok) =>
              pipe(
                T.fromIO(setupAxios(tok)),
                T.chain(() => loadCurrent)
              )
          )
        )
      ),
      T.chain(() => T.fromIO(() => setAppLoaded(true)))
    );

    tryLogin();
  }, []);

  return (
    <globalStateContext.Provider
      value={{
        appLoaded,
        currentUser,
        updateCurrentUser,
      }}
    >
      {props.children}
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(globalStateContext);
};
