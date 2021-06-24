import { Comment } from "./Comment";
import type { User, Comment as TComment } from "../../types";

export interface ComponentListProps {
  comments: Array<TComment>;
  slug: string;
  currentUser?: User;
  onDelete?: (id: TComment["id"] ) => void;
}

export const CommentList = (props: ComponentListProps) => {

  return (
    <div>
      {props.comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            showDelete={
              !!(
                props.currentUser &&
                props.currentUser.username === comment.author.username
              )
            }
            onDelete={() => props.onDelete?.(comment.id)}
          />
        );
      })}
    </div>
  );
};
