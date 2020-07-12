export const robustUiContents = [
  {
    title: "Getting Started",
    children: [
      "Why I wrote this book",
      {
        title: "Two pillars of robust UI",
        children: [
          "Component Design",
          {
            title: "Component Tests",
            children: ["Why test components?", "UI testing mindset"],
          },
        ],
      },
      "The toolbox philosophy",
    ],
  },
  {
    title: "Testing Practices",
    children: [
      "Descriptions",
      "Private Functions",
      "Implementation Testing",
      "Behaviour Testing",
      "TDD-like Testing",
    ],
  },
  { title: "Props", children: ["The Pattern", "Testing it"] },
  { title: "Component Props", children: ["The Pattern", "Testing it"] },
  { title: "Compound Components", children: ["The Pattern", "Testing it"] },
  { title: "Design Tokens", children: ["The Pattern", "Testing it"] },
  {
    title: "Data Design for Simpler Components",
    children: [
      "Designing backend API's with components in mind",
      "Transforming data when you don't control the backend",
    ],
  },
  "Mocks for every situation",
  {
    title: "Specifics Scenarios",
    children: ["SVG Graphs", "(more to be listed)"],
  },
  {
    title: "Visual Testing",
    children: ["Organising Storybook for Visual Regression Tests"],
  },
]
