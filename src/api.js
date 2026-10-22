import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export async function fetchListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map((row) => ({ ...row, moveIn: row.move_in }))
}

export async function createListing(form) {
  const { moveIn, ...rest } = form

  const { data, error } = await supabase
    .from('listings')
    .insert({ ...rest, move_in: moveIn })
    .select()
    .single()

  if (error) throw error
  return { ...data, moveIn: data.move_in }
}