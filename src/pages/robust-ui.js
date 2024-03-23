import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import Book from "../components/Book"
import CompassSvg from "../svgs/compass.svg"
import LayersSvg from "../svgs/layers.svg"
import MaximizeSvg from "../svgs/maximize.svg"
import BarChartSvg from "../svgs/bar-chart.svg"
import CheckCircleSvg from "../svgs/check-circle.svg"
import LogInSvg from "../svgs/log-in.svg"
import MinimizeSvg from "../svgs/minimize.svg"
import MousePointerSvg from "../svgs/mouse-pointer.svg"
import SendSvg from "../svgs/send.svg"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import SEO from "../components/SEO"
import EmailSubscription from "../components/EmailSubscription"

export default function Subscribe({ data }) {
  const onPreorderClick = version => {
    trackCustomEvent({
      category: "Robust UI",
      action: "Clicked",
      label: "Pre-order Button",
      value: version,
    })
  }

  return (
    <Layout showBanner={false}>
      <SEO
        title={"Robust UI e-book"}
        description="A toolkit of strategies for testing React components with Jest and React Testing Library"
        imageUrl="/react-component-testing.png"
        twitterCardType="summary_large_image"
      ></SEO>
      <article className="pt-12 pb-20 mt-4 text-black" id="footer">
        <h1 className="sr-only">Robust UI e-book</h1>
        <div className="max-w-lg flex flex-col items-center mx-auto">
          <Book />
          <p className="text-lg font-bold mb-4 mt-6 font-header text-gray-900">
            A toolkit of strategies for testing React components with&nbsp;
            <a className="link" href="https://jestjs.io/">
              Jest
            </a>{" "}
            and{" "}
            <a className="link" href="https://testing-library.com/docs/react-testing-library/intro">
              React Testing Library
            </a>
            .
          </p>
        </div>
        <ul className="text-md max-w-xl mx-auto block">
          <Item>
            <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
            Prevent the afternoon tap on the shoulder or slack ping about a critical bug in a
            feature you released last week.
          </Item>
          <Item>
            <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
            Avoid the dread you feel when a new feature needs to be added to that part of the code.
          </Item>
          <Item>
            <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
            Everything you need in one place so you don't have to scrounge around 20 different blog
            posts to get productive with component testing.
          </Item>
        </ul>
        <div className="flex justify-center mt-16 max-w-lg mx-auto">
          <EmailSubscription
            version={"link under subscribe"}
            title={<>Get an early access copy for free</>}
          ></EmailSubscription>
        </div>
        <div className="px-6">
          <div className="max-w-lg mx-auto mt-16">
            <div className="mx-auto text-sm">
              <section>
                <h2 className="font-bold font-header text-gray-900 mb-4">Robust UI Covers</h2>
                <ul>
                  <FeatureItem>
                    <MaximizeSvg className="mr-2 flex-shrink-0" />
                    How to structure your tests in a maintainable way
                  </FeatureItem>
                  <FeatureItem>
                    <CompassSvg className="mr-2 flex-shrink-0" />
                    When mocking is appropriate for component tests
                  </FeatureItem>
                  <FeatureItem>
                    <LayersSvg className="mr-2 flex-shrink-0" />
                    How to write component tests for component variations
                  </FeatureItem>
                  <FeatureItem>
                    <CheckCircleSvg className="mr-2 flex-shrink-0" />
                    Sane testing of React Hooks
                  </FeatureItem>
                  <FeatureItem>
                    <BarChartSvg className="mr-2 flex-shrink-0" />
                    Strategies for testing&nbsp;
                    <Link className="link" to="/article/compound-components-what-why-when">
                      Compound Components
                    </Link>
                  </FeatureItem>
                  <FeatureItem>
                    <MinimizeSvg className="mr-2 flex-shrink-0" />
                    Strategies for visual testing of components with Storybook
                  </FeatureItem>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

function Item({ children }) {
  return <li className="flex mt-4">{children}</li>
}

function FeatureItem({ children }) {
  return <li className="flex mt-2 p-3 rounded">{children}</li>
}

export const pageQuery = graphql`{
  hexImage: file(relativePath: {eq: "hex.png"}) {
    childImageSharp {
      gatsbyImageData(width: 300, layout: CONSTRAINED)
    }
  }
}`
