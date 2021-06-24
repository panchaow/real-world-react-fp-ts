import { pipe, flow } from "fp-ts/function";
import * as E from "fp-ts/Either";
import * as t from "io-ts";
import { failure } from "io-ts/PathReporter";
import { AxiosError, AxiosResponse } from "axios";

type Decode<I, A> = (i: I) => E.Either<Error, A>;

export const decodeWith = <A>(
  decoder: t.Decoder<unknown, A>
): Decode<unknown, A> =>
  flow(
    decoder.decode,
    E.mapLeft((errors) => new Error(failure(errors).join("\n")))
  );

const decodeAxiosError = flow(decodeWith, <A>(decode: Decode<unknown, A>) =>
  flow(
    (e: AxiosError<unknown>) => e.response,
    E.fromNullable(
      new Error("the provived error does not contain a response!")
    ),
    E.map((reseponse) => reseponse.data),
    E.chain(decode)
  )
);

const decodeAxiosResponse = flow(decodeWith, <A>(decode: Decode<unknown, A>) =>
  flow((res: AxiosResponse<unknown>) => res.data, decode)
);

export const responseError = t.type({
  errors: t.record(t.string, t.array(t.string))
});

export type Errors = t.TypeOf<typeof responseError>["errors"];

export const decodeResponseError = pipe(responseError, decodeAxiosError);

// const responseData = <C extends t.Mixed>(codec: C) =>
//   t.type({

//   })

const user = t.type({
  email: t.string,
  token: t.string,
  username: t.string,
  bio: t.union([t.string, t.null]),
  image: t.union([t.string, t.null]),
});

export const responseUser = t.type({
  user: user,
});

export type User = t.TypeOf<typeof user>;
// export type ResponseUser = t.TypeOf<typeof responseUser>;

export const decodeResponseUser = decodeAxiosResponse(responseUser);

const profile = t.type({
  username: t.string,
  bio: t.union([t.string, t.null]),
  image: t.union([t.string, t.null]),
  following: t.boolean,
});

const responseProfile = t.type({
  profile: profile,
});

export type Profile = t.TypeOf<typeof profile>;

export const decodeResponseProfile = decodeAxiosResponse(responseProfile);

const article = t.type({
  slug: t.string,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(t.string),
  createdAt: t.string,
  updatedAt: t.string,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profile,
});

export type Article = t.TypeOf<typeof article>;

const responseArticle = t.type({
  article: article,
});

export const decodeResponseArticle = decodeAxiosResponse(responseArticle);

const responseArticles = t.type({
  articles: t.array(article),
  articlesCount: t.number,
});

export const decodeResponseArticles = decodeAxiosResponse(responseArticles);

const comment = t.type({
  id: t.number,
  createdAt: t.string,
  updatedAt: t.string,
  body: t.string,
  author: profile,
})

export type Comment = t.TypeOf<typeof comment>;

const responseComment = t.type({
  comment: comment
})

export const decodeResponseComment = decodeAxiosResponse(responseComment);

const responseComments = t.type({
  comments: t.array(comment)
})

export const decodeResponseComments = decodeAxiosResponse(responseComments);

const tag = t.string

export type Tag = t.TypeOf<typeof tag>;

const responseTags = t.type({
  tags: t.array(tag)
})

export const decodeResponseTags = decodeAxiosResponse(responseTags)