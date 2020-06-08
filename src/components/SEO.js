import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  description = "",
  lang = "en",
  meta: propMeta = [],
  title,
  imageUrl,
  children,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const meta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `article`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ].concat(propMeta)

  if (imageUrl) {
    meta.push({
      property: `og:image`,
      content: `${site.siteMetadata.siteUrl}${imageUrl}`,
    })
    meta.push({
      property: `twitter:image`,
      content: `${site.siteMetadata.siteUrl}${imageUrl}`,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}
      meta={meta}
    >
      {children}
    </Helmet>
  )
}

export default SEO
