export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.

import { isValidToken } from '../utils/auth';

export async function load() {
  await isValidToken()
}