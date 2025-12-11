/**
 * Supabase Browser Client
 *
 * This client is used for client-side operations in Next.js 14 App Router.
 * Use this in Client Components (components with 'use client' directive).
 *
 * Features:
 * - Singleton pattern for optimal performance
 * - Uses browser cookies for auth state
 * - Supports real-time subscriptions
 */

import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Singleton pattern - reuse the same client instance
  if (client) {
    return client
  }

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

/**
 * Get the browser Supabase client
 * This is a convenience wrapper around createClient()
 */
export const getBrowserClient = createClient
