import { Errors } from '../types';

export interface ListErrorsProps {
  errors?: Errors;
}

export const ListErrors = (props: ListErrorsProps) => {
    const errors = props.errors;
    if (errors) {
      return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key} {errors[key].join(";")}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
}

