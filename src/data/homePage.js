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
      stars: true,
      imagePath: "/src/assets/maksim-chernishev-HM8SDqf6l-U-unsplash(1).jpg",
      imageAlt: "Right Rudder Marketing team on the runway",
      headerH1: `Marketing for 7-8 Figure</br><span class="text-accent-100">Flight Schools</span>`,
      paragraph:
        " Right Rudder Marketing is the leader in helping ONLY flight schools leverage the internet and use well executed marketing strategies to take their business out of the clouds and into VFR.",
      buttons: [
        {
          name: "Call Us",
          link: "tel:1-314-804-1200",
          primary: false,
        },
        {
          name: "Schedule a Call",
          link: "/contact",
          primary: false,
        },
      ],
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
      heading: `RRM is your <strong class="text-accent">Digital Marketing Agency</strong>`,
      description: [
        `Are you tired of other schools taking your students? Does your "marketing company" seem out of touch with the general aviation industry? Are you missing out on capturing the new crop of interested student pilots?`,
        `Right Rudder Marketing is the leader in helping ONLY flight schools leverage the internet and use well executed marketing strategies to take their business out of the clouds and into VFR.`,
      ],
      team: {
        heading: "More a Family than a Team",
        paragraph:
          "Right Rudder Marketing is a pilot owned digital marketing agency focused on helping flight schools and aviation businesses accomplish their goals: Grow, scale, and make a significant impact to the pilot training industry. Flight schools that partner with Right Rudder Marketing become the #1 flight schools in their community and dominate the local area. There's no doubt about it. Right Rudder Marketing has the secret sauce.",
        imagePath: "/src/assets/right-rudder-marketing-team.jpeg",
        imageAlt: "Right Rudder Marketing team on the runway",
      },
      marketingSystem: {
        heading: "Our Marketing System",
        paragraph:
          "Right Rudder Marketing has a proven system that has been tested and refined over the years. We have worked with flight schools of all sizes and have helped them grow their business and increase their revenue. Our system is designed to help flight schools get more students and increase their revenue.",
        imagePath: "/src/assets/fsms.webp",
        imageAlt: "Right Rudder Marketing system",
        steps: [
          {
            title: "Attract",
            icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
            description:
              "Get People Interested in Pilot Training to Visit Your Website and Look You Up Online",
          },
          {
            title: "Impress",
            icon: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59",
            description:
              "Guide Your Interested Website Visitors Into Booking a Discovery Flight at Your School",
          },
          {
            title: "Convert",
            icon: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
            description:
              "Keep Your CFIs' Schedules Busy, Hire More CFIs, and Grow Your Flight School!",
          },
        ],
      },
    },

    services: {
      upperHeading: "Services",
      heading: `Our Digital Marketing <strong class="text-accent-100">Expertise</strong>`,
      servs: [
        {
          name: "Web Design & Development",
          icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
          description:
            "We design and develop websites that are user-friendly, mobile responsive, and optimized for search engines.",
        },
        {
          name: `SEO<p class="font-normal text-accent-300 text-sm">(Search Engine Optimization)</p>`,
          icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605",
          description:
            "We optimize your website to rank higher on search engines like Google, Bing, and Yahoo.",
        },
        {
          name: `PPC<p class="font-normal text-accent-300 text-sm">(Pay Per Click)</p>`,
          icon: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59",
          description:
            "We create and manage pay-per-click advertising campaigns to drive traffic to your website.",
        },
        {
          name: `CRM<p class="font-normal text-accent-300 text-sm">(Customer Relationship Management)</p>`,
          icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
          description:
            "We help you manage your customer relationships and keep track of your leads.",
        },
        {
          name: `Media Production<p class="font-normal text-accent-300 text-sm">(Photography & Videography)</p>`,
          icon: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z",
          description:
            "We create high-quality photos and videos to showcase your flight school.",
        },
      ],
    },
  },
};
export default homePage;
