import { forwardRef, useReducer, Reducer, FormEvent } from "react";

type FieldKeys = "username" | "email" | "password";

type State = {
  [key in FieldKeys]: string;
};

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

export interface RegisterFormProps {
  inProgress?: boolean;
  initialValues?: Partial<State>;
  onSubmit?: (username: string, email: string, password: string) => void;
}

const initializer = (initialValues?: Partial<State>) => {
  return Object.assign({ username: "", email: "", password: "" }, initialValues);
};

export const RegisterForm = forwardRef<HTMLFormElement, RegisterFormProps>(
  (props, ref) => {
    const { inProgress = false, initialValues, onSubmit = () => {} } = props;
    const [state, dispatch] = useReducer(reducer, initialValues, initializer);

    const { username, email, password } = state;

    const handleSubmitForm = (e: FormEvent) => {
      e.preventDefault();
      onSubmit(username, email, password);
    };

    return (
      <form ref={ref} onSubmit={handleSubmitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={username || ""}
              onChange={(e) =>
                dispatch(updateField("username", e.target.value))
              }
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              autoComplete="username"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => dispatch(updateField("email", e.target.value))}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password || ""}
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
            Sign up
          </button>
        </fieldset>
      </form>
    );
  }
);
