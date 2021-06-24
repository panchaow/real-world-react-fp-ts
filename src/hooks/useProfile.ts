import { useState, useEffect } from "react";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { error } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";

import { Profile as ProfileAgent } from "../agent";

import { Profile, decodeResponseProfile } from "../types";

import { invariant } from '../utils/invariant';


export const useProfile = (username: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const _setProfile = (profile: Profile) => () => setProfile(profile);


  const follow = () => {
    invariant(profile !== null, "failed to load profile")

    return pipe(
      ProfileAgent.follow(profile.username),
      TE.fold(
        T.fromIOK(error), // 请求失败，可能有很多种原因。这里只是简单的输出到console
        flow(
          decodeResponseProfile,
          E.fold(error, flow( res => res.profile, _setProfile )),
          T.fromIO,
        )
      )
    )()
  }

  const unfollow = () => {
    invariant(profile !== null, "failed to load profile")

    return pipe(
      ProfileAgent.unfollow(profile.username),
      TE.fold(
        T.fromIOK(error), // 请求失败，可能有很多种原因。这里只是简单的输出到console
        flow(
          decodeResponseProfile,
          E.fold(error, flow( res => res.profile, _setProfile )),
          T.fromIO,
        )
      )
    )()

  }


  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    const loadProfile = pipe(
      TE.Do,
      TE.chainFirstIOK(() => start),
      TE.chain(() =>  ProfileAgent.get(username)),
      TE.chainFirstIOK(() => end)
    );

    pipe(
      loadProfile,
      TE.fold(
        flow(error, TE.fromIO),
        flow(
          decodeResponseProfile,
          E.fold(error, (response) => _setProfile(response.profile)),
          TE.fromIO
        )
      )
    )();
  }, [username]);

  return {
    profile,
    loading,
    follow,
    unfollow,
  };
};
