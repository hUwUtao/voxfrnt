import { router } from "./trpc";
import { createContext } from "./context";

import { authRouter } from "./auth";

const appRouter = router({ auth: authRouter });

// Export type router type signature,
// NOT the router itself.
export { appRouter, createContext };
export type AppRouter = typeof appRouter;
