const caseStudies = {
  data: {
    //SEO Header Stuff
    pageTitle: "Case Studies | Right Rudder Marketing",
    pageDescription:
      "Right Rudder Marketing has been a game changer for flight schools. We help flight schools leverage the internet and use well executed marketing strategies to take their business out of the clouds and into VFR.",
    pageKeywords:
      "flight school marketing, aviation marketing, flight training marketing, pilot training marketing, flight school advertising, aviation advertising, flight training advertising, pilot training advertising, flight school lead generation, aviation lead generation, flight training lead generation, pilot training lead generation, flight school seo, aviation seo, flight training seo, pilot training seo, flight school website design, aviation website design, flight training website design, pilot training website design, flight school social media, aviation social media, flight training social media, pilot training social media",

    //top header
    header: {
      imagePath: "/src/assets/andrew-ruiz--ajZ_Xzeqe4-unsplash.jpg",
      imageAlt: "Right Rudder Marketing team on the runway",
      headerH1: `<span class="text-accent-300">Game Changing Results</span></br>for Flight Schools`,
      paragraph:
        "Marketing for flight schools is our specialty. We have a proven track record of getting flight schools more leads, more students, and more revenue. See how we've helped our clients take their business out of the clouds and into VFR.",
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
          link: "/our-flight-schools/ideal-aviation",
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
          link: "/our-flight-schools/simplifly",
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

    flyWithUsCTA: {
      imagePath: "/src/assets/avel-chuklanov-QbTBCUJLqKY-unsplash(1).jpg",
      imageAlt: "Right Rudder Marketing team on the runway",
      headerH1: `<span class="text-primary">Fly with digital marketing</br> experts</span> that know the flight training industry.`,
      paragraph:
        "We are a team of pilots that know the flight training industry. Because if your marketing team doesn't know what the pilot training experience is like, then how can they be successful for you? See what we're talking about by booking a call now!",
      buttons: [
        {
          name: "Call Us",
          link: "tel:1-314-804-1200",
          primary: false,
        },
        {
          name: "Book a Strategy Call",
          link: "/contact",
          primary: false,
        },
      ],
    },
  },
};
export default caseStudies;
