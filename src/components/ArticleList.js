import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./ArticleList.module.css"
import Time from "./Time"

export default function ArticleList({ posts = [] }) {
  return (
    <ul className={"mx-auto relative z-10"}>
      {posts.map((post, index) => (
        <PostRow
          key={post.frontmatter.title}
          post={post}
          className={index > 0 ? "mt-16" : ""}
        />
      ))}
    </ul>
  )
}

const PostRow = ({ post, className }) => (
  <li className={`group relative ${styles.postListItem} ${className}`}>
    <Link
      to={`article/${post.frontmatter.slug}`}
      className={`px-3 sm:px-6 block`}
    >
      <article className={"flex flex-col sm:flex-row z-10 relative"}>
        <div className={"pt-6"}>
          <div className={"font-header mb-1"}>
            <h1 className="font-bold underline text-md sm:text-lg text-gray-900 leading-tight font-extrabold hover:bg-yellow-100">
              {post.frontmatter.title}
            </h1>
            <Time
              date={post.frontmatter.date}
              dateTime={post.frontmatter.dateTime}
            />
          </div>
          <p className="text-sm leading-tight sm:leading-tight sm:text-base text-gray-800">
            {post.excerpt}
          </p>
        </div>
        <div className={"ml-0 sm:ml-6 mt-3 sm:mt-0 hidden sm:block"}>
          {post.frontmatter.featuredImage && (
            <Img
              className={"flex-shrink-0 rounded w-40 sm:w-48"}
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            />
          )}
        </div>
      </article>
    </Link>
  </li>
)
