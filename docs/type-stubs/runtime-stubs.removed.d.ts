declare const process: { env: Record<string, string | undefined> };

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: unknown;
  }
}

declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare module 'react' {
  export type ReactNode = unknown;
  export type ReactElement = unknown;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initialState: T): [T, (value: T | ((current: T) => T)) => void];
}

declare module 'react-native' {
  export type ViewStyle = Record<string, unknown>;
  export type TextProps = { style?: unknown; children?: unknown; [key: string]: unknown };
  export type ViewProps = { style?: unknown; children?: unknown; [key: string]: unknown };
  export type PressableProps = ViewProps & { disabled?: boolean; onPress?: () => void };
  export const Text: (props: TextProps) => unknown;
  export const View: (props: ViewProps) => unknown;
  export const SafeAreaView: (props: ViewProps) => unknown;
  export const ScrollView: (props: ViewProps & { contentContainerStyle?: unknown }) => unknown;
  export const Pressable: (props: PressableProps & { style?: unknown }) => unknown;
  export const ActivityIndicator: (props: { color?: string }) => unknown;
  export const TextInput: (props: Record<string, unknown>) => unknown;
  export const StyleSheet: { create<T extends Record<string, unknown>>(styles: T): T };
  export function useColorScheme(): 'light' | 'dark' | null;
}

declare module 'expo-router' {
  type ScreenProps = { name?: string; options?: Record<string, unknown> };
  type Navigator = ((props: { children?: unknown; screenOptions?: Record<string, unknown> }) => unknown) & { Screen: (props: ScreenProps) => unknown };
  export const Stack: Navigator;
  export const Tabs: Navigator;
  export const Redirect: (props: { href: string }) => unknown;
  export const Link: (props: { href: string; asChild?: boolean; children?: unknown }) => unknown;
}

declare module 'expo-status-bar' {
  export const StatusBar: (props: { style?: 'light' | 'dark' | 'auto' }) => unknown;
}

declare module 'react-native-gesture-handler' {
  export const GestureHandlerRootView: (props: { style?: unknown; children?: unknown }) => unknown;
}

declare module 'expo-location' {
  export enum PermissionStatus { GRANTED = 'granted' }
  export enum Accuracy { High = 6 }
  export type LocationObject = {
    timestamp: number;
    coords: { latitude: number; longitude: number; altitude?: number | null; accuracy?: number | null };
  };
  export function requestForegroundPermissionsAsync(): Promise<{ status: PermissionStatus }>;
  export function getCurrentPositionAsync(options: { accuracy: Accuracy }): Promise<LocationObject>;
}

declare module 'expo-notifications' {
  export function getPermissionsAsync(): Promise<{ granted: boolean }>;
  export function requestPermissionsAsync(): Promise<{ granted: boolean }>;
  export function scheduleNotificationAsync(options: Record<string, unknown>): Promise<string>;
}

declare module '@react-native-async-storage/async-storage' {
  const AsyncStorage: unknown;
  export default AsyncStorage;
}

declare module '@supabase/supabase-js' {
  type Query = PromiseLike<{ data: any; error: Error | null }> & {
    insert(value: unknown): Query;
    select(columns?: string): Query;
    single(): Promise<{ data: any; error: Error | null }>;
    delete(): Query;
    eq(column: string, value: unknown): Query;
    gte(column: string, value: unknown): Query;
    order(column: string, options?: Record<string, unknown>): Promise<{ data: any[] | null; error: Error | null }>;
  };
  export function createClient(url: string, key: string, options?: Record<string, unknown>): {
    auth: {
      signInWithPassword(input: unknown): Promise<{ data: unknown; error: Error | null }>;
      signUp(input: unknown): Promise<{ data: unknown; error: Error | null }>;
      resetPasswordForEmail(email: string): Promise<{ error: Error | null }>;
      signOut(): Promise<{ error: Error | null }>;
    };
    from(table: string): Query;
  };
}

declare module 'zod' {
  type Schema = {
    string(): Schema; number(): Schema; boolean(): Schema; object(shape: Record<string, unknown>): Schema; enum(values: readonly string[]): Schema;
    union(values: unknown[]): Schema; literal(value: unknown): Schema; array(value: unknown): Schema; coerce: { number(): Schema };
    trim(): Schema; min(value: number, message?: string): Schema; max(value: number): Schema; regex(value: RegExp): Schema;
    positive(): Schema; optional(): Schema; or(value: unknown): Schema; transform(fn: (value: any) => unknown): Schema; default(value: unknown): Schema;
    uuid(): Schema; date(): Schema; int(): Schema; nullable(): Schema; email(): Schema;
  };
  export const z: Schema;
  export namespace z { export type infer<T> = any; }
}

declare module 'node:test' {
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void): void;
}

declare module 'node:assert/strict' {
  export function equal(actual: unknown, expected: unknown): void;
  export function deepEqual(actual: unknown, expected: unknown): void;
  export function ok(value: unknown): void;
}
