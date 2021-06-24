import { useState, useEffect, useCallback } from "react";
import * as E from "fp-ts/Either";
import * as IO from "fp-ts/IO";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { error, log } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";
import { Articles } from "../agent";

import {
  Article,
  decodeResponseArticle,
  decodeResponseArticles,
} from "../types";

export type ArticleListFilter =
  | {
      type: "tag";
      value: string;
    }
  | {
      type: "author";
      value: string;
    }
  | {
      type: "favorited";
      value: string;
    }
  | {
      type: "feed";
    }
  | {
      type: "all";
    };

interface Config {
  filter: ArticleListFilter;
  page: number;
}

const serializeFilter = (filter: ArticleListFilter) => {
  if (filter.type === "all") {
    return "all";
  }
  if (filter.type === "feed") {
    return "feed";
  }
  return `${filter.type}_${filter.value}`;
};

export const useArticles = (config: Config) => {
  const { filter, page } = config;

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);

  const serialized = serializeFilter(filter);

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);
    const _setArticles = (articles: Array<Article>) => () =>
      setArticles(articles);
    const _setArticlesCount = (count: number) => () => setArticlesCount(count);

    const loadArticles =
      filter.type === "all"
        ? Articles.all(page)
        : filter.type === "feed"
        ? Articles.feed(page)
        : {
            tag: Articles.byTag(filter.value, page),
            author: Articles.byAuthor(filter.value, page),
            favorited: Articles.favoritedBy(filter.value, page),
          }[filter.type];

    pipe(
      TE.Do,
      TE.chainFirstIOK(() => start),
      TE.chain(() => loadArticles),
      TE.fold(
        flow(error, T.fromIO),
        flow(
          decodeResponseArticles,
          E.fold(error, (res) =>
            pipe(
              IO.Do,
              IO.chain(() => _setArticles(res.articles)),
              IO.chain(() => _setArticlesCount(res.articlesCount))
            )
          ),
          T.fromIO
        )
      ),
      T.chainFirstIOK(() => stop)
    )();
  }, [serialized, config.page]);

  const _replaceArticle = useCallback(
    (newArticle: Article) => () =>
      setArticles((prevArticles) =>
        prevArticles.map((article) => {
          if (article.slug === newArticle.slug) {
            return newArticle;
          }
          return article;
        })
      ),
    []
  );

  const favorite = useCallback(
    (slug: string) =>
      pipe(
        Articles.favorite(slug),
        TE.fold(
          T.fromIOK(error),
          flow(
            decodeResponseArticle,
            E.fold(
              error,
              flow((res) => res.article, _replaceArticle)
            ),
            T.fromIO
          )
        )
      )(),
    [_replaceArticle]
  );

  const del = useCallback(
    (slug: string) =>
      pipe(
        Articles.del(slug),
        TE.fold(T.fromIOK(error), () => T.fromIO(log("successfully deleted.")))
      )(),
    []
  );

  const unfavorite = useCallback(
    (slug: string) =>
      pipe(
        Articles.unfavorite(slug),
        TE.fold(
          (e) => T.fromIO(error(e)),
          flow(
            decodeResponseArticle,
            E.fold(error, (response) => _replaceArticle(response.article)),
            T.fromIO
          )
        )
      )(),
    [_replaceArticle]
  );

  return {
    loading,
    articles,
    articlesCount,
    favorite,
    unfavorite,
    delete: del,
  };
};
