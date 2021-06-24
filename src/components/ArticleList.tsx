import { useState } from "react";
import { ArticlePreview } from "./ArticlePreview";
import { ListPagination } from "./ListPagination";
import { useArticles, ArticleListFilter } from "../hooks/useArticles";

export const ArticleList = (props: ArticleListFilter) => {
  const [page, setPage] = useState<number>(0);

  const { articles, articlesCount, favorite, unfavorite } = useArticles({
    filter: { ...props },
    page,
  });

  if (!articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map((article) => {
        return (
          <ArticlePreview
            key={article.slug}
            article={article}
            onFavorite={() => favorite(article.slug)}
            onUnfavorite={() => unfavorite(article.slug)}
          />
        );
      })}

      <ListPagination
        onSetPage={(p) => setPage(p)}
        articlesCount={articlesCount}
        currentPage={page}
      />
    </div>
  );
};
