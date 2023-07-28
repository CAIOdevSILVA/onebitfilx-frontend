import Head from "next/head"
import { useEffect, useState } from "react";
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";

import styles from "../styles/profile.module.scss"
import Footer from "@/src/components/common/footer";
import PasswordForm from "@/src/components/profile/password/PasswordForm";
import PageSpinner from "@/src/components/common/spinner";
import { useRouter } from "next/router";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");
  const router = useRouter();
  const [loading, setLoaging] = useState(true);

  useEffect(() => {
    if(!sessionStorage.getItem("onebitflix-token")){
      router.push("/login")
    }else{
      setLoaging(false);
    }
  }, [])

  if(loading) return <PageSpinner />

  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button 
                style={{ color: form === "userForm" ? "#FF0044" : "white" }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                Dados Pessoais
              </Button>

              <Button 
                style={{ color: form === "passwordForm" ? "#FF0044" : "white" }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                Senha
              </Button>
            </Col>
            <Col md>
              { form === "userForm" ? (
                 <UserForm />
              ) : (
                <PasswordForm/>
              ) }
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  )
}

export default UserInfo