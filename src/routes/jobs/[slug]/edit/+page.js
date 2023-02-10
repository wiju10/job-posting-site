import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { isValidToken } from '../../../../utils/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  if (!(await isValidToken())) {
    throw redirect(307,'/login')
  }

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}