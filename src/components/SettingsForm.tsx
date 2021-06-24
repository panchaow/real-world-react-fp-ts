import { forwardRef, useReducer, Reducer, FormEvent } from "react";

type State = {
  image?: string;
  username: string;
  bio?: string;
  email: string;
  password: string;
};

type FieldKeys = keyof State;

const updateField = <K extends FieldKeys>(key: K, value: State[K]) => {
  return {
    type: "UPDATE_FIELD" as const,
    key,
    value,
  };
};

type Action = ReturnType<typeof updateField>;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.key]: action.value };
    default:
      throw new Error(`unsupported action: ${action}!`);
  }
};

export interface SettingsFormProps {
  inProgress?: boolean;
  initialValues?: Partial<State>;
  onSubmit?: (fields: Pick<State, Exclude<FieldKeys, "tagInput">>) => void;
}

const initializer = (initialValues?: Partial<State>): State => {
  return Object.assign(
    {
      image: "https://static.productionready.io/images/smiley-cyrus.jpg",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
    initialValues
  );
};

export const SettingsForm = forwardRef<HTMLFormElement, SettingsFormProps>(
  (props, ref) => {
    const { inProgress, initialValues, onSubmit = () => {} } = props;

    const [state, dispatch] = useReducer(reducer, initialValues, initializer);

    const { image, username, bio, email, password } = state;

    const handleSubmitForm = (e: FormEvent) => {
      e.preventDefault();
      const values: any = { image, username, bio, email };
      if (password) {
        values.password = password;
      }
      onSubmit(values);
    };

    return (
      <form ref={ref} onSubmit={handleSubmitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={image}
              onChange={(e) => dispatch(updateField("image", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                dispatch(updateField("username", e.target.value))
              }
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={bio}
              onChange={(e) => dispatch(updateField("bio", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              autoComplete="username"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => dispatch(updateField("email", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              autoComplete="current-password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                dispatch(updateField("password", e.target.value))
              }
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
);
