/**
 * @funfact Yeah i loved the sleep from python so much that i adopted it in JS (TypeScript) too!!
 *
 * @param {Number} seconds  The number of seconds to wait for
 * @returns {Promise}       How long to sleep for
 */
export async function sleep(seconds: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
