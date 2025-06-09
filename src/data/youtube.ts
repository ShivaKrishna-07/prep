// export const youtubeLinks = {
//   "business-economics-financial-analysis": "https://www.youtube.com",
//   "operating-systems": "https://www.youtube.com",
//   "computer-organization-and-microprocessor": "https://www.youtube.com",
//   "database-management-systems": "https://www.youtube.com",
//   "introduction-to-iot": "https://www.youtube.com",
//   "data-structures": "https://www.youtube.com",
//   "discrete-mathematics": "https://www.youtube.com",
//   "java-programming": "https://www.youtube.com",
//   "computer-organization-and-architecture": "https://www.youtube.com",
//   "software-engineering": "https://www.youtube.com",
//   "computer-networks": "https://www.youtube.com",
//   "automata-theory-and-compiler-design": "https://www.youtube.com",
//   "electrical-machinesii": "https://www.youtube.com",
//   "electrical-machines-i": "https://www.youtube.com",
//   "electro-magnetic-fields": "https://www.youtube.com",
//   "measurements-and-instrumentation": "https://www.youtube.com",
//   "digital-electronics": "https://www.youtube.com",
// };

export interface YoutubeLinksProps {
  [year: string]: {
    [subject: string]: {
      link: string;
      channel: string;
    };
  };
}

export const youtubeLinks: YoutubeLinksProps = {
  "2nd_year": {
    "business-economics-financial-analysis": {
      link: "https://www.youtube.com/playlist?list=PLzkMouYverAIORSd-1c5M3UfCGvmYzIhr",
      channel: "Institute of Aeronautical Engineering",
    },
    "operating-systems": {
      link: "https://www.youtube.com/playlist?list=PLCSAymgDW_tYcauQPCge3b2SAnPz_zm7B",
      channel: "Computer Panthulu",
    },
    "computer-organization-and-microprocessor": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfDXDRzSLv1FfZ-SSA38SiC0",
      channel: "Sudhakar Atchala",
    },
    "database-management-systems": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfBF0sREiXwZPmbyCnLSM18K",
      channel: "Sudhakar Atchala",
    },
    "introduction-to-iot": {
      link: "https://www.youtube.com/playlist?list=PLbMVPNscUopSPNtFj8fPR9AVFAKfd-8bR",
      channel: "PythonLife",
    },
    "data-structures": {
      link: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi",
      channel: "CodeWithHarry",
    },
    "discrete-mathematics": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfBB-4hXp4XI84HOCWkaBD63",
      channel: "Sudhakar Atchala",
    },
    "java-programming": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfDlQklXu3Hrtru-bm2dJ9Df",
      channel: "Sudhakar Atchala",
    },
    "computer-organization-and-architecture": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfDXDRzSLv1FfZ-SSA38SiC0",
      channel: "Sudhakar Atchala",
    },
    "software-engineering": {
      link: "https://www.youtube.com/playlist?list=PLmAmHQ-_5ySyCjVtHdSjJ64QU2x5TH8Dy",
      channel: "Trouble- Free",
    },
    "computer-networks": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfCKbi7Najz8EIr1JymxoFBW",
      channel: "Sudhakar Atchala",
    },
    "automata-theory-and-compiler-design": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfC9pGMWuM6UWE3V4YZ9TZzM",
      channel: "Sudhakar Atchala",
    },
    "electrical-machinesii": {
      link: "https://www.youtube.com",
      channel: "Electrical Engineering Academy",
    },
    "electrical-machines-i": {
      link: "https://www.youtube.com",
      channel: "Electrical Engineering Academy",
    },
    "electro-magnetic-fields": {
      link: "https://www.youtube.com",
      channel: "NPTEL",
    },
    "measurements-and-instrumentation": {
      link: "https://www.youtube.com",
      channel: "Unacademy",
    },
    "digital-electronics": {
      link: "https://www.youtube.com/playlist?list=PLXj4XH7LcRfBQXAd8FPZXmMzxZY-rViLP",
      channel: "Sudhakar Atchala",
    },
  },
};
