import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the auth page if not authenticated
  // In a real app, we would check for authentication here
  redirect("/auth")

  return null
}

