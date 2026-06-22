---
name: ux-writing
description: >-
  UX writing voice, tone, and copy patterns for the Core Web Vitals dashboard.
  Use when writing or editing user-facing copy — buttons, toasts, form errors,
  empty states, loading states, auth pages, or auditing UI text.
metadata:
  author: lite-app
  version: "1.0.0"
---

# UX Writing Guidelines

This is a **Core Web Vitals monitoring dashboard** for developers and site owners who track LCP, CLS, FID, and INP across their sites and get alerted when metrics degrade.

## Who uses this product

Developers and site owners who open this app with mild anxiety — they want to know if something broke or regressed overnight. They are technical, busy, and don't need hand-holding.

## Voice & tone

- Direct and technical, but human
- No corporate filler ("Welcome to the platform", "Please enter your credentials")
- No apologies in errors ("Sorry, something went wrong" is banned)
- Sentence case everywhere — "Check my sites", not "Check My Sites"
- Terse where possible, never at the cost of clarity

## Rules by UI element

### Auth pages (signin, signup)

- Title references _why_ someone opens the app, not the act of logging in
- Avoid: "Welcome back", "Sign in to your account to continue"
- Aim for: tension, curiosity, or a direct reference to the product's job
- Description (if used) should be one line max — or omitted entirely

### Buttons

- Always an action verb that names exactly what happens: "Check my sites", not "Submit"
- CTA on auth: "Sign in", "Create account" — never "Login", never "Go"
- Destructive actions name the thing being destroyed: "Delete site", not "Confirm"

### Toast messages

- Mirror the button that triggered them: clicked "Save changes" → toast says "Changes saved"
- Success: past tense, what happened — "Site added", "Alert saved"
- Error: what failed + how to fix — "Couldn't save — check your connection"
- Never: "Success!", "Done!", "Error occurred"

### Form validation errors

- Pattern: [what's wrong] + [how to fix it]
- "Password must be at least 8 characters" — not "Invalid password"
- Inline, not in a banner above the form

### Empty states

- An invitation to act, not a report of absence
- "No sites yet — add your first one" — not "No sites found"
- If the empty state has a CTA, it uses the same verb as the button elsewhere

### Loading states

- Informative when possible: "Loading your sites…" over "Loading…"
- For longer waits: "Fetching latest metrics…"

## Consistency rules

- "Site" not "website", "domain", or "property"
- "Metrics" not "data" or "stats"
- "Alert" not "notification" or "warning" (unless severity matters)
- Same term for the same thing across the entire app — pick one and stick to it

## What to always avoid

- Phrases that describe the system instead of the user's action
- Passive voice: "Your changes have been saved" → "Changes saved"
- Vague outcomes: "Something went wrong" → "Couldn't connect — try again"
- Double punctuation or exclamation marks in UI copy
- "Please" — it adds length without adding warmth
