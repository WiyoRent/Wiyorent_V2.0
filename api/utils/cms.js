// Sends review text to an external content-moderation service and returns its
// verdict (e.g. 'clean' or 'toxic'), used by the review controllers to decide
// whether a review is auto-approved, rejected, or sent to pending moderation.
export const moderateContent = async (text) => {
  const res = await fetch('https://cms-production-8d9e.up.railway.app/moderate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(`CMS moderation failed: ${res.status}`)
  return await res.json()
}
