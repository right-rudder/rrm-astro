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
"4-steps-to-enroll-more-student-pilots-at-your-flight-school.md": {
	id: "4-steps-to-enroll-more-student-pilots-at-your-flight-school.md";
  slug: "4-steps-to-enroll-more-student-pilots-at-your-flight-school";
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
"7-mistakes-to-avoid-in-flight-school-marketing.md": {
	id: "7-mistakes-to-avoid-in-flight-school-marketing.md";
  slug: "7-mistakes-to-avoid-in-flight-school-marketing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"automatically-import-leads-from-your-website-to-your-crm-using-api.md": {
	id: "automatically-import-leads-from-your-website-to-your-crm-using-api.md";
  slug: "automatically-import-leads-from-your-website-to-your-crm-using-api";
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
"cnbc-says-there-s-a-pilot-shortage-is-that-true.md": {
	id: "cnbc-says-there-s-a-pilot-shortage-is-that-true.md";
  slug: "cnbc-says-there-s-a-pilot-shortage-is-that-true";
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
"ezsims-is-a-rrm-partner.md": {
	id: "ezsims-is-a-rrm-partner.md";
  slug: "ezsims-is-a-rrm-partner";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"faa-administrator-removes-himself-from-senate-confirmation.md": {
	id: "faa-administrator-removes-himself-from-senate-confirmation.md";
  slug: "faa-administrator-removes-himself-from-senate-confirmation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"faa-ga-and-commercial-division-head-kicked-off-nafi-summit-with-priorities.md": {
	id: "faa-ga-and-commercial-division-head-kicked-off-nafi-summit-with-priorities.md";
  slug: "faa-ga-and-commercial-division-head-kicked-off-nafi-summit-with-priorities";
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
"flight-schedule-pro-partners-with-right-rudder-marketing.md": {
	id: "flight-schedule-pro-partners-with-right-rudder-marketing.md";
  slug: "flight-schedule-pro-partners-with-right-rudder-marketing";
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
"how-our-piper-pilots-and-tecnam-p92s-increase-safety-with-garmin-g3x-avionics.md": {
	id: "how-our-piper-pilots-and-tecnam-p92s-increase-safety-with-garmin-g3x-avionics.md";
  slug: "how-our-piper-pilots-and-tecnam-p92s-increase-safety-with-garmin-g3x-avionics";
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
"how-to-create-sops-to-scale-your-flight-school.md": {
	id: "how-to-create-sops-to-scale-your-flight-school.md";
  slug: "how-to-create-sops-to-scale-your-flight-school";
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
"improving-your-cfi-skills.md": {
	id: "improving-your-cfi-skills.md";
  slug: "improving-your-cfi-skills";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"launch-of-streaming-service-aeroverse-to-bring-new-aviation-content-to-the-digital-sky.md": {
	id: "launch-of-streaming-service-aeroverse-to-bring-new-aviation-content-to-the-digital-sky.md";
  slug: "launch-of-streaming-service-aeroverse-to-bring-new-aviation-content-to-the-digital-sky";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"launch-of-the-right-rudder-marketing-website.md": {
	id: "launch-of-the-right-rudder-marketing-website.md";
  slug: "launch-of-the-right-rudder-marketing-website";
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
"new-faa-rule-may-limit-dpes-to-their-home-fsdo.md": {
	id: "new-faa-rule-may-limit-dpes-to-their-home-fsdo.md";
  slug: "new-faa-rule-may-limit-dpes-to-their-home-fsdo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"oceangate-submersible-implodes-killing-all-five-passengers-why-safety-is-important.md": {
	id: "oceangate-submersible-implodes-killing-all-five-passengers-why-safety-is-important.md";
  slug: "oceangate-submersible-implodes-killing-all-five-passengers-why-safety-is-important";
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
"right-rudder-is-going-to-king-s-schools-edu-con-aviation-symposium.md": {
	id: "right-rudder-is-going-to-king-s-schools-edu-con-aviation-symposium.md";
  slug: "right-rudder-is-going-to-king-s-schools-edu-con-aviation-symposium";
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
"right-rudder-marketing-are-partners-with-stratus-financial.md": {
	id: "right-rudder-marketing-are-partners-with-stratus-financial.md";
  slug: "right-rudder-marketing-are-partners-with-stratus-financial";
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
"right-rudder-marketing-is-now-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors.md": {
	id: "right-rudder-marketing-is-now-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors.md";
  slug: "right-rudder-marketing-is-now-a-corporate-sponsor-for-nafi-national-association-of-flight-instructors";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"right-rudder-marketing-is-now-a-supporting-partner-for-fsana.md": {
	id: "right-rudder-marketing-is-now-a-supporting-partner-for-fsana.md";
  slug: "right-rudder-marketing-is-now-a-supporting-partner-for-fsana";
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
"the-faa-reauthorization-bill-and-its-implications-for-pilot-training.md": {
	id: "the-faa-reauthorization-bill-and-its-implications-for-pilot-training.md";
  slug: "the-faa-reauthorization-bill-and-its-implications-for-pilot-training";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-flight-school-handbook-of-marketing-knowledge-right-rudder-marketing-announces-new-book-release-by-founder-tim-jedrek.md": {
	id: "the-flight-school-handbook-of-marketing-knowledge-right-rudder-marketing-announces-new-book-release-by-founder-tim-jedrek.md";
  slug: "the-flight-school-handbook-of-marketing-knowledge-right-rudder-marketing-announces-new-book-release-by-founder-tim-jedrek";
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
"tonie-santos-joins-right-rudder-marketing-as-our-newest-operation-director.md": {
	id: "tonie-santos-joins-right-rudder-marketing-as-our-newest-operation-director.md";
  slug: "tonie-santos-joins-right-rudder-marketing-as-our-newest-operation-director";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ultimate-flying-school-online-marketing-cheat-sheet.md": {
	id: "ultimate-flying-school-online-marketing-cheat-sheet.md";
  slug: "ultimate-flying-school-online-marketing-cheat-sheet";
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
"what-nasa-s-artemis-1-launch-means-for-flight-schools-and-aviation.md": {
	id: "what-nasa-s-artemis-1-launch-means-for-flight-schools-and-aviation.md";
  slug: "what-nasa-s-artemis-1-launch-means-for-flight-schools-and-aviation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-s-an-alternate-airport.md": {
	id: "what-s-an-alternate-airport.md";
  slug: "what-s-an-alternate-airport";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-are-air-show-performer-announcements-made-in-december.md": {
	id: "why-are-air-show-performer-announcements-made-in-december.md";
  slug: "why-are-air-show-performer-announcements-made-in-december";
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
"why-your-messaging-is-scaring-off-future-student-pilots.md": {
	id: "why-your-messaging-is-scaring-off-future-student-pilots.md";
  slug: "why-your-messaging-is-scaring-off-future-student-pilots";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"podcasts": {
"arming-independent-cfis-and-specialty-flight-schools-to-thrive-with-orka.md": {
	id: "arming-independent-cfis-and-specialty-flight-schools-to-thrive-with-orka.md";
  slug: "arming-independent-cfis-and-specialty-flight-schools-to-thrive-with-orka";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"embracing-uncertainty-with-sam-goodwin-lessons-from-an-extraordinary-journey.md": {
	id: "embracing-uncertainty-with-sam-goodwin-lessons-from-an-extraordinary-journey.md";
  slug: "embracing-uncertainty-with-sam-goodwin-lessons-from-an-extraordinary-journey";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"empowering-aviation-education-with-rod-machado.md": {
	id: "empowering-aviation-education-with-rod-machado.md";
  slug: "empowering-aviation-education-with-rod-machado";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing.md": {
	id: "flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing.md";
  slug: "flight-training-secrets-industry-insights-with-robert-meder-nafi-s-chairman-emeritus-and-tim-jedrek-from-right-rudder-marketing";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent.md": {
	id: "how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent.md";
  slug: "how-milivate-helps-flight-schools-elevate-their-workforce-with-military-talent";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"how-planeenglish-helped-500k-pilots-improve-radio-communication.md": {
	id: "how-planeenglish-helped-500k-pilots-improve-radio-communication.md";
  slug: "how-planeenglish-helped-500k-pilots-improve-radio-communication";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"integrating-purdue-global-degree-program-into-your-flight-school.md": {
	id: "integrating-purdue-global-degree-program-into-your-flight-school.md";
  slug: "integrating-purdue-global-degree-program-into-your-flight-school";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"mastering-flight-training-carl-valeri-on-mentorship-learning-and-success.md": {
	id: "mastering-flight-training-carl-valeri-on-mentorship-learning-and-success.md";
  slug: "mastering-flight-training-carl-valeri-on-mentorship-learning-and-success";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"maximizing-flight-school-profits-with-ari-prevalla.md": {
	id: "maximizing-flight-school-profits-with-ari-prevalla.md";
  slug: "maximizing-flight-school-profits-with-ari-prevalla";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"streamlining-flight-school-management-with-tom-verbruggen-from-aviatize.md": {
	id: "streamlining-flight-school-management-with-tom-verbruggen-from-aviatize.md";
  slug: "streamlining-flight-school-management-with-tom-verbruggen-from-aviatize";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"transforming-flight-school-operations-with-brett-hart-from-four-forces.md": {
	id: "transforming-flight-school-operations-with-brett-hart-from-four-forces.md";
  slug: "transforming-flight-school-operations-with-brett-hart-from-four-forces";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
};
"webinars": {
"copywriting-revisited.md": {
	id: "copywriting-revisited.md";
  slug: "copywriting-revisited";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"design-great-looking-checklists-forms-brochures-for-free.md": {
	id: "design-great-looking-checklists-forms-brochures-for-free.md";
  slug: "design-great-looking-checklists-forms-brochures-for-free";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"flight-school-handbook-of-marketing-knowledge.md": {
	id: "flight-school-handbook-of-marketing-knowledge.md";
  slug: "flight-school-handbook-of-marketing-knowledge";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization.md": {
	id: "how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization.md";
  slug: "how-i-ranked-our-flight-schools-on-top-of-google-google-business-profile-optimization";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"how-to-do-marketing-for-flight-schools-in-2025.md": {
	id: "how-to-do-marketing-for-flight-schools-in-2025.md";
  slug: "how-to-do-marketing-for-flight-schools-in-2025";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"how-to-enroll-more-student-pilots-at-my-flight-school.md": {
	id: "how-to-enroll-more-student-pilots-at-my-flight-school.md";
  slug: "how-to-enroll-more-student-pilots-at-my-flight-school";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"how-to-increase-student-retention-upcoming-webinar-december-7-2022.md": {
	id: "how-to-increase-student-retention-upcoming-webinar-december-7-2022.md";
  slug: "how-to-increase-student-retention-upcoming-webinar-december-7-2022";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"how-to-write-better-copy-and-increase-student-enrollment.md": {
	id: "how-to-write-better-copy-and-increase-student-enrollment.md";
  slug: "how-to-write-better-copy-and-increase-student-enrollment";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"new-rules-of-marketing-in-2024-for-flight-schools.md": {
	id: "new-rules-of-marketing-in-2024-for-flight-schools.md";
  slug: "new-rules-of-marketing-in-2024-for-flight-schools";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"run-google-ads-the-right-way-to-enroll-more-students-and-ave-money.md": {
	id: "run-google-ads-the-right-way-to-enroll-more-students-and-ave-money.md";
  slug: "run-google-ads-the-right-way-to-enroll-more-students-and-ave-money";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"this-is-a-test.md": {
	id: "this-is-a-test.md";
  slug: "this-is-a-test";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"tim-jedrek-at-king-schools-talks-sales-and-marketing.md": {
	id: "tim-jedrek-at-king-schools-talks-sales-and-marketing.md";
  slug: "tim-jedrek-at-king-schools-talks-sales-and-marketing";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
"your-2024-digital-marketing-plan-for-flight-school-businesses.md": {
	id: "your-2024-digital-marketing-plan-for-flight-school-businesses.md";
  slug: "your-2024-digital-marketing-plan-for-flight-school-businesses";
  body: string;
  collection: "webinars";
  data: InferEntrySchema<"webinars">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
