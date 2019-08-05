import React from "react"
import { Link } from "gatsby"

export default function ArticleList({ posts = [] }) {
  return (
    <ul className={'mx-auto relative z-10'}>
      {posts.map((post, index) => (
        <div key={post.id} className={index > 0 ? "mt-4 sm:mt-10" : ""}>
          <PostRow post={post} />
        </div>
      ))}
    </ul>
  )
}

const PostRow = ({ post }) => (
  <li key={post.frontmatter.title}>
    <Link to={`article/${post.frontmatter.slug}`} className="py-10 sm:px-6 sm:hover:bg-gray-100 block rounded-lg">
      <article>
        <div>
          <h1 className="font-bold text-md sm:text-lg text-gray-700 leading-none font-header">
            {post.frontmatter.title}
          </h1>
          <time className={'text-xsm tracking-wide font-bold text-gray-300 uppercase'}>{post.frontmatter.date}</time>
        </div>
        <p className="text-sm leading-tight sm:leading-snug sm:text-base text-gray-800">{post.excerpt}<span className={'link link--xsm inline-block'}>read more</span></p>
      </article>
    </Link>
  </li>
)
