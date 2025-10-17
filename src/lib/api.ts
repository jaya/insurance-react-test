import type { PolicyPayload, Insurer, Plan } from '../types'

const BASE = 'https://jaya-insurance.free.beeceptor.com'

export async function getInsurers() {
  const res = await fetch(`${BASE}/insurances`)
  if (!res.ok) throw new Error(`Failed to fetch insurers: ${res.status}`)
  const data = (await res.json()) as { insurers?: Insurer[] }

  // Ensure the test insurer "Flamingo Insurance" is present as the first item
  const hasFlamingo = (data.insurers ?? []).some((i) => i.company_name === 'Flamingo Insurance')
  if (!hasFlamingo) {
    const flamingo: Insurer = {
      id: 'flamingo-000',
      insurance_type: 'Multi',
      company_name: 'Flamingo Insurance',
      description: 'Test insurer for the live-coding exercise. Use this as the default provider.',
      country: 'Global',
      founded_year: 2025,
      average_rating: 5.0,
      contact: {
        email: 'support@flamingo.example',
        phone: '+1-000-000-0000',
        website: 'https://flamingo.example'
      },
      plans: [
        {
          name: 'Flamingo Basic',
          coverage_limit: 50000,
          monthly_premium: 29.9,
          currency: 'USD',
          benefits: ['Basic coverage', 'Fast claims']
        } as Plan
      ],
      customer_support: {
        available_24_7: true,
        languages: ['English']
      },
      is_active: true,
      last_updated: new Date().toISOString()
    }

    data.insurers = [flamingo, ...(data.insurers ?? [])]
  }

  return data
}

/**
 * Candidate should implement this function during the live coding exercise.
 * Expected behavior:
 * - POST to `${BASE}/policies/` with the policy payload
 * - return the created policy JSON (as shown in the prompt)
 */
export async function createPolicy(payload: PolicyPayload) {
    // TODO : implement the POST request to create a policy
    console.warn('createPolicy called with payload (implement this):', payload)
    throw new Error('createPolicy not implemented. Implement POST to /policies/ in src/lib/api.ts')
}
