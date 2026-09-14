// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7154370ce387bce58733d89abd0a2ff0@o4511156652277760.ingest.de.sentry.io/4511156656210000",

  // Replay is added lazily below instead of here - see the block after
  // init(). Its recording library is large enough to show up as "unused
  // JavaScript" in Lighthouse on every first page load, most of which are
  // never actually sampled for replay.

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

// Lazy-load Replay (Sentry's documented pattern for this): its recording
// code only gets parsed/executed once the visitor actually starts
// interacting, instead of during the initial page load's critical path.
// Sampling rates above are unaffected - this only changes *when* the
// integration's code loads, not whether a session/error gets replayed.
if (typeof window !== "undefined") {
  let replayLoaded = false;
  const interactionEvents = ["pointerdown", "keydown", "scroll"];

  const loadReplay = () => {
    if (replayLoaded) return;
    replayLoaded = true;
    interactionEvents.forEach((event) => window.removeEventListener(event, loadReplay));
    Sentry.addIntegration(Sentry.replayIntegration());
  };

  interactionEvents.forEach((event) =>
    window.addEventListener(event, loadReplay, { once: true, passive: true })
  );
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
