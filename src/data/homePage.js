const homePage = {
  data: {
    //SEO Header Stuff
    pageTitle: "Get More Pilot Students | Right Rudder Marketing",
    pageDescription:
      "Right Rudder Marketing offers career-track, zero-to-hero pilot training programs at Riverside Municipal Airport (KRAL) and Redlands Municipal Airport (KREI). With 320 flying days a year and an FAA-approved Gleim syllabus, our academy provides top-tier education and flexible scheduling options to meet the needs of aspiring pilots. Our programs are designed to ensure high-quality instruction and extensive flying lessons, helping students achieve their goals in flight training efficiently and effectively.",
    pageKeywords:
      "Right Rudder Marketing, Flight school Riverside, California; Flight school Redlands, California; Learn to fly Riverside, California; Learn to fly Redlands, California; Pilot training Riverside, California; Pilot training Redlands, California; Flight lessons Riverside, California; Flight lessons Redlands, California; Riverside Redlands flight school; Inland Empire flight school; Flight training; Pilot training; Flight instruction; Flight lessons; Airplane lessons; Private pilot license (PPL) training; Instrument rating training; Commercial pilot license (CPL) training; Certified Flight Instructor (CFI) training",

    //top header
    header: {
      imagePath: "/src/assets/screen_16896390.png",
      imageAlt:
        "Smiling pilot completing a checkride at Right Rudder Marketing.",
      headerH1: `RELATIONSHIPS <span class="text-accent">&</span> RESULTS`,
      headerH2: "Digital Marketing Agency driven by",
    },

    memberOf: {
      heading: "We Are Proud Members of:",
      organizations: [
        {
          name: "FSANA",
          imagePath: "/src/assets/FSANA-logo.webp",
          imageAlt: "FSANA logo",
          link: "https://www.fsana.com/partners.php",
        },
        {
          name: "NBAA",
          imagePath: "/src/assets/NBAA-logo.webp",
          imageAlt: "NBAA logo",
          link: "https://nbaa.org/",
        },
        {
          name: "AMA",
          imagePath: "/src/assets/AMA-logo.webp",
          imageAlt: "AMA logo",
          link: "https://www.ama.org/",
        },
        {
          name: "Us Chamber of Commerce",
          imagePath: "/src/assets/uschamber-logo.webp",
          imageAlt: "Us Chamber of Commerce logo",
          link: "https://www.uschamber.com/",
        },
        {
          name: "NAFI",
          imagePath: "/src/assets/NAFI-corporate-logo.webp",
          imageAlt: "NAFI logo",
          link: "https://www.nafinet.org/sponsors",
        },
      ],
    },

    caseStudies: {
      upperHeading: "Case Studies",
      heading: `Our Clients <strong class="text-white">Get Results</strong>`,
      cases: [
        {
          client: "Ideal",
          imagePath: "/src/assets/ideal-logo.webp",
          imageAlt: "Ideal Aviation logo",
          quote: "Right Rudder Marketing has been a game changer for us.",
          result:
            "Ideal Aviation now ranks number one on the first page of Google Search and Google Maps. With their partnership at a local college, they welcomed 9 new students in the Fall 2023 semester to their fixed wing pilot training program generating more than an estimated $90,000 in future revenue.",
          link: "/case-studies/ideal-aviation",
          metric1: {
            label: "Leads",
            value: "200%",
          },
          metric2: {
            label: "Sales",
            value: "150%",
          },
        },
        {
          client: "Simplifly",
          imagePath: "/src/assets/simplifly-logo.webp",
          imageAlt: "Simplifly Flight School logo",
          quote:
            "They also understand aviation and pilots which is a huge help.",
          result:
            "They are now getting flooded with inquiries and phone calls asking about their flight school. They're ranking on the first page of Google Search and Google Maps.",
          link: "/case-studies/ideal-aviation",
          metric1: {
            label: "Leads",
            value: "123%",
          },
          metric2: {
            label: "Sales",
            value: "134%",
          },
        },
      ],
    },

    testimonials: {
      upperHeading: "Testimonials",
      heading: `What Our <strong class="text-primary-800">Clients Are Saying</strong>`,
      quotes: [
        {
          quote:
            "The company I work for has been working with Right Rudder Marketing for a while now and I can tell you they have helped us a lot! Our website improved and we started getting more and more inquiries. If you have a flight school you definitely have to work with them!",
          extract: "You definitely have to work with them!",
          client: "Sun City Aviation Academy",
          author: "Maria C. and Chris F.",
        },

        {
          quote:
            "We have been using Right Rudder for the past 6 months and could not be happier! They revamped our website to make it more user friendly, makes consistent updates, and are very responsive to our needs. We have seen a steady increase in web traffic as well as website driven phone calls since starting with Right Rudder. I can not say enough good things about them!",
          extract: "I can not say enough good things about them!",
          client: "Ideal Aviation",
          author: "Kim N.",
        },

        {
          quote:
            "Our flight school has been working with Right Rudder for almost a year now. They are an incredible group of people. We are so happy with them. Absolutely 100% if you have a flight school and need to work with them!",
          extract: "We are so happy with them",
          client: "Pitcairn Flight Academy",
          author: "Marisa D.",
        },
      ],
    },

    whyUs: {
      upperHeading: "Why Us",
      heading: `RRM is your <strong class="text-white">Digital Marketing Agency</strong>`,
      description: [
        `Are you tired of other schools taking your students? Does your "marketing company" seem out of touch with the general aviation industry? Are you missing out on capturing the new crop of interested student pilots?`,
        `Right Rudder Marketing is the leader in helping ONLY flight schools leverage the internet and use well executed marketing strategies to take their business out of the clouds and into VFR.`,
      ],
    },
  },
};
export default homePage;
