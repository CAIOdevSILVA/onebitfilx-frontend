import { Container } from "reactstrap"
import styles from "./styles.module.scss"

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <img 
          src="/logoOnebitCode.svg" 
          alt="LogoFooter"
          className={styles.footerLogo}
        />

        <a 
          href="http://onebitcode.com" 
          target="_blank"
          className={styles.footerLink}
          >
            ONEBITCODE.COM
          </a>
      </Container>
    </>
  )
}

export default Footer