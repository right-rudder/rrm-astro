/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GHL_CHECKLIST_FORM_WEBHOOK_URL: string;
  readonly GHL_CONTACT_FORM_WEBHOOK_URL: string;
  readonly GHL_GMB_FORM_WEBHOOK_URL: string;
  readonly GHL_WEBINAR_FORM_WEBHOOK_URL: string;
  readonly GHL_SOP_TEMPLATE_FORM_WEBHOOK_URL: string;
  readonly GHL_KEYWORDS_FORM_WEBHOOK_URL: string;
  readonly GHL_BOOK_FORM_WEBHOOK_URL: string;
  readonly GHL_PERSONALITY_QUIZ_CONTACT_WEBHOOK_URL: string;
  readonly GHL_PERSONALITY_QUIZ_RESULTS_WEBHOOK_URL: string;
  readonly ENROLLMENT_FORM_WEBHOOK_URL: string;
  readonly GHL_MASTERMIND_FORM_WEBHOOK_URL: string;
  readonly GHL_ENVISION_FORM_WEBHOOK_URL: string;
  readonly PORTAL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
