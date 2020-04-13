import React from "react"
import LogoImage from "./Image"
import { Link } from "gatsby"

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
          <Link to={"/articles"} className="hover:text-gray-500">
            ARTICLES
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
