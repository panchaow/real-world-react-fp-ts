import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { error } from "fp-ts/Console";
import { pipe, flow } from "fp-ts/function";

import { EditorForm, EditorFormProps } from "../components/EditorForm";
import { ListErrors } from "../components/ListErrors";
import { Errors, decodeResponseError, decodeResponseArticle } from "../types";
import { Articles } from "../agent";
import { useArticle, useIfMounted } from "../hooks";



export const Editor = (props: Pick<EditorFormProps, "initialValues"> & { save: typeof Articles.create }) => {
  const history = useHistory();
  const [inProgress, setInProgress] = useState<boolean>(false);
  // const [loaded, setLoaded] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const ifMounted = useIfMounted();

  function save(article: any) {
    const resetErrors = ifMounted(() => setErrors({}));
    const _setErrors = (errors: Errors) =>
      ifMounted(() => setErrors(errors));
    const start = ifMounted(() => setInProgress(true));
    const stop = ifMounted(() => setInProgress(false));

    return pipe(
      TE.Do,
      TE.chainFirst(() => TE.fromIO(start)),
      TE.chainFirst(() => TE.fromIO(resetErrors)),
      TE.chain(() => props.save(article)
      ),
      TE.fold(
        flow(
          decodeResponseError,
          E.fold(
            flow(error, T.fromIO),
            flow((errors) => errors.errors, _setErrors, T.fromIO)
          )
        ),
        flow(
          decodeResponseArticle,
          E.fold(
            flow(error, T.fromIO),
            () =>
              pipe(() => {
                history.push("/");
              }, T.fromIO)
          )
        )
      ),
      T.chainFirst(() => T.fromIO(stop))
    )();
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />
            <EditorForm
              inProgress={inProgress}
              onSubmit={save}
              initialValues={props.initialValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateEditor = () => {
  return (
    <Editor save={Articles.create} />
  )
}

export const EditEditor = () => {
  const { slug } = useParams<{ slug: string }>();

  const { article } = useArticle(slug);

  if (!article) {
    return null;
  }


  return (
    <Editor initialValues={article} save={(article) => Articles.update({slug, ...article})} />
  )
}