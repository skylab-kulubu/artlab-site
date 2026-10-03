"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { CmsProvider } from "inscribed";
import { useCallback, useEffect, useMemo, type ComponentProps } from "react";
import type { Session } from "next-auth";

type CmsProps = ComponentProps<typeof CmsProvider>;
type ArtlabSession = Session & { accessToken?: string; error?: string };

// The adapter package's NextAuthCmsProvider forwards only the props it names and
// drops the ones inscribed 5 adds, so this wrapper forwards everything it is given.
function Inner({ isAdmin, children, ...props }: CmsProps) {
  const session = useSession().data as ArtlabSession | null;

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") signIn("keycloak");
  }, [session?.error]);

  // Always handed over, so inscribed never starts its own browser sign-in flow.
  const getAccessToken = useCallback(async () => session?.accessToken ?? "", [session?.accessToken]);

  const user = session?.user;
  const userInfo = useMemo(
    () => (user ? { name: user.name ?? null, email: user.email ?? null, image: user.image ?? null } : null),
    [user],
  );
  const onSignOut = useCallback(() => signOut({ callbackUrl: "/" }), []);

  return (
    <CmsProvider {...props} isAdmin={isAdmin} getAccessToken={getAccessToken} userInfo={userInfo} onSignOut={onSignOut}>
      {children}
    </CmsProvider>
  );
}

export function ArtlabCmsProvider({ session, ...props }: CmsProps & { session?: Session | null }) {
  return (
    <SessionProvider session={session}>
      <Inner {...props} />
    </SessionProvider>
  );
}
