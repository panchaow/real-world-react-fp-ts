// import React, { FC, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import * as E from 'fp-ts/Either';
// import { IO } from "fp-ts/IO";
// import { log, error } from 'fp-ts/Console';
// import * as T from "fp-ts/Task";
// import { pipe, flow } from "fp-ts/function";
// import TE from "fp-ts/lib/TaskEither";
// import { Auth } from "../agent";
// import { decodeResponseError, decodeResponseUser, ResponseError, responseUser, User } from '../types';

// const setCurrentUser = (currentUser: User): IO<void> => () => { }

// const submitForm = (email: string, password: string) =>
//   Auth.login(email, password);

// const Login: FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [inProgress, setInProgres] = useState<boolean>(false);
//   const [errors, setErrors] = useState<Record<string, string[]>>({});

//   const _setErrors = (e: ResponseError): IO<void> => () => setErrors(e.errors);

//   const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
//     // submitForm(email, password);

//     pipe(
//       () => { setInProgres(true) },
//       TE.fromIO,
//       TE.chain(() => submitForm(email, password)), // TaskEither<AxiosError, AxiosResponse>
//       TE.foldW(flow(
//         decodeResponseError, // Either Error ResponseError -> Task void
//         E.fold(error, _setErrors),
//         T.fromIO,
//       ), flow(
//         decodeResponseUser,
//         E.fold(error, (response) => setCurrentUser(response.user)),
//         T.fromIO,

//       ))
//       // TE.fold()
//       // TE.getOrElse(e => {
//       //   if (e.response) {
//       //     // e.response.data
//       //     const data = e.response.data;
//       //     return T.fromIO(() => {
//       //       setErrors(data)
//       //     })
//       //   }
//       //   return T.fromIO(error(e))
//       // })
//       // TE.getOrElse((e) => { 
//       //   return pipe(
//       //     e,
//       //     E.fold(
//       //       () => error(e),
//       //       (s) => () => {
//       //         return setErrors(s.errors)
//       //       }
//       //     ),
//       //     T.fromIO
//       //   )

//       // })
//     )

//     // pipe(
//     //   TE.Do,
//     //   // TE.chainFirst(() =>
//     //   //   TE.fromIO(() => {
//     //   //     setInProgres(true);
//     //   //   })
//     //   // ),
//     //   TE.chainFirstIOK(() => () => setInProgres(true)),
//     //   TE.chain(() => submitForm(email, password)),
//     //   TE.chainFirstIOK(() => () => setInProgres(false))
//     //   TE.getOrElse
//     // );
//   };

//   return (
//     <div className="auth-page">
//       <div className="container page">
//         <div className="row">
//           <div className="col-md-6 offset-md-3 col-xs-12">
//             <h1 className="text-xs-center">Sign In</h1>
//             <p className="text-xs-center">
//               <Link to="/register">Need an account?</Link>
//             </p>

//             <ListErrors errors={this.props.errors} />

//             <form onSubmit={onSubmitForm}>
//               <fieldset>
//                 <fieldset className="form-group">
//                   <input
//                     className="form-control form-control-lg"
//                     autoComplete="username"
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </fieldset>

//                 <fieldset className="form-group">
//                   <input
//                     className="form-control form-control-lg"
//                     type="password"
//                     autoComplete="current-password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </fieldset>

//                 <button
//                   className="btn btn-lg btn-primary pull-xs-right"
//                   type="submit"
//                   disabled={inProgress}
//                 >
//                   Sign in
//                 </button>
//               </fieldset>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';

export const Login = () => {
  return  ""
}