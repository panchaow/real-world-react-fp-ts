import { Link } from "react-router-dom";

import type { Comment } from "../../types";

export interface CommentProps {
  comment: Comment;
  showDelete: boolean;
  onDelete?: () => void;
}

const CommentComp = (props: CommentProps) => {
  const comment = props.comment;
  // const show = props.currentUser &&
  //   props.currentUser.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={
              comment.author.image ||
              "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {/* <DeleteButton show={show} slug={props.slug} commentId={comment.id} /> */}
        {props.showDelete && (
          <span className="mod-options">
            <i
              className="ion-trash-a"
              onClick={() => {
                props.onDelete?.();
              }}
            ></i>
          </span>
        )}
      </div>
    </div>
  );
};

export { CommentComp as Comment }

