import React from "react"
import LogoImage from "./Image"
import { Link } from "gatsby"
import ReactGA from "react-ga"

const Header = () => {
  return (
    <div className={"z-10"}>
      <div
        className={
          "block flex px-5 border-b h-16 border-gray-100 justify-between relative font-header"
        }
      >
        <Link to={"/"} className={"flex items-center self-center"}>
          <LogoImage />
          <span
            className={
              "tracking-wide text-gray-700 pl-2 font-bold text-xsm hover:text-gray-500"
            }
          >
            SAMDAWSON.DEV
          </span>
        </Link>
        <div
          className={
            "border-l border-gray-100 my-3 flex items-center tracking-wide text-gray-700 pl-6 font-bold text-xsm"
          }
        >
          <a
            href="#footer"
            className="mr-5 hover:text-gray-500 hidden sm:inline"
            onClick={() => {
              ReactGA.event({
                category: "Action",
                action: "User clicked newsletter button",
              })
            }}
          >
            NEWSLETTER
          </a>
          <Link to={"/articles"} className="hover:text-gray-500">
            ARTICLES
          </Link>
          {/* TODO: Add notes, like tweets, short form articles */}
          {/* <Link to={'/'}>NOTES</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Header
