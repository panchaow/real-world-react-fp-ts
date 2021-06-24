import requests from "./requests";
// import { Article } from "./types";

// export interface UpdateUser {
//   email?: string;
//   username?: string;
//   password?: string;
//   image?: string;
//   bio?: string;
// }

export const Auth = {
  current: () => requests.get("/user"),
  login: (email: string, password: string) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username: string, email: string, password: string) =>
    requests.post("/users", { user: { username, email, password } }),
  save: <T extends unknown>(user: T) => requests.put("/user", { user }),
};

export const Tags = {
  getAll: () => requests.get("/tags"),
};

const limit = (count: number, p?: number) => ({
  limit: count,
  offset: p ? p * count : 0,
});

const omitSlug = (article: any) => {
  // return
  return Object.keys(article).reduce((o: any, key) => {
    if (key !== "slug") {
      o[key] = article[key];
    }

    return o;
  }, {});
};

// export interface NewArticle {
//   title: string;
//   description: string;
//   body: string;
//   tagList?: string[];
// }

// export interface UpdateArticle {
//   slug: string;
//   title?: string;
//   description?: string;
//   body?: string;
//   tagList?: string[];
// }

export const Articles = {
  all: (page?: number) =>
    requests.get(`/articles`, { params: limit(10, page) }),
  byAuthor: (author: string, page?: number) =>
    requests.get(`/articles`, {
      params: {
        author,
        ...limit(5, page),
      },
    }),
  byTag: (tag: string, page?: number) =>
    requests.get(`/articles`, {
      params: {
        tag,
        ...limit(10, page),
      },
    }),
  del: (slug: string) => requests.del(`/articles/${slug}`),
  favorite: (slug: string) => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author: string, page?: number) =>
    requests.get(`/articles`, {
      params: {
        favorited: author,
        ...limit(5, page),
      },
    }),
  feed: (page?: number) =>
    requests.get("/articles/feed", { params: limit(10, page) }),
  get: (slug: string) => requests.get(`/articles/${slug}`),
  unfavorite: (slug: string) => requests.del(`/articles/${slug}/favorite`),
  update: <T extends { slug: string }>(article: T) =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: <T extends object>(article: T) =>
    requests.post("/articles", { article }),
};

Articles.update({ slug: "q", title: "qwe" });

export const Comments = {
  create: (slug: string, comment: string) =>
    requests.post(`/articles/${slug}/comments`, { comment: { body: comment } }),
  delete: (slug: string, commentId: number) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug: string) => requests.get(`/articles/${slug}/comments`),
};

export const Profile = {
  follow: (username: string) => requests.post(`/profiles/${username}/follow`),
  get: (username: string) => requests.get(`/profiles/${username}`),
  unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
};
