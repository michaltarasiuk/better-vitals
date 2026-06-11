import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { auth } from "~/lib/auth/index.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    return await auth.handler(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await auth.handler(request);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
