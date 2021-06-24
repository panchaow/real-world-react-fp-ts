import {
  forwardRef,
  useReducer,
  Reducer,
  KeyboardEvent,
  FormEvent,
} from "react";

type FieldKeys = "title" | "description" | "body" | "tagInput" | "tagList";

type State = {
  [key in Exclude<FieldKeys, "tagList">]: string;
} & {
  tagList: Array<string>;
};

const updateField = <K extends Exclude<FieldKeys, "tagList">>(
  key: K,
  value: State[K]
) => {
  return {
    type: "UPDATE_FIELD" as const,
    key,
    value,
  };
};

const addTag = () => ({
  type: "ADD_TAG" as const,
});

const removeTag = (tag: string) => ({
  type: "REMOVE_TAG" as const,
  payload: tag,
});

type Action = ReturnType<typeof updateField | typeof addTag | typeof removeTag>;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.key]: action.value };
    case "ADD_TAG":
      return state.tagList.includes(state.tagInput)
        ? { ...state, tagInput: "" }
        : {
            ...state,
            tagList: [...state.tagList, state.tagInput],
            tagInput: "",
          };
    case "REMOVE_TAG":
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.payload),
      };
    default:
      throw new Error(`unsupported action: ${action}!`);
  }
};

export interface EditorFormProps {
  inProgress?: boolean;
  initialValues?: Partial<State>;
  onSubmit?: (fields: Pick<State, Exclude<FieldKeys, "tagInput">>) => void;
}

const initializer = (initialValues?: Partial<State>) => {
  return Object.assign({}, {
    title: "",
    description: "",
    body: "",
    tagInput: "",
    tagList: [],
  }, initialValues)
}

export const EditorForm = forwardRef<HTMLFormElement, EditorFormProps>(
  (props: EditorFormProps, ref) => {
    const { inProgress, initialValues, onSubmit = () => {} } = props;

    const [state, dispatch] = useReducer(reducer, initialValues, initializer );

    const { title, description, body, tagInput, tagList } = state;

    const watchForEnter = (ev: KeyboardEvent) => {
      if (ev.code === "Enter" && tagInput) {
        ev.preventDefault();
        dispatch(addTag());
      }
    };

    const handleSubmitForm = (e: FormEvent) => {
      e.preventDefault();
      onSubmit({ title, description, body, tagList });
    };

    return (
      <form ref={ref}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Article Title"
              value={title || ""}
              onChange={(e) => dispatch(updateField("title", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="What's this article about?"
              value={description || ""}
              onChange={(e) =>
                dispatch(updateField("description", e.target.value))
              }
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              value={body || ""}
              onChange={(e) => dispatch(updateField("body", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Enter tags"
              value={tagInput || ""}
              onChange={(e) =>
                dispatch(updateField("tagInput", e.target.value))
              }
              onKeyUp={watchForEnter}
            />

            <div className="tag-list">
              {tagList.map((tag) => {
                return (
                  <span className="tag-default tag-pill" key={tag}>
                    <i
                      className="ion-close-round"
                      onClick={() => dispatch(removeTag(tag))}
                    />
                    {tag}
                  </span>
                );
              })}
            </div>
          </fieldset>

          <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="button"
            disabled={inProgress}
            onClick={handleSubmitForm}
          >
            Publish Article
          </button>
        </fieldset>
      </form>
    );
  }
);
