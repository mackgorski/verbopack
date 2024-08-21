import { RudderAnalytics, ApiCallback } from '@rudderstack/analytics-js';
import { ApiObject, ApiObjectSchema, ApiOptions, ApiOptionsSchema } from './schemas';

let rudderAnalytics: RudderAnalytics | null = null;

// Initialize RudderStack
export function initRudderStack(writeKey: string, dataPlaneUrl: string): void {
  if (!rudderAnalytics) {
    rudderAnalytics = new RudderAnalytics();
    rudderAnalytics.load(writeKey, dataPlaneUrl);
  }
}

// Ensure RudderStack is initialized
function ensureInitialized(): void {
  if (!rudderAnalytics) {
    throw new Error('RudderStack is not initialized. Call initRudderStack first.');
  }
}

// Track event
export function trackEvent(
  event: string,
  properties?: ApiObject,
  options?: ApiOptions,
  callback?: ApiCallback
): void {
  ensureInitialized();
  const validatedProperties = properties ? ApiObjectSchema.parse(properties) : undefined;
  const validatedOptions = options ? ApiOptionsSchema.parse(options) : undefined;
  rudderAnalytics!.track(event, validatedProperties, validatedOptions, callback);
}

// Track page view
export function trackPageView(name: string, properties?: ApiObject, options?: ApiOptions, callback?: ApiCallback): void;
export function trackPageView(category: string, name: string, properties?: ApiObject, options?: ApiOptions, callback?: ApiCallback): void;
export function trackPageView(
  nameOrCategory: string,
  nameOrProperties?: string | ApiObject,
  propertiesOrOptions?: ApiObject | ApiOptions,
  optionsOrCallback?: ApiOptions | ApiCallback,
  callback?: ApiCallback
): void {
  ensureInitialized();
  if (typeof nameOrProperties === 'string') {
    // Case: category, name, properties, options, callback
    const validatedProperties = propertiesOrOptions ? ApiObjectSchema.parse(propertiesOrOptions as ApiObject) : undefined;
    const validatedOptions = optionsOrCallback ? ApiOptionsSchema.parse(optionsOrCallback as ApiOptions) : undefined;
    rudderAnalytics!.page(nameOrCategory, nameOrProperties, validatedProperties, validatedOptions, callback);
  } else {
    // Case: name, properties, options, callback
    const validatedProperties = nameOrProperties ? ApiObjectSchema.parse(nameOrProperties) : undefined;
    const validatedOptions = propertiesOrOptions ? ApiOptionsSchema.parse(propertiesOrOptions as ApiOptions) : undefined;
    const validatedCallback = optionsOrCallback && typeof optionsOrCallback === 'function' ? optionsOrCallback : undefined;
    rudderAnalytics!.page(nameOrCategory, validatedProperties, validatedOptions, validatedCallback);
  }
}

// Identify user
export function identifyUser(
  userId: string,
  traits?: ApiObject,
  options?: ApiOptions,
  callback?: ApiCallback
): void {
  ensureInitialized();
  const validatedTraits = traits ? ApiObjectSchema.parse(traits) : undefined;
  const validatedOptions = options ? ApiOptionsSchema.parse(options) : undefined;
  rudderAnalytics!.identify(userId, validatedTraits, validatedOptions, callback);
}

// Track time taken
export function trackTimeTaken(stepName: string, timeTakenMs: number): void {
  trackEvent('Time Taken', { step: stepName, timeTakenMs });
}

// Capture user feedback
export function captureUserFeedback(feedback: string): void {
  trackEvent('User Feedback', { feedback });
}

// Log error
export function logError(error: Error): void {
  trackEvent('Error', { message: error.message, stack: error.stack });
}
