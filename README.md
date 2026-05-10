# Rush Coach

**Rush Coach** — _No excuses. Just run._

Rush Coach is an Android-first running MVP built with React Native, Expo, TypeScript and Supabase. The product direction is serious, minimal, privacy-first and scalable enough to grow toward a Google Play release.

## Architecture

```txt
src/
  app/                 Expo Router screens and navigation
  components/          Reusable presentational components
  features/            Domain logic: auth policy, motivation, metrics, routes
  hooks/               App-level React hooks
  lib/                 Infrastructure clients and SDK adapters
  services/            Supabase/location/notification use cases
  types/               Shared domain types
  validations/         Validation schemas
  constants/           Product constants and MVP copy
  theme/               Design tokens and semantic themes
  tests/               Unit tests for critical logic
supabase/migrations/   Database schema and RLS policies
```

## Local setup

### 1. Install dependencies

```bash
npm install
```

If your registry blocks scoped packages with `403 Forbidden`, install from a normal local network or configure npm registry access. The current Expo runtime dependencies expected by this project are:

```bash
npm install \
  expo@~52.0.23 \
  react@18.3.1 \
  react-native@0.76.5 \
  expo-router@~4.0.15 \
  react-native-safe-area-context@4.12.0 \
  react-native-screens@~4.4.0 \
  react-native-gesture-handler@~2.20.2 \
  @react-navigation/native@^6.1.18 \
  @react-native-async-storage/async-storage@1.23.1 \
  @supabase/supabase-js@^2.47.10 \
  expo-constants@~17.0.3 \
  expo-linking@~7.0.3 \
  expo-secure-store@~14.0.0 \
  expo-splash-screen@~0.29.18 \
  expo-status-bar@~2.0.0 \
  zod@^3.24.1
npm install -D typescript@~5.3.3 @types/react@~18.3.12 @types/node@^22.10.5
```

`@expo/vector-icons` remains intentionally out for now; tab icons use simple text glyphs.

### 2. Configure environment variables

Copy the example file and fill Supabase values:

```bash
cp .env.example .env
```

Required values:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

Never commit `.env`. The mobile client must only use the public anon key; privileged Supabase work belongs in server-side Edge Functions.

### 3. Start Expo

```bash
npx expo start
```

### 4. Run on Android emulator

1. Install Android Studio.
2. Create and start an Android Virtual Device from Device Manager.
3. In the Expo terminal, press `a`, or run:

```bash
npm run android
```

This phase focuses on running the existing screens with mock data. GPS, maps, ads, billing and Health Connect are intentionally not implemented yet.

## Supabase setup

1. Create a Supabase project.
2. Enable Email auth and configure Google OAuth only after Android OAuth credentials are ready.
3. Apply `supabase/migrations/001_initial_schema.sql` in the SQL editor or via Supabase CLI.
4. Verify RLS is enabled on all MVP tables:
   - `profiles`
   - `runs`
   - `routes`
   - `hydration_logs`
   - `motivation_events`
   - `user_settings`
   - `subscriptions`

## Testing

```bash
npm test
npm run typecheck
```

`npm test` compiles and runs isolated domain tests with Node's built-in test runner. `npm run typecheck` validates the real Expo/React Native integration and requires runtime dependencies to be installed.

Covered in this phase:

- Age validation.
- Level 3 blocking for minors/no consent.
- Run metrics and calorie estimates.
- Private route serialization.
- Motivation safety copy checks.
- Light/dark theme shape.

## MVP screens

- Auth: login, register, account recovery.
- Onboarding: age, optional weight, goal, experience, preferred days, target and motivation mode.
- Home dashboard: daily goal, quick start, streak, last run, calories estimate, hydration and 15-day history.
- Run setup: route privacy, map preview and 5-minute warmup.
- Tracking: mock-data tracking surface with distance, time, pace, estimated calories, pause and finish.
- Post-run summary: metrics, route saved state, motivational message and delete/change options.
- History: 15-day run list.
- Settings: theme, profile, motivation, privacy, delete history, sign out and premium state.

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
- GPS background tracking, maps, ads and billing.

## Next phase backlog

1. Wire React Hook Form screens to Supabase Auth and profile creation.
2. Add protected route/session provider and onboarding completion guard.
3. Add foreground GPS subscription in a focused GPS PR.
4. Replace map placeholder with Google Maps or Mapbox in a development build.
5. Add Supabase Edge Function for billing webhooks and premium entitlements.
6. Add notification preferences and hydration reminder scheduling UI.
7. Add route deletion/full history deletion confirmations.
8. Add integration tests against a local Supabase instance.
9. Add Play Store release hardening: privacy policy, data safety form, crash reporting and accessibility pass.
