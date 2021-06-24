import marked from 'marked';
import { useHistory, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import * as E from 'fp-ts/Either';
import { error } from 'fp-ts/Console';
import { flow } from 'fp-ts/function';
import { useGlobalState } from '../components/GlobalStateProvider';
import {ArticleMeta} from '../components/Article/ArticleMeta';
import { CommentContainer } from '../components/Article/CommentContainer';
// import moduleName from '../components/Article/';
import { useArticle } from '../hooks';

export const Article = () => {
  const { slug } = useParams<{slug: string}>();
  const history = useHistory();
  const { article, loading, del } = useArticle(slug);
  const { currentUser } = useGlobalState();

  if (loading || !article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitizer: DOMPurify.sanitize }) };
  const canModify = currentUser ? currentUser.username === article.author.username : false;

  const handleDelete = async  () => {
    const getHome = () => history.push("/")

    flow(
      E.fold(
        error,
        () => getHome
      )
    )(await del())()

  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} canModify={canModify} onDelete={handleDelete} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup}></div>

            <ul className="tag-list">
              {
                article.tagList.map(tag => {
                  return (
                    <div className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">

        </div>

        <div className="row">
          <CommentContainer
            slug={slug}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  )
}