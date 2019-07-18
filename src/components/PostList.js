import React from 'react'
import TechList from './techList'

export default function PostList({posts = []}) {
    return (
        <ul>
            {posts.map((post, index) => (
                <div key={post.id} className={index > 0 ? 'mt-5' : ''}>
                    <PostRow post={post} />
                </div>
            ))}
        </ul>
    )
}

const techsToArray = techs => techs ? techs.split(' ') : []
const PostRow = ({post}) => (
    <li className='max-w-2xl border-b-2 border-gray-100 border-dashed pb-6'>
        <article className='flex'>
            <div className='mr-8'>
                <h1 className='text-lg leading-none text-gray-900 mb-2'>{post.frontmatter.title}</h1>
                <p className='text-sm text-gray-700 leading-tight'>{post.excerpt}</p>
            </div>
            <div className='w-32 flex-shrink-0 flex'>
                <TechList techs={techsToArray(post.frontmatter.techs)} />
            </div>
        </article>
    </li>
)
