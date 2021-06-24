import { IO } from 'fp-ts/IO';
import * as O from "fp-ts/Option"

export const getItem = (key: string): IO<O.Option<string>> => () => O.fromNullable(window.localStorage.getItem(key))

export const setItem = (key: string) => (value: string): IO<void> => () => window.localStorage.setItem(key, value)

export const removeItem = (key: string): IO<void> => () => window.localStorage.removeItem(key);

export const clear : IO<void> = () => window.localStorage.clear();
