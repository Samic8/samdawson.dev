import React from "react"
import { techToBgColor } from "../utility/techColors";

export default function ArticleHeader({ title, tech }) {
    return (
        <div className={"flex justify-between"}>
            <h1 className="font-bold text-gray-700 left text-xl leading-tight my-10 sm:my-20 text-center max-w-3xl mx-auto relative font-header">
                {title}
                <div className={`w-10 h-1 absolute mt-2 ${techToBgColor[tech] || 'bg-gray-200'}`} style={{ left: '0' }} />
            </h1>
        </div>
    )
}
