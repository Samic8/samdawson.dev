import PropTypes from "prop-types"
import React from "react"
import HeadshotImage from './Image'
import SocialButton from './SocialButton'
import TechTag from './TechTag'
import Github from '../svgs/github.svg'
import Codepen from '../svgs/Codepen.svg'
import Twitter from '../svgs/Twitter.svg'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className={styles.header}>
    <div className={styles.row}>
      <HeadshotImage />
    </div>
    <div className={styles.row}>
      <p className={styles.paragraph}>
        Hi, I'm Sam.
        I build pretty good
        websites and apps.
      </p>
    </div>
    <div className={`${styles.row}`}>
      <SocialButton className={styles.socialButton} href="https://codepen.io/Samic8/"><Codepen /></SocialButton>
      <SocialButton className={styles.socialButton} href="https://github.com/samic8"><Github /></SocialButton>
      <SocialButton className={styles.socialButton} href="https://twitter.com/sam__dawson"><Twitter /></SocialButton>
    </div>
    <div className={styles.row}>
      {['react', 'CSS'].map(techName => (
        <TechTag key={techName} techName={techName} className={styles.techTag} />
      ))}
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
