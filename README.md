# Kurt plays the tuba Eleventy Site

Marketing site for a local music teaching business built with Eleventy (11ty), including:

- Staff page with instructor bios
- Individual instructor profile pages
- Services page with service-to-instructor linking
- Booking request form per instructor (Netlify Forms)
- Service-specific booking pages (preselected service + eligible instructors)
- Client-accessible content manager at `/admin/`
- Homepage contact form managed through Netlify Forms
- Stripe checkout integration via Netlify Function
- Optional alternate payment provider links (PayPal and Square placeholders)

Client handoff instructions: [Payment Setup Guide](CLIENT_PAYMENT_SETUP.md)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run local site:

```bash
npm run dev
```

Site will be available at `http://localhost:8080`.

## Stripe Setup

1. Copy environment template:

```bash
cp .env.example .env
```

2. Add your Stripe secret key to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
```

3. To test the Stripe function locally, run with Netlify Dev (requires Netlify CLI):

```bash
npx netlify dev
```

This serves the site and functions together, so the Services page button can call:

- `/.netlify/functions/create-checkout-session`

## Client CMS Setup

The site includes Decap CMS at `/admin/`. Editors can add, edit, reorder, and remove lessons and instructors, upload images, and update homepage and contact copy. Published edits are committed to the connected Git repository and trigger a Netlify rebuild.

After connecting the repository to Netlify:

1. In Netlify, open **Site configuration > Identity** and enable Identity.
2. Set registration to **Invite only**.
3. Under **Services**, enable **Git Gateway**.
4. Open the Identity users page and invite the client by email.
5. The client accepts the invitation, then signs in at `https://YOUR-SITE.netlify.app/admin/`.

The CMS publishes to the `main` branch. If the connected repository uses another production branch, update `branch` in `src/admin/config.yml`.

Lessons and instructors use a stable **ID / URL slug**. Create the instructor first, then select that instructor while editing a lesson. Avoid changing an ID after its page has been published because the ID controls its URL.

## Content Data

- Business/site metadata: `src/_data/site.json`
- Homepage and contact copy: `src/_data/home.json`
- Staff profiles: `src/_data/staff.json`
- Services and prices: `src/_data/services.json`
- Other payment providers: `src/_data/payments.json`
- Instructor profile template and booking form: `src/staff-profile.njk`
- Service booking template: `src/service-booking.njk`

## Contact Submissions

The homepage contact form and lesson booking forms are detected automatically by Netlify during deployment. Submissions appear under **Forms** in the Netlify dashboard. Configure form notification emails there so the client receives new inquiries.

## Payments

Stripe prices are read from the CMS-managed lesson records and revalidated in the Netlify Function, so visitors cannot submit their own amount. Set `STRIPE_SECRET_KEY` in **Site configuration > Environment variables** before accepting live payments. Use a Stripe live secret key only after test checkout has been verified.

## Build

```bash
npm run build
```

Static files are generated in `_site/`.
