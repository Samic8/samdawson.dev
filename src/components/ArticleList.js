import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Time from "./Time"
import TechTag from "./TechTag"

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
  <li className={`group relative ${className}`}>
    <article className="px-3 sm:px-6 pt-6">
      <div className="flex">
        <div className={"flex flex-col sm:flex-row z-10 relative"}>
          <div>
            <div className={"font-header mb-1"}>
              <h1 className="font-bold underline text-md sm:text-lg text-gray-900 leading-tight font-extrabold">
                <Link
                  to={`article/${post.frontmatter.slug}`}
                  className="hover:text-purple-700"
                >
                  {post.frontmatter.title}
                </Link>
              </h1>
              <div className="flex items-center">
                <Time
                  className="mr-2"
                  date={post.frontmatter.date}
                  dateTime={post.frontmatter.dateTime}
                />
                <ul className="inline-block">
                  {post.frontmatter.techs.map(techName => (
                    <li
                      key={techName}
                      className={`inline-block font-header mr-2`}
                    >
                      <TechTag
                        size="small"
                        key={techName}
                        techName={techName}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-justify leading-tight sm:leading-tight sm:text-base text-gray-800">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>
    </article>
  </li>
)
