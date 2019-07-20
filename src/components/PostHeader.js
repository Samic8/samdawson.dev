import React from 'react'
import Back from '../svgs/back.svg'
import { Link } from 'gatsby'

export default function PostHeader({title, shouldShowBackButton}) {
    return (
        <div className={'flex justify-between'}>
            <h1 className="text-base font-medium text-gray-500 leading-none mb-6 sm:mb-10">{title}</h1>
            {shouldShowBackButton && <Link to={'/'} title={'Back'}>
                <Back className={'text-gray-500 hover:text-gray-100 cursor-pointer'} />
            </Link>}
        </div>
    )
}
