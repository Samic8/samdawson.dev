import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./ArticleList.module.css"
import Calendar from "../svgs/calendar.svg"

export default function ArticleList({ posts = [] }) {
  return (
    <ul className={"mx-auto relative z-10"}>
      {posts.map((post, index) => (
        <>
          {post.frontmatter.featuredImage ? (
            <PostRowImage post={post} className={index > 0 ? "mt-16" : ""} />
          ) : (
            <PostRow post={post} className={index > 0 ? "mt-16" : ""} />
          )}
        </>
      ))}
    </ul>
  )
}

const PostRow = ({ post, className }) => (
  <li
    key={post.frontmatter.title}
    className={`group relative ${styles.postListItemImage} ${className}`}
  >
    <Link
      to={`article/${post.frontmatter.slug}`}
      className={`px-3 sm:px-6 block`}
    >
      <article className={"flex z-10 relative"}>
        <div className={"pt-6"}>
          <h1 className="font-extrabold text-md mb-3 sm:text-lg text-gray-900 leading-tight max-w-md">
            {post.frontmatter.title}
          </h1>
          <p className="text-sm leading-tight sm:leading-tight sm:text-base text-gray-800">
            {post.excerpt}
          </p>
        </div>
        <div className={`absolute right-0`} style={{ bottom: "-2em" }}>
          <div
            className={`${styles.extraInfoGroup} transition-transform transition-250 transition-ease-out inline-block`}
          >
            <div
              className={
                "flex items-center px-2 py-1 text-xsm tracking-wide font-bold text-gray-700 uppercase transition-opacity transition-250 transition-ease opacity-0 group-hover:opacity-100"
              }
            >
              <Calendar className="mr-1 stroke-current text-gray-500" />
              <time>{post.frontmatter.date}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  </li>
)

const PostRowImage = ({ post, className }) => (
  <li
    key={post.frontmatter.title}
    className={`group relative ${styles.postListItemImage} ${className}`}
  >
    <Link
      to={`article/${post.frontmatter.slug}`}
      className={`px-3 sm:px-6 block`}
    >
      <article className={"flex flex-col sm:flex-row z-10 relative"}>
        <div className={"pt-6"}>
          <div className={"font-header"}>
            <h1 className="font-bold text-md mb-3 sm:text-lg text-gray-900 leading-tight font-extrabold">
              {post.frontmatter.title}
            </h1>
          </div>
          <p className="text-sm leading-tight sm:leading-tight sm:text-base text-gray-800">
            {post.excerpt}
          </p>
        </div>
        <div className={"relative ml-0 sm:ml-6 mt-3 sm:mt-0 hidden sm:block"}>
          <Img
            className={"flex-shrink-0 rounded w-40 sm:w-48"}
            fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
          />
          <div className={`absolute right-0`}>
            <div
              className={`${styles.extraInfoGroup} transition-transform transition-250 transition-ease-out inline-block`}
            >
              <div
                className={
                  "flex items-center px-2 py-1 text-xsm tracking-wide font-bold text-gray-700 uppercase transition-opacity transition-250 transition-ease sm:opacity-0 group-hover:opacity-100"
                }
              >
                <Calendar className="mr-1 stroke-current text-gray-500" />
                <time>{post.frontmatter.date}</time>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  </li>
)
