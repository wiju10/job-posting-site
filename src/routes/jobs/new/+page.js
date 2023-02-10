import { isValidToken, isLoggedIn } from '../../../utils/auth';
import { redirect } from '@sveltejs/kit'
import { alerts } from '../../../utils/alerts';

export async function load() {
  if (!(await isValidToken())) {
    alerts.setAlert('User is required to sign in', 'error')
    throw redirect(307,'/login');
  }
}
