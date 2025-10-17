export type Plan = {
  name: string
  coverage_limit: number
  monthly_premium: number
  currency: string
  benefits: string[]
}

export type Contact = {
  email: string
  phone: string
  website?: string
}

export type CustomerSupport = {
  available_24_7: boolean
  languages: string[]
}

export type Insurer = {
  id: string
  insurance_type: string
  company_name: string
  description?: string
  country?: string
  founded_year?: number
  average_rating?: number
  contact?: Contact
  plans?: Plan[]
  customer_support?: CustomerSupport
  is_active?: boolean
  last_updated?: string
}

// Minimal type for the policy payload expected by the POST endpoint.
export type PolicyPayload = {
  insurance_id: string
  quote_id: string
  insurance_type: string
  plan_code: string
  policy_start_date: string
  applicant: {
    full_name: string
    document_id?: string
    birthdate?: string
    email?: string
    phone?: string
    // use `unknown` instead of `any` to avoid lint errors
    address?: Record<string, unknown>
  }
  // keep flexible but avoid `any` - use unknown
  risk_object?: Record<string, unknown>
  beneficiaries?: Array<Record<string, unknown>>
  payment?: Record<string, unknown>
  metadata?: Record<string, unknown>
}
