# Rush Coach

**Rush Coach** — _No excuses. Just run._

Rush Coach is an Android-first running MVP built with React Native, Expo, TypeScript and Supabase. The product direction is serious, minimal, privacy-first and scalable enough to grow toward a Google Play release.

## How good can this codebase get?

The goal is not to dump screens. The project starts with a real product architecture:

1. **Security first**: Supabase Auth, no manual password storage, environment variables, Row Level Security, private routes by default.
2. **Clean architecture**: screens stay thin; reusable UI lives in `components/`; business logic lives in `features/` and `services/`.
3. **MVP functionality**: authentication surfaces, onboarding, dashboard, run setup, run tracking shell, summary, history and settings.
4. **Professional UI base**: centralized theme tokens, dark/light modes, clear cards, intentional accent colors and touch-friendly controls.
5. **Future scalability**: subscriptions model, notifications service, SQL migrations and a backlog for the next phase.

## Proposed architecture

```txt
src/
  app/                 Expo Router screens and navigation
  components/          Reusable presentational components
  features/            Domain logic: auth policy, motivation, metrics, routes
  hooks/               App-level React hooks
  lib/                 Infrastructure clients and SDK adapters
  services/            Supabase/location/notification use cases
  types/               Shared domain types
  validations/         Zod schemas
  constants/           Product constants and MVP copy
  theme/               Design tokens and semantic themes
  tests/               Unit tests for critical logic
supabase/migrations/   Database schema and RLS policies
```

## MVP screens

- Auth: login, register, account recovery.
- Onboarding: age, optional weight, goal, experience, preferred days, target and motivation mode.
- Home dashboard: daily goal, quick start, streak, last run, calories estimate, hydration and 15-day history.
- Run setup: route privacy, map preview and 5-minute warmup.
- Tracking: GPS-ready tracking surface with distance, time, pace, estimated calories, pause and finish.
- Post-run summary: metrics, route saved state, motivational message and delete/change options.
- History: 15-day run list.
- Settings: theme, profile, motivation, privacy, delete history, sign out and premium state.

## User flow

1. User opens Rush Coach and authenticates with Supabase Auth.
2. User completes onboarding.
3. Age policy limits available motivation levels:
   - Under 13: Level 1 only; parental permission/blocking decision remains a legal/product gate.
   - 13–17: Levels 1 and 2.
   - 18+: Levels 1, 2 and 3.
4. Level 3 requires explicit opt-in and can be turned down/off anytime.
5. User starts a private run, grants foreground location permission, records metrics and saves a private route.
6. User sees summary and a safe motivation message.
7. User can delete individual routes or full history.

## Security and privacy rules

- Never commit `.env` or real secrets.
- Only `EXPO_PUBLIC_SUPABASE_ANON_KEY` is used in the mobile client.
- Never expose Supabase `service_role` in the app.
- All sensitive tables enable RLS.
- Policies restrict every row to `auth.uid() = user_id`.
- Routes are private by default and enforced by a database check for MVP.
- Public/social routes are intentionally out of scope for MVP.
- Premium subscription status changes should be handled by a trusted Edge Function/service role, not direct mobile writes.
- Calories are estimates and not medical advice.

## Supabase setup

1. Create a Supabase project.
2. Enable Email auth and configure Google OAuth only after Android OAuth credentials are ready.
3. Apply `supabase/migrations/001_initial_schema.sql` in the SQL editor or via Supabase CLI.
4. Copy `.env.example` to `.env` and fill:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

5. Verify RLS is enabled on all MVP tables:
   - `profiles`
   - `runs`
   - `routes`
   - `hydration_logs`
   - `motivation_events`
   - `user_settings`
   - `subscriptions`

## Android development

```bash
npm install
npm run android
```

You can also run:

```bash
npm start
```

and open the app with Expo Go or a development build. Native maps, billing and ads should be validated in a development build before release.

## Environment variables

See `.env.example`. Do not commit real values.

## Testing

```bash
npm test
npm run typecheck
```

Covered in this phase:

- Age validation.
- Level 3 blocking for minors/no consent.
- Run metrics and calorie estimates.
- Private route serialization.
- Motivation safety copy checks.
- Light/dark theme shape.

## Out of MVP

Do not build yet:

- Friend duels.
- QR races.
- Map avatars.
- Global ranking.
- Clubs.
- Public routes.
- Social community.
- iOS.
- Apple Health.
- Full Health Connect.
- Advanced training plans.

## Next phase backlog

1. Wire React Hook Form screens to Supabase Auth and profile creation.
2. Add protected route/session provider and onboarding completion guard.
3. Replace map placeholder with Google Maps or Mapbox implementation in a development build.
4. Implement real foreground GPS subscription, pause/resume state machine and persistence during app interruptions.
5. Add Supabase Edge Function for billing webhooks and premium entitlements.
6. Add AdMob behind feature flags for free plan.
7. Add notification preferences and hydration reminder scheduling UI.
8. Add route deletion/full history deletion confirmations.
9. Add integration tests against a local Supabase instance.
10. Add Play Store release hardening: privacy policy, data safety form, crash reporting and accessibility pass.
