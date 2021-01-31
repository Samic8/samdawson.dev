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
        <div className="lg:flex">
          <div className="max-w-lg flex flex-col items-center mx-auto">
            <Book />
            <p className="text-lg font-bold mb-4 mt-6 font-header text-gray-900">
              A toolkit of strategies for testing React components with&nbsp;
              <a className="link" href="https://jestjs.io/">
                Jest
              </a>{" "}
              and{" "}
              <a
                className="link"
                href="https://testing-library.com/docs/react-testing-library/intro"
              >
                React Testing Library
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col ml-10">
            <ul className="text-md max-w-xl mx-auto block">
              <Item>
                <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
                Prevent the afternoon tap on the shoulder or slack ping about a critical bug in a
                feature you released last week.
              </Item>
              <Item>
                <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
                Avoid the dread you feel when a new feature needs to be added to that part of the
                code.
              </Item>
              <Item>
                <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
                Everything you need in one place so you don't have to scrounge around 20 different
                blog posts to get productive with component testing.
              </Item>
            </ul>
            <div className="flex justify-center mt-16 lg:mt-8 max-w-lg mx-auto lg:mx-0 lg:max-w-full">
              <EmailSubscription
                version={"link under subscribe"}
                title={
                  <>
                    Subscribe to get <strong>3 chapters</strong> free
                    <div className="text-sm">(one a week, delivered weekly)</div>
                  </>
                }
              >
                <>
                  <span className="mt-3 text-xsm sm:text-sm inline-block">
                    Or&nbsp;
                    <a
                      className="link"
                      href="https://gum.co/lWvh"
                      onClick={() => onPreorderClick("link under subscribe")}
                      target="_blank"
                    >
                      purchase the early access
                    </a>
                    &nbsp;version of the e-book ($7)
                  </span>
                </>
              </EmailSubscription>
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="max-w-lg mx-auto mt-16">
            <div className="mx-auto text-sm">
              <section>
                <h2 className="font-bold font-header text-gray-900 mb-4">Learn general tools</h2>
                <ul>
                  <FeatureItem>
                    <MaximizeSvg className="mr-2 flex-shrink-0" />
                    How to structure your tests in a maintainable way
                  </FeatureItem>
                  <FeatureItem>
                    <CompassSvg className="mr-2 flex-shrink-0" />
                    Know when to use mocks to test your components
                  </FeatureItem>
                  <FeatureItem>
                    <LayersSvg className="mr-2 flex-shrink-0" />
                    How to write component tests that are easy to maintain
                  </FeatureItem>
                  <FeatureItem>
                    <MousePointerSvg className="mr-2 flex-shrink-0" />
                    Why writing tests that mimic interaction pays off
                  </FeatureItem>
                </ul>
              </section>
              <section className="mt-12">
                <h2 className="font-bold font-header text-gray-900 mb-4">
                  Then learn strategies for specific contexts
                </h2>
                <ul>
                  <FeatureItem>
                    <CheckCircleSvg className="mr-2 flex-shrink-0" />
                    Sane testing of React Hooks
                  </FeatureItem>
                  <FeatureItem>
                    <SendSvg className="mr-2 flex-shrink-0" />
                    Behavioral testing of&nbsp;
                    <Link className="link" to="/article/compound-components-what-why-when">
                      Compound Components
                    </Link>
                  </FeatureItem>
                  <FeatureItem>
                    <BarChartSvg className="mr-2 flex-shrink-0" />
                    Strategies for testing visual graphs made with SVG
                  </FeatureItem>
                  <FeatureItem>
                    <LogInSvg className="mr-2 flex-shrink-0" />
                    Testing components that use common third party libraries without reinventing the
                    wheel
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

export const pageQuery = graphql`
  query {
    hexImage: file(relativePath: { eq: "hex.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
