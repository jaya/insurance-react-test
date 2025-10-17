import { useMemo, useState } from 'react'
import { createPolicy } from '../lib/api.ts'
import type { Insurer, Plan } from '../types'

type Props = { insurers: Insurer[] }

export default function PolicyForm({ insurers }: Props) {
  const [insuranceId, setInsuranceId] = useState<string>('')
  const [planCode, setPlanCode] = useState<string>('')
  const [applicantName, setApplicantName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [status, setStatus] = useState<string | null>(null)

  const selectedInsurer = useMemo(() => insurers.find((i) => i.id === insuranceId), [insurers, insuranceId])

  const plans: Plan[] = selectedInsurer?.plans ?? []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const payload = {
      insurance_id: insuranceId || (insurers[0] && insurers[0].id),
      quote_id: `qte_${Math.random().toString(36).slice(2, 9)}`,
      insurance_type: selectedInsurer?.insurance_type ?? 'Car',
      plan_code: planCode || (plans[0] && plans[0].name.replace(/\s+/g, '_').toUpperCase()),
      policy_start_date: new Date().toISOString().slice(0, 10),
      applicant: {
        full_name: applicantName || 'John Doe',
        email: email || 'john.doe@example.com',
        phone: phone || '+55 11 99999-9999'
      },
      payment: {
        method: 'credit_card',
        currency: 'BRL',
        installments: 1,
        amount: plans[0]?.monthly_premium ?? 100.0,
        card: { holder_name: 'JOHN DOE', last4: '4242', token: 'tok_visa_demo' }
      }
    }

    try {
      const res = await createPolicy(payload)
      setStatus(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setStatus(message)
      console.error('createPolicy error', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Insurance Provider</label>
        <select
          value={insuranceId}
          onChange={(e) => setInsuranceId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 p-2"
        >
          <option value="">Select a provider (or leave the first)</option>
          {insurers.map((ins) => (
            <option key={ins.id} value={ins.id}>{ins.company_name} — {ins.insurance_type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Plan</label>
        <select
          value={planCode}
          onChange={(e) => setPlanCode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 p-2"
        >
          <option value="">Choose a plan</option>
          {plans.map((p) => (
            <option key={p.name} value={p.name}>{p.name} — {p.currency} {p.monthly_premium}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Applicant name</label>
        <input value={applicantName} onChange={(e) => setApplicantName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 p-2" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 p-2" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 p-2" />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-3 py-1 bg-primary text-white rounded">Create Policy</button>
        <button type="button" onClick={() => { setStatus(null); }} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Clear</button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Note: the POST method to create the policy is intentionally not implemented in <code>src/lib/api.ts</code> — the candidate should implement it during the exercise. When clicking "Create Policy" the app will call that function and show the response or an error message.
      </div>

      {status && (
        <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto">{status}</pre>
      )}
    </form>
  )
}
