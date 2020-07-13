import React from "react"
import Layout from "../components/Layout"
import WiggleDownLine from "../svgs/wiggle-down-line.svg"
import { graphql } from "gatsby"
import Book from "../components/Book"
import ServerSvg from "../svgs/server.svg"
import CheckCircleSvg from "../svgs/check-circle.svg"
import MinimizeSvg from "../svgs/minimize.svg"
import MousePointerSvg from "../svgs/mouse-pointer.svg"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import SEO from "../components/SEO"
import EmailSubscription from "../components/EmailSubscription"
import { getActiveClasses } from "get-active-classes"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/core"
import { robustUiContents } from "../data/robust-ui-chapters"

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
            A toolkit of strategies for writing enduring React components.
          </p>
        </div>
        <ul className="text-md max-w-xl mx-auto mt-8 block">
          <Item>
            <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
            Prevent the afternoon tap on the shoulder or slack ping about a
            critical bug in a feature you released last week.
          </Item>
          <Item>
            <CheckCircleSvg className="mr-2 mt-1 flex-shrink-0" />
            <span>
              Avoid the dread you feel when a new feature needs to be added to{" "}
              <span className="italic">that</span> part of the code.
            </span>
          </Item>
        </ul>
        <div className="px-6">
          <div className="max-w-lg mx-auto mt-16">
            <div className="mx-auto text-sm">
              <section>
                <h2 className="font-bold font-header text-mdlg text-gray-900 mb-4">
                  Learn component code design patterns
                </h2>
                <ul>
                  <Item>
                    <ReactSvg className="mr-2 flex-shrink-0" />
                    With a focus on React Components
                  </Item>
                  <Item>
                    <ServerSvg className="mr-2 flex-shrink-0" />A{" "}
                    {"<Multiselect />"} is the example we use to explore these
                    patterns
                  </Item>
                </ul>
              </section>
              <section className="mt-12">
                <h2 className="font-bold font-header text-mdlg text-gray-900 mb-4">
                  Then learn strategies for testing them
                </h2>
                <ul>
                  <Item>
                    <MousePointerSvg className="mr-2 flex-shrink-0" />
                    <span>
                      With&nbsp;
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
                    </span>
                  </Item>
                  <Item>
                    <MinimizeSvg className="mr-2 flex-shrink-0" />
                    Automated visual testing of components
                  </Item>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <WiggleDownLine className="mx-auto h-24 sm:h-auto mt-6 mb-6" />
        <section className="max-w-lg mx-auto">
          <h2 className="font-header font-bold text-lg text-gray-700 mb-4 text-center">
            Table of Contents
          </h2>
          <Accordion>
            {robustUiContents.map(item => (
              <ContentsItem item={item} />
            ))}
          </Accordion>
        </section>
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

function Item({ children, className }) {
  return (
    <li className={getActiveClasses("flex mt-4", className)}>{children}</li>
  )
}

function ContentsItem({ item }) {
  if (!item.title && !item.children) {
    return (
      <AccordionItem>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            {item}
          </Box>
          <AccordionIcon />
        </AccordionHeader>
      </AccordionItem>
    )
  } else {
    return (
      <AccordionItem>
        <AccordionHeader>
          <Box flex="1" textAlign="left">
            {item.title}
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pb={4}>
          <Accordion>
            {item.children.map(itemChild => (
              <ContentsItem item={itemChild} />
            ))}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    )
  }
}

function ReactSvg({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.0002 37.6621C35.1565 37.6621 37.7152 35.1034 37.7152 31.9471C37.7152 28.7908 35.1565 26.2321 32.0002 26.2321C28.8439 26.2321 26.2852 28.7908 26.2852 31.9471C26.2852 35.1034 28.8439 37.6621 32.0002 37.6621Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.0003 20.3273C39.6735 20.3273 46.8017 21.4283 52.1763 23.2786C58.652 25.508 62.6335 28.8872 62.6335 31.9471C62.6335 35.1357 58.4139 38.7257 51.4599 41.0297C46.2025 42.7716 39.2841 43.6809 32.0003 43.6809C24.5324 43.6809 17.4607 42.8274 12.1441 41.0106C5.41754 38.7114 1.36609 35.075 1.36609 31.9471C1.36609 28.9121 5.1676 25.5589 11.5522 23.3329C16.9469 21.4521 24.2511 20.3273 31.9993 20.3273H32.0003Z"
        stroke="currentColor"
        stroke-width="2.73408"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.8849 26.1706C25.7183 19.5236 30.233 13.8987 34.5209 10.1672C39.6872 5.67119 44.6036 3.91044 47.2542 5.43891C50.0165 7.03185 51.0183 12.4808 49.5402 19.6557C48.4238 25.0803 45.7542 31.5275 42.1154 37.8373C38.3845 44.3066 34.1125 50.0062 29.883 53.7032C24.531 58.3816 19.3568 60.0747 16.6472 58.5121C14.0179 56.9969 13.0125 52.0277 14.2738 45.3847C15.3395 39.7719 18.014 32.8826 21.8836 26.1705L21.8849 26.1706Z"
        stroke="currentColor"
        stroke-width="2.73408"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.8945 37.8543C18.0502 31.2148 15.4329 24.4929 14.3404 18.9145C13.0253 12.1932 13.9551 7.05428 16.6033 5.52137C19.3629 3.92375 24.584 5.777 30.0618 10.6409C34.2035 14.3183 38.4564 19.8499 42.1058 26.1538C45.8474 32.6168 48.6516 39.1646 49.7425 44.6751C51.1229 51.6485 50.0057 56.9766 47.2986 58.5437C44.672 60.0643 39.8653 58.4544 34.7401 54.0439C30.4096 50.3176 25.7766 44.5597 21.8945 37.8541V37.8543Z"
        stroke="currentColor"
        stroke-width="2.73408"
      />
    </svg>
  )
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
