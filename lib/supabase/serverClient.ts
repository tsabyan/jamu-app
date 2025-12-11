/**
 * Supabase Server Client
 *
 * This client is used for server-side operations in Next.js 14 App Router.
 * Use this in Server Components, Server Actions, and Route Handlers.
 *
 * Features:
 * - Uses cookies for auth state management
 * - Supports Server Components and Server Actions
 * - Automatically handles auth token refresh
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Create a Supabase client for use in Server Actions
 * This is a convenience wrapper around createClient()
 */
export const getServerClient = createClient
