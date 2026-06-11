import { createContext } from "react-router";

import type { getServerSession } from "./session.server";

export type ServerSession = NonNullable<
  Awaited<ReturnType<typeof getServerSession>>
>;

export const sessionContext = createContext<ServerSession>();
