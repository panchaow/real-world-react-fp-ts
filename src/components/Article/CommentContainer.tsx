import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import {
  User,
  Errors,
} from "../../types";
import { ListErrors } from "../ListErrors";
import { useComments } from "../../hooks";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isSome } from 'fp-ts/Option';

interface CommentContainerProps {
  slug: string;
  currentUser?: User | null;
}

export const CommentContainer = (props: CommentContainerProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const { comments, loading, create, del } = useComments(props.slug);

  if (props.currentUser) {

    const handleSubmit = async (comment: string) => {
      const res = await create(comment);
      
      if (res && isSome(res)) {
        setErrors(res.value)
      }
    }

    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={errors} />
          <CommentInput
            currentUser={props.currentUser}
            onSubmit={handleSubmit}
          />
        </div>

        <CommentList
          comments={comments}
          slug={props.slug}
          currentUser={props.currentUser}
          onDelete={(id) => del(id)}
        />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={comments}
          slug={props.slug}
          onDelete={(id) => del(id)}
        />
      </div>
    );
  }
};
