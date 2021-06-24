import { Link } from "react-router-dom";

import { Article } from "../../types";

export interface ArticleMetaProps {
  article: Article;
  canModify: boolean;
  onDelete?: () => void;
}

export const ArticleMeta = (props: ArticleMetaProps) => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img
          src={
            article.author.image ||
            "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          alt={article.author.username}
        />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      {props.canModify ? (
        <span>
          <Link
            to={`/editor/${article.slug}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              props.onDelete?.();
            }}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};
