import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./ArticleList.module.css"

export default function ArticleList({ posts = [] }) {
  return (
    <ul className={"mx-auto relative z-10"}>
      {posts.map((post, index) => (
        <div key={post.id} className={index > 0 ? "mt-4 sm:mt-10" : ""}>
          <PostRow post={post} />
        </div>
      ))}
    </ul>
  )
}

const PostRow = ({ post }) => (
  <li key={post.frontmatter.title} className={styles.postListItem}>
    <Link
      to={`article/${post.frontmatter.slug}`}
      className="py-10 sm:px-6 sm:hover:bg-gray-100 block rounded-lg flex"
    >
      <article>
        <div className={"font-header"}>
          <h1 className="font-bold text-md sm:text-lg text-gray-900 leading-none">
            {post.frontmatter.title}
          </h1>
          <time
            className={
              "text-xsm tracking-wide font-bold text-gray-300 uppercase"
            }
          >
            {post.frontmatter.date}
          </time>
        </div>
        <p className="text-sm leading-tight sm:leading-tight sm:text-base text-gray-800">
          {post.excerpt}
          <span className={"link link--xsm inline-block"}>read more</span>
        </p>
      </article>
      {post.frontmatter.featuredImage && (
        <Img
          className={" flex-shrink-0 mr-5"}
          fixed={post.frontmatter.featuredImage.childImageSharp.fixed}
        />
      )}
    </Link>
  </li>
)
