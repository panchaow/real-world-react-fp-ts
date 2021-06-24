import { useState, useEffect } from "react";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { error } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";
import { useIfMounted } from "../hooks";

import { Comments } from "../agent";

import {
  Comment,
  decodeResponseComments,
  decodeResponseComment,
  decodeResponseError,
} from "../types";

// const createComment = (slug: string) => (comment: string) =>
//   Comments.create(slug, comment);

export const useComments = (slug: string) => {
  const ifMounted = useIfMounted();
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<Comment>>([]);

  useEffect(() => {
    const start = ifMounted(() => setLoading(true));
    const stop = ifMounted(() => setLoading(false));

    const _setComments = (comments: Array<Comment>) =>
      ifMounted(() => setComments(comments));

    const loadComments = pipe(
      TE.Do,
      TE.chainFirstIOK(() => start),
      TE.chain(() => Comments.forArticle(slug)),
      TE.chainFirstIOK(() => stop)
    );

    pipe(
      loadComments,
      TE.fold(
        flow(error, T.fromIO),
        flow(
          decodeResponseComments,
          E.fold(
            error,
            flow((res) => res.comments, _setComments)
          ),
          T.fromIO
        )
      )
    )();
  }, [slug]);

  const del = (id: Comment["id"]) => pipe(
    Comments.delete(slug, id),
    TE.foldW(
      (e) => T.fromIO(error(e)),
      () =>
        T.fromIO(() => {
          setComments(comments.filter((comment) => comment.id !== id));
        })
    )
  )();


  const create = (comment: string) => pipe(
    Comments.create(slug, comment),
    TE.foldW(
      flow(
        decodeResponseError,
        E.fold(
          (err) => {
            return T.Monad.chain(T.fromIO(error(err)), () => {
              return T.of(O.none);
            });
          },
          flow((e) => e.errors, O.of, T.of)
        )
      ),
      flow(
        decodeResponseComment,
        E.fold(
          error,
          flow(
            (res) => res.comment,
            (comment) => () => setComments([comment, ...comments])
          )
        ),
        T.fromIO
      )
    )
  )();

  return {
    comments,
    loading,
    create,
    del,
  };
};
