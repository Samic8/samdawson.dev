
import React from "react"
import styled, {ThemeProvider} from 'styled-components'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import theme from '../styles/theme'

import Header from "./header"
import "./layout.css"


const PageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1240px;
  font-size: ${props => props.theme.fontSizeContent};
`

const Content = styled.div`
  flex: 1 1 auto;
  max-width: 940px;
  margin-left: auto;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Content>
      </PageWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
