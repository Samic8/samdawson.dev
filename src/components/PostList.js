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
  <li>
    <Link to={`post/${post.frontmatter.slug}`} className="py-6 sm:px-6 hover:bg-gray-100 block rounded-lg">
      <article className="">
          <div className='mb-2'>
            <h1 className="font-medium text-base text-gray-800 leading-none">
              {post.frontmatter.title}
            </h1>
            <time className={'text-xsm tracking-wide font-bold text-gray-300 uppercase'}>{post.frontmatter.date}</time>
          </div>
          <p className="text-sm text-gray-700 leading-tight">{post.excerpt}<span className={'link link--xsm inline-block'}>read more</span></p>
      </article>
    </Link>
  </li>
)
