declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2023-simplifly-wrapped-a-year-in-review.md": {
	id: "2023-simplifly-wrapped-a-year-in-review.md";
  slug: "2023-simplifly-wrapped-a-year-in-review";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"5-tips-to-grow-your-flight-school.md": {
	id: "5-tips-to-grow-your-flight-school.md";
  slug: "5-tips-to-grow-your-flight-school";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"backlinks-demystifying-seo-buzzwords.md": {
	id: "backlinks-demystifying-seo-buzzwords.md";
  slug: "backlinks-demystifying-seo-buzzwords";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"boost-your-seo-with-schema-what-it-is-and-how-to-use-it.md": {
	id: "boost-your-seo-with-schema-what-it-is-and-how-to-use-it.md";
  slug: "boost-your-seo-with-schema-what-it-is-and-how-to-use-it";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"breaking-down-an-instrument-panel.md": {
	id: "breaking-down-an-instrument-panel.md";
  slug: "breaking-down-an-instrument-panel";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"built-by-pilots-for-pilots-rrm-airport-sync-partnership.md": {
	id: "built-by-pilots-for-pilots-rrm-airport-sync-partnership.md";
  slug: "built-by-pilots-for-pilots-rrm-airport-sync-partnership";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"celebrating-our-1-year-anniversary-with-pancakes.md": {
	id: "celebrating-our-1-year-anniversary-with-pancakes.md";
  slug: "celebrating-our-1-year-anniversary-with-pancakes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"driving-conversions-ctas-and-form-submissions-for-flight-schools.md": {
	id: "driving-conversions-ctas-and-form-submissions-for-flight-schools.md";
  slug: "driving-conversions-ctas-and-form-submissions-for-flight-schools";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"federal-judge-halts-jetblue-s-spirit-airlines-bid-unpacking-the-legal-landscape.md": {
	id: "federal-judge-halts-jetblue-s-spirit-airlines-bid-unpacking-the-legal-landscape.md";
  slug: "federal-judge-halts-jetblue-s-spirit-airlines-bid-unpacking-the-legal-landscape";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing.md": {
	id: "flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing.md";
  slug: "flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hiring-an-in-house-marketing-team-vs-a-marketing-agency-a-guide-for-flight-schools.md": {
	id: "hiring-an-in-house-marketing-team-vs-a-marketing-agency-a-guide-for-flight-schools.md";
  slug: "hiring-an-in-house-marketing-team-vs-a-marketing-agency-a-guide-for-flight-schools";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization.md": {
	id: "how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization.md";
  slug: "how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent.md": {
	id: "how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent.md";
  slug: "how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-planeenglish-helped-500k-pilots-improve-radio-communication.md": {
	id: "how-planeenglish-helped-500k-pilots-improve-radio-communication.md";
  slug: "how-planeenglish-helped-500k-pilots-improve-radio-communication";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-advertise-your-flight-school-in-2024.md": {
	id: "how-to-advertise-your-flight-school-in-2024.md";
  slug: "how-to-advertise-your-flight-school-in-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-choose-a-flight-school-simplifly-s-guide.md": {
	id: "how-to-choose-a-flight-school-simplifly-s-guide.md";
  slug: "how-to-choose-a-flight-school-simplifly-s-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-enroll-more-student-pilots-at-my-flight-school.md": {
	id: "how-to-enroll-more-student-pilots-at-my-flight-school.md";
  slug: "how-to-enroll-more-student-pilots-at-my-flight-school";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-make-your-flight-school-known.md": {
	id: "how-to-make-your-flight-school-known.md";
  slug: "how-to-make-your-flight-school-known";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mastering-heading-tags-for-on-page-seo.md": {
	id: "mastering-heading-tags-for-on-page-seo.md";
  slug: "mastering-heading-tags-for-on-page-seo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"new-rules-of-marketing-in-2024-for-flight-schools.md": {
	id: "new-rules-of-marketing-in-2024-for-flight-schools.md";
  slug: "new-rules-of-marketing-in-2024-for-flight-schools";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"pilot-training-over-the-years-and-ideal-aviation-s-contribution-to-its-histor.md": {
	id: "pilot-training-over-the-years-and-ideal-aviation-s-contribution-to-its-histor.md";
  slug: "pilot-training-over-the-years-and-ideal-aviation-s-contribution-to-its-histor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-and-milivate-announce-strategic-partnership-to-support-transitioning-military-pilots.md": {
	id: "right-rudder-marketing-and-milivate-announce-strategic-partnership-to-support-transitioning-military-pilots.md";
  slug: "right-rudder-marketing-and-milivate-announce-strategic-partnership-to-support-transitioning-military-pilots";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-enters-second-year-as-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors.md": {
	id: "right-rudder-marketing-enters-second-year-as-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors.md";
  slug: "right-rudder-marketing-enters-second-year-as-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-partners-with-king-schools-to-support-pilot-education.md": {
	id: "right-rudder-marketing-partners-with-king-schools-to-support-pilot-education.md";
  slug: "right-rudder-marketing-partners-with-king-schools-to-support-pilot-education";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-sponsors-fsana-2024-trade-show-in-las-vegas.md": {
	id: "right-rudder-marketing-sponsors-fsana-2024-trade-show-in-las-vegas.md";
  slug: "right-rudder-marketing-sponsors-fsana-2024-trade-show-in-las-vegas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-teams-up-with-planeenglish.md": {
	id: "right-rudder-marketing-teams-up-with-planeenglish.md";
  slug: "right-rudder-marketing-teams-up-with-planeenglish";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rrm-announces-partnership-with-wingsleasing-to-continue-maximizing-flight-school-profits.md": {
	id: "rrm-announces-partnership-with-wingsleasing-to-continue-maximizing-flight-school-profits.md";
  slug: "rrm-announces-partnership-with-wingsleasing-to-continue-maximizing-flight-school-profits";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rrm-s-flight-school-website-template-10-essential-elements-every-flight-school-website-should-have.md": {
	id: "rrm-s-flight-school-website-template-10-essential-elements-every-flight-school-website-should-have.md";
  slug: "rrm-s-flight-school-website-template-10-essential-elements-every-flight-school-website-should-have";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"run-google-ads-the-right-way-to-enroll-more-students-and-ave-money.md": {
	id: "run-google-ads-the-right-way-to-enroll-more-students-and-ave-money.md";
  slug: "run-google-ads-the-right-way-to-enroll-more-students-and-ave-money";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"self-service-screening-takes-off-in-las-vegas.md": {
	id: "self-service-screening-takes-off-in-las-vegas.md";
  slug: "self-service-screening-takes-off-in-las-vegas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"sky-express-expands-fleet-with-atr-72-600s-and-commits-to-emission-reduction.md": {
	id: "sky-express-expands-fleet-with-atr-72-600s-and-commits-to-emission-reduction.md";
  slug: "sky-express-expands-fleet-with-atr-72-600s-and-commits-to-emission-reduction";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"southwest-airlines-pilots-pay-increase.md": {
	id: "southwest-airlines-pilots-pay-increase.md";
  slug: "southwest-airlines-pilots-pay-increase";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"sun-city-aviation-hosts-the-aopa-2024-rusty-pilots-seminar.md": {
	id: "sun-city-aviation-hosts-the-aopa-2024-rusty-pilots-seminar.md";
  slug: "sun-city-aviation-hosts-the-aopa-2024-rusty-pilots-seminar";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"supporting-local-aviation-events-is-more-impactful-than-you-think.md": {
	id: "supporting-local-aviation-events-is-more-impactful-than-you-think.md";
  slug: "supporting-local-aviation-events-is-more-impactful-than-you-think";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-role-of-seo-in-elevating-flight-schools-to-the-top-of-the-page.md": {
	id: "the-role-of-seo-in-elevating-flight-schools-to-the-top-of-the-page.md";
  slug: "the-role-of-seo-in-elevating-flight-schools-to-the-top-of-the-page";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-written-exam-what-is-it-and-why-do-i-need-it.md": {
	id: "the-written-exam-what-is-it-and-why-do-i-need-it.md";
  slug: "the-written-exam-what-is-it-and-why-do-i-need-it";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-aviation-marketing-to-bring-more-students-to-your-flight-school.md": {
	id: "using-aviation-marketing-to-bring-more-students-to-your-flight-school.md";
  slug: "using-aviation-marketing-to-bring-more-students-to-your-flight-school";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-you-should-ask-for-reviews-from-your-flight-students.md": {
	id: "why-you-should-ask-for-reviews-from-your-flight-students.md";
  slug: "why-you-should-ask-for-reviews-from-your-flight-students";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"webinar": {
"example-webinar.md": {
	id: "example-webinar.md";
  slug: "example-webinar";
  body: string;
  collection: "webinar";
  data: InferEntrySchema<"webinar">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
