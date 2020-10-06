import React from "react"
import Layout from "../components/Layout"
import WiggleDownLine from "../svgs/wiggle-down-line.svg"
import { graphql, Link } from "gatsby"
import Book from "../components/Book"
import XCircleSvg from "../svgs/x-circle.svg"
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
        <div className="max-w-lg flex justify-center flex-col items-center justify-center mx-auto">
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
        <ul className="text-md max-w-xl mx-auto mt-8 block">
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
        <div className="px-6">
          <div className="max-w-lg mx-auto mt-16">
            <div className="mx-auto text-sm">
              <section>
                <h2 className="font-bold font-header text-gray-900 mb-4">Learn the fundamentals</h2>
                <ul>
                  <Item>
                    <MousePointerSvg className="mr-2 mt-1 flex-shrink-0" />
                    How to reap the benefits of Behavioral Testing of components
                  </Item>
                  <Item>
                    <MaximizeSvg className="mr-2 mt-1 flex-shrink-0" />
                    How to best use Implementation Testing when it's your only choice
                  </Item>
                  <Item>
                    <CompassSvg className="mr-2 mt-1 flex-shrink-0" />
                    How to best leverage mocks and spies to test your components
                  </Item>
                  <Item>
                    <LayersSvg className="mr-2 mt-1 flex-shrink-0" />
                    How to write component tests that are easy to maintain
                  </Item>
                </ul>
              </section>
              <section className="mt-12">
                <h2 className="font-bold font-header text-gray-900 mb-4">
                  Then learn strategies for specific contexts
                </h2>
                <ul>
                  <Item>
                    <SendSvg className="mr-2 mt-1 flex-shrink-0" />
                    Behavioral testing of&nbsp;
                    <Link className="link" to="/article/compound-components-what-why-when">
                      Compound Components
                    </Link>
                  </Item>
                  <Item>
                    <BarChartSvg className="mr-2 mt-1 flex-shrink-0" />
                    Strategies for testing visual graphs made with SVG
                  </Item>
                  <Item>
                    <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
                    Testing with Redux connected components
                  </Item>
                  <Item>
                    <LogInSvg className="mr-2 mt-1 flex-shrink-0" />
                    Testing components that use common third party libraries without reinventing the
                    wheel
                  </Item>
                  <Item>
                    <MinimizeSvg className="mr-2 mt-1 flex-shrink-0" />
                    Strategies for automated visual testing of components
                  </Item>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <WiggleDownLine className="mx-auto h-24 sm:h-auto mt-6 mb-12" />
        <div className="text-gray-700 flex justify-center max-w-lg mx-auto font-header uppercase font-bold text-md">
          To be released in November
        </div>
        <div className="flex justify-center mt-12 max-w-lg mx-auto">
          <EmailSubscription
            version={"link under subscribe"}
            title={
              <>
                Get <b>Robust UI</b> chapters via email as it's being written
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
                  pre-order
                </a>
                &nbsp;with the discount code "pre-order"
              </span>
            </>
          </EmailSubscription>
        </div>
      </article>
    </Layout>
  )
}

function Item({ children }) {
  return <li className="flex mt-4">{children}</li>
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
