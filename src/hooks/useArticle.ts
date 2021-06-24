import { useState, useEffect } from "react";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import { error } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";

import { useIfMounted } from '../hooks';
import { Articles } from "../agent";
import { Article, decodeResponseArticle } from "../types";

export const useArticle = (slug: string) => {
  const ifMounted = useIfMounted();
  const [loading, setLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<Article | null>(null);

  const del = Articles.del(slug);

  useEffect(() => {
    const start = ifMounted(() => setLoading(true));
    const stop = ifMounted(() => setLoading(false));
    const _setArticle = (article: Article) => ifMounted(() => setArticle(article));

    const loadArticle = pipe(
      TE.Do,
      TE.chainFirstIOK(() => start),
      TE.chain(() => Articles.get(slug)),
      TE.chainFirstIOK(() => stop)
    );

    pipe(
      loadArticle,
      TE.fold(
        flow(error, T.fromIO),
        flow(
          decodeResponseArticle,
          E.fold(
            error,
            flow((res) => res.article, _setArticle)
          ),
          T.fromIO
        )
      )
    )();
  }, [slug]);

  return {
    article,
    loading,
    del,
  }
};
