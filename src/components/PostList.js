import React from "react"
import { Link } from "gatsby"
import { techsToArray } from "../utility/data"

export default function PostList({ posts = [] }) {
  return (
    <ul className={'mx-auto relative z-10'}>
      {posts.map((post, index) => (
        <div key={post.id} className={index > 0 ? "mt-10" : ""}>
          <PostRow post={post} />
        </div>
      ))}
    </ul>
  )
}

const PostRow = ({ post }) => (
  <li className="pb-3 sm:pb-6">
    <article className="flex-col flex sm:flex-row">
      <div className="mr-8">
        <Link to={`post/${post.frontmatter.slug}`}>
          <h1 className="link text-base mb-2">
            {post.frontmatter.title}
          </h1>
        </Link>
        <p className="text-xsm text-gray-700 leading-tight">{post.excerpt}</p>
      </div>
      <div className="mt-3 sm:mt-0 w-24 flex-shrink-0 flex sm:rtl">
        <span className={'mr-2 font-bold text-gray-500 uppercase'}>{post.frontmatter.date}</span>
      </div>
    </article>
  </li>
)
