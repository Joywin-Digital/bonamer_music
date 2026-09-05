# Client Payment Setup Guide

This guide explains how to connect payments for the Tubonamer Music website. The website currently uses **Stripe Checkout** for secure, one-time card payments.

## Before You Begin

You will need:

- Access to the business email account
- Business and owner information for identity verification
- The bank account where payouts should be deposited
- Access to the site's Netlify account
- Access to the website editor at `https://YOUR-DOMAIN.com/admin/`

Never send secret API keys by email, text message, or chat. Add them directly to Netlify.

## 1. Create and Secure the Stripe Account

1. Go to [stripe.com](https://stripe.com/) and create an account using an email address controlled by the business.
2. Verify the email address.
3. Turn on two-step authentication under the Stripe account's security settings.
4. Invite any other people who need access as team members. Do not share one login.

## 2. Activate Payments and Payouts

In the Stripe Dashboard, select **Activate payments** and complete Stripe's application. Stripe may ask for:

- Legal business name, type, address, and tax information
- The owner's or representative's identity information
- A customer-facing business name and support contact details
- A description of the lessons or services being sold
- A bank account for payouts

After submitting the application:

1. Open Stripe's account or business settings and confirm there are no outstanding verification requests.
2. Open **Settings > Bank accounts and scheduling** and confirm the payout bank account and payout schedule.
3. Check the public business details that will appear on receipts and statements.
4. Choose a clear card statement descriptor that customers will recognize, such as `TUBONAMER MUSIC`, subject to Stripe's requirements.

Stripe can change Dashboard labels over time. If a menu name differs, use the Dashboard search for the setting named in this guide.

## 3. Test the Website First

Stripe has separate test and live environments. Start in test mode so no real money moves.

1. In Stripe, turn on **Test mode**.
2. Open **Developers > API keys**.
3. Reveal and copy the **test secret key**. It starts with `sk_test_`.
4. In Netlify, open the Tubonamer Music site.
5. Go to **Site configuration > Environment variables**.
6. Add a variable named `STRIPE_SECRET_KEY` and paste the test secret key as its value.
7. Make the variable available to Functions. Use the site's default scope if Netlify does not ask for one.
8. Save the variable, then trigger a new production deploy from **Deploys** so the function receives it.

To run a test purchase:

1. Open the deployed website's **Services** page.
2. Select **Book With Stripe** for a lesson.
3. In Stripe Checkout, use card number `4242 4242 4242 4242`.
4. Use any future expiration date, any three-digit CVC, and any valid postal code.
5. Complete checkout and confirm the website shows its payment success page.
6. In Stripe test mode, open **Payments** and confirm the payment appears with the correct lesson and amount.

Test cards only work while Stripe is in test mode. Do not use a real card number for this test.

## 4. Confirm Lesson Prices

The website sends its own lesson name and price to Stripe for each checkout. Prices are managed in the website editor, not in Stripe's Product catalog.

1. Sign in at `https://YOUR-DOMAIN.com/admin/`.
2. Open **Settings > Lessons**.
3. Check each lesson's name, duration, price, and currency.
4. Enter prices in cents: `$65.00` is entered as `6500`, and `$80.00` as `8000`.
5. Save and publish the changes, then wait for Netlify to finish deploying.
6. Repeat the test checkout for every lesson whose price changed.

Changing a product or price in the Stripe Dashboard does not change the website's lesson prices.

## 5. Switch to Live Payments

Only switch after the Stripe account is activated and test checkout succeeds.

1. In Stripe, turn off **Test mode** so you are viewing live data.
2. Open **Developers > API keys**.
3. Reveal and copy the **live secret key**. It starts with `sk_live_`.
4. In Netlify, replace the value of `STRIPE_SECRET_KEY` with the live secret key.
5. Save the variable and trigger a new production deploy.
6. Make one small real payment from the live website.
7. Confirm it appears under live payments in Stripe, then refund it if appropriate.

Test and live Stripe data are separate. A test payment will not appear when the Dashboard is showing live data, and a live payment will not appear in test mode.

## 6. Day-to-Day Payment Management

Use the Stripe Dashboard for payment operations:

- **Payments:** Search for a customer payment and open its details.
- **Refunds:** Open the payment, select **Refund**, choose a full or partial amount, and confirm.
- **Payouts:** Check when collected funds are scheduled to reach the bank account.
- **Disputes:** Respond by Stripe's deadline and provide the requested lesson or communication records.
- **Receipts:** Configure receipt branding and customer emails in Stripe's email and branding settings.
- **Reports:** Export payment, fee, payout, and tax-related reports for bookkeeping.

Stripe processing fees and refund behavior are governed by the business's Stripe agreement. Confirm current fees and policies in the Stripe Dashboard.

## Optional PayPal or Square Buttons

The site displays PayPal and Square buttons, but they currently point only to the providers' general websites. They are **not connected to this business's payment account and should not be treated as working checkout options**.

To accept PayPal or Square, first create and verify the relevant business account and create provider-specific payment links. A website administrator must then replace the placeholder URLs and verify the amount and post-payment flow. Do not publish those buttons as payment choices until that work is complete.

## Troubleshooting

### The website says `Missing STRIPE_SECRET_KEY`

Confirm the environment variable is named exactly `STRIPE_SECRET_KEY`, is available to Netlify Functions, and that the site was redeployed after it was added.

### Checkout opens in test mode after launch

The Netlify variable still contains an `sk_test_` key. Replace it with the correct `sk_live_` key and redeploy.

### The amount is wrong

Correct the lesson price in the website editor. Remember that the value is entered in cents, publish the change, and wait for the deploy to finish.

### A payment does not appear in Stripe

Check whether the Stripe Dashboard is showing test or live data, then search by the customer's email, amount, or date.

### Stripe asks for more verification

Complete the request directly in the Stripe Dashboard. Payments or payouts can be limited until Stripe approves the information.

## Security Checklist

- Two-step authentication is enabled for Stripe and Netlify.
- Each person has their own user account.
- The live secret key exists only in Netlify's environment variables.
- Secret keys are never placed in the website editor, source files, email, or chat.
- Former staff members are removed promptly from Stripe and Netlify.
- Stripe account alerts, disputes, and failed payouts are reviewed regularly.
