const { error, log } = require('fp-ts/lib/Console');
const { pipe } = require('fp-ts/lib/function');
const TE = require('fp-ts/lib/TaskEither');

const task1 = TE.tryCatch(() =>  new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("promise 1")
  }, 1000)
}), (reason) => new Error(String(reason)))

const task2 = TE.tryCatch(() =>  new Promise((resolve) => {
  setTimeout(() => {
    resolve("promise 2")
  }, 2000)
}), (reason) => new Error(String(reason)))

pipe(
  TE.Do,
  TE.chainFirstIOK(() => log("hello")),
  TE.chain(() => task1),
  TE.alt(() => task2),
  TE.chainFirstIOK(() => log("world")),
  // TE.chain(() => task2)
)().then((x) => {
  console.log(x)
})
