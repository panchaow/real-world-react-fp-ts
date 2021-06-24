import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

import { flow, pipe } from "fp-ts/function";
import { error } from "fp-ts/Console";
import { LoginForm } from "../components/LoginForm";
import { ListErrors } from "../components/ListErrors";

import { useGlobalState } from "../components/GlobalStateProvider";

import { Errors, decodeResponseError, decodeResponseUser } from "../types";

import { Auth } from "../agent";
import { useIfMounted } from "../hooks";

export const Login = () => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { currentUser, updateCurrentUser } = useGlobalState();
  const ifMounted = useIfMounted();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const login = (email: string, password: string) => {
    const resetErrors = pipe(() => setErrors({}), ifMounted);
    const _setErrors = (errors: Errors) => pipe(() => setErrors(errors), ifMounted);
    const start = pipe(() => setInProgress(true), ifMounted);
    const stop = pipe(() => setInProgress(false), ifMounted);

    pipe(
      TE.Do,
      TE.chainFirst(() => TE.fromIO(start)),
      TE.chainFirst(() => TE.fromIO(resetErrors)),
      TE.chain(() => Auth.login(email, password)),
      TE.fold(
        flow(
          decodeResponseError,
          E.fold(
            error,
            flow((errors) => errors.errors, _setErrors)
          ),
          T.fromIO,
        ),
        flow(
          decodeResponseUser,
          E.fold(
            error,
            flow((response) => response.user, updateCurrentUser)
          ),
          T.fromIO
        )
      ),
      T.chainFirst(() => T.fromIO(stop))
    )();
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <LoginForm inProgress={inProgress} onSubmit={login} />
          </div>
        </div>
      </div>
    </div>
  );
};
