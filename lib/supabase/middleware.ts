import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// TODO: Wire real Supabase session refresh when auth is implemented
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request })
}
