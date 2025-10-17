# Technical Exercise — Insurance React Live Coding

## Context
This repository contains a small React + TypeScript application prepared for a live-coding exercise. The frontend consumes two mocked endpoints provided via Beeceptor to:

- List insurers: `GET https://jaya-insurance.free.beeceptor.com/insurances`
- Create policies: `POST https://jaya-insurance.free.beeceptor.com/policies/` (the POST is intentionally left for the candidate to implement)

The app uses Vite and includes Tailwind via CDN with a Flamingo pink theme for quick styling.

## Exercise goal
The goal is to evaluate frontend skills in a short live-coding session. The candidate should implement the missing network interaction for creating a policy and demonstrate good React/TypeScript practices, clear UI feedback and error handling.

The exercise evaluates:
- Clear, well-structured React + TypeScript code
- Proper use of fetch/http client and async handling
- Error handling and user feedback in the UI
- Type usage (types/interfaces)
- Small UX polish (forms, validation, responsiveness)

## What you must implement (candidate task)

### 1) Implement the POST call to create a policy
File: `src/lib/api.ts`
Function: `createPolicy(payload: PolicyPayload)`

The function should:
- Perform an HTTP POST to `https://jaya-insurance.free.beeceptor.com/policies/` with the JSON payload
- Handle non-2xx responses by throwing a descriptive error
- Return the parsed JSON response on success

Example expected request body (already used by the UI):

```json
{
  "insurance_id": "ec7a15de-3f99-4e92-902b-44e2198ff46c",
  "quote_id": "qte_92f3c8a1",
  "insurance_type": "Car",
  "plan_code": "AUTO_PREMIUM",
  "policy_start_date": "2025-10-09",
  "applicant": {
    "full_name": "John Doe",
    "document_id": "999.999.999-99",
    "birthdate": "1990-04-12",
    "email": "john.doe@email.com",
    "phone": "+55 11 99999-9999",
    "address": {
      "country": "BR",
      "postal_code": "01310-000",
      "city": "São Paulo",
      "state": "SP",
      "street": "Av. Paulista, 1000, apto 12"
    }
  },
  "risk_object": { "car": { "vin": "9BWZZZ377VT004251", "plate": "ABC1D23", "year": 2022, "make": "Volkswagen", "model": "Golf" } },
  "beneficiaries": [{ "name": "Jane Doe", "relationship": "Spouse", "share": 100 }],
  "payment": { "method": "credit_card", "currency": "BRL", "installments": 12, "amount": 129.5, "card": { "holder_name": "JOHN DOE", "last4": "4242", "token": "tok_visa_abc123" } },
  "metadata": { "channel": "web", "utm_source": "campaign_oct" }
}
```

Suggested implementation (replace placeholder in `src/lib/api.ts`):

```ts
export async function createPolicy(payload: PolicyPayload) {
  const res = await fetch(`${BASE}/policies/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Create policy failed: ${res.status}`)
  return res.json()
}
```

The UI (`src/components/PolicyForm.tsx`) will display the response or the error message — make sure to return the JSON the endpoint provides.

### 2) (Optional frontend improvements)
- Add basic validation to the policy form (required fields)
- Show loading / success states more explicitly
- Improve error messages based on server response

## Important notes and project specifics
- The project already injects a test insurer named **Flamingo Insurance** into the insurers list (see `src/lib/api.ts`) so you can test the flow without modifying Beeceptor.
- Tailwind is included via CDN in `index.html` and a flamingo pink theme is defined (use `bg-primary`, `text-primary`, `focus:ring-primary` etc.).
- The `createPolicy` function is intentionally left as the exercise — all other wiring (form, state, types) is implemented and typed.

API endpoints used in this exercise
- GET insurers: `https://jaya-insurance.free.beeceptor.com/insurances`
- POST policies: `https://jaya-insurance.free.beeceptor.com/policies/`

## Acceptance criteria / Evaluation
Your submission will be evaluated on the following:
- The `createPolicy` function performs the POST and returns the endpoint JSON on success
- The UI shows appropriate loading, success and error states
- Code is clean, typed and easy to follow
- Small UX considerations (field placeholders, labels, accessible buttons)

## How to run the project locally
1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open the app in the browser (Vite will show the URL, typically `http://localhost:5173`)

4. Login credentials for the live test

- Username: `admin`
- Password: `admin`

5. To test the policy creation flow locally
- Open the dashboard after login
- Use the Create Policy panel (Flamingo Insurance is present by default)
- Submit; if `createPolicy` is still the placeholder the UI will show an instruction/error — implement the function to get a successful response

## Project structure (relevant files)
- `src/lib/api.ts` — API helpers; implement `createPolicy` here
- `src/components/PolicyForm.tsx` — policy creation form (constructs payload)
- `src/pages/Dashboard.tsx` — main UI that fetches insurers and renders the form
- `src/components/InsurerList.tsx` — list of insurers
- `src/pages/Login.tsx` — simple admin/admin login
- `index.html` — includes Tailwind CDN and flamingo theme

## Extras / Hints
- Use `fetch` or `httpx`-like abstractions (frontend: `fetch` is fine)
- Make sure to set `Content-Type: application/json` on the POST
- Handle non-2xx responses explicitly and return useful messages

## Troubleshooting
- If the UI shows an error about `createPolicy not implemented`, implement the POST in `src/lib/api.ts` as described above and re-run the flow.
- If the insurers list is empty, the app already prepends **Flamingo Insurance** to the list.

---

Good luck on the live coding test!
