# Rush Coach architecture decisions

## Final architecture proposal

Rush Coach uses Expo Router under `src/app` for route ownership, but keeps all reusable UI and domain code outside screens. Screens compose state and presentation only; they do not own heavy business logic.

## Data model proposal

The initial Supabase model contains:

- `profiles`: private user profile, age gate, theme and premium flags.
- `routes`: full GPS route polyline, always private in MVP.
- `runs`: run metrics and private route relation.
- `hydration_logs`: basic water tracking.
- `motivation_events`: audit of messages shown.
- `user_settings`: push, hydration, warmup and theme preferences.
- `subscriptions`: free/premium entitlement state.

## Security proposal

- RLS on every sensitive table.
- Ownership policies for select/insert/update/delete.
- `routes.is_private = true` check constraint for MVP.
- Level 3 database constraints: adult date of birth and accepted terms timestamp.
- Premium writes reserved for trusted server-side code.

## UX/UI proposal

- Strong dark-first identity with controlled lime, orange and blue accents.
- Light mode is clean and high-contrast.
- Large primary CTAs for run start/finish actions.
- Cards are purposeful: goals, metrics, privacy and next action.
- Animations should remain subtle and functional when added.
