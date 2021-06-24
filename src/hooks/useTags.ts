import { useState, useEffect } from "react";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { IO } from "fp-ts/IO";
import { error } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";

import { Tags } from "../agent";

import { Tag, decodeResponseTags } from "../types";

export const useTags = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<Tag>>([]);

  useEffect(() => {
    const loadTags = pipe(
      TE.Do,
      TE.chainFirstIOK((): IO<void> => () => setLoading(true)),
      TE.chain(() => Tags.getAll()),
      TE.chainFirstIOK((): IO<void> => () => setLoading(false))
    );

    pipe(
      loadTags,
      TE.fold(
        flow(error, TE.fromIO),
        flow(
          decodeResponseTags,
          E.fold(
            error,
            (response): IO<void> =>
              () =>
                setTags(response.tags)
          ),
          TE.fromIO
        )
      )
    )();
  }, []);

  return {
    tags,
    loading,
  };
};
