import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import * as IO from "fp-ts/IO";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { error } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";

import { ListErrors } from "../components/ListErrors";
import { SettingsForm } from "../components/SettingsForm";
import { useGlobalState } from "../components/GlobalStateProvider";

import { Auth } from "../agent";

import {
  Errors,
  decodeResponseError,
  decodeResponseUser,
  User,
} from "../types";
import { useIfMounted } from "../hooks";

const toFieldValues = (user: User) => {
  const values: any = {
    username: user.username,
    email: user.email,
  };

  if (user.bio) {
    values.bio = user.bio;
  }

  if (user.image) {
    values.image = user.image;
  }
  return values;
};

export const Settings = () => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const { currentUser, updateCurrentUser } = useGlobalState();
  const history = useHistory();
  const ifMounted = useIfMounted()

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  function save(user: any) {

    const resetErrors = pipe(() => setErrors({}), ifMounted);
    const _setErrors = (errors: Errors) => pipe(() => setErrors(errors), ifMounted);
    const start = pipe(() => setInProgress(true), ifMounted);
    const stop = pipe(() => setInProgress(false), ifMounted);
    const goHome = () => history.replace("/");

    return pipe(
      TE.Do,
      TE.chainFirst(() => TE.fromIO(start)),
      TE.chainFirst(() => TE.fromIO(resetErrors)),
      TE.chain(() => Auth.save(user)),
      TE.fold(
        flow(
          decodeResponseError,
          E.fold(
            flow(error, T.fromIO),
            flow((errors) => errors.errors, _setErrors, T.fromIO)
          ),
        ),
        flow(
          decodeResponseUser,
          E.fold(
            flow(error, T.fromIO),
            flow(
              (response) => response.user,
              updateCurrentUser,
              IO.chain(() => goHome),
              T.fromIO
            )
          ),
        )
      ),
      T.chainFirst(() => T.fromIO(stop))
    )();
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors} />

            <SettingsForm
              inProgress={inProgress}
              initialValues={toFieldValues(currentUser)}
              onSubmit={save}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={updateCurrentUser(null)}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
