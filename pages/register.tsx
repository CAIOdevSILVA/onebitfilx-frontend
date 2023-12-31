import { useEffect, useState } from "react";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap"
import { FormEvent } from "react";
import Footer from "@/src/components/common/footer";
import authService from "@/src/services/authService";
import { useRouter } from "next/router";

import styles from "../styles/registerLogin.module.scss";
import ToastComponent from "@/src/components/common/toast";


const Register = () => {
  const [isToastOpen, setToastIsOpen] = useState(false);
  const [ToastMessage, setToastMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(sessionStorage.getItem("onebitflix-token")){
      router.push("/home")
    }
  }, [])

  const handleRegister = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName")!.toString();
    const lastName = formData.get("lastName")!.toString();
    const phone = formData.get("phone")!.toString();
    const birth = formData.get("birth")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();

    const params = {
      firstName,
      lastName,
      phone,
      birth,
      email,
      password
    };

    if(password !== confirmPassword){
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Senha e confirmção diferentes!")
      return;
    };

    const { data, status } = await authService.register(params);

    if(status === 201){
      router.push("/login?registred=true")
    }else{
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(data.message);
    };
  };

  return (
    <>
      <Head>
        <title>OneBitFlix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnContent="Quero fazer login"
          btnUrl="/login"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem Vindo(a) ao OneBitFlix!</p>
          <Form className={styles.form} onSubmit={handleRegister}>
            <p className="text-center">
              <strong>Faça a sua Conta</strong>
            </p>
            <FormGroup>
              <Label for="firstName" className={styles.label}>NOME</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                type="text" 
                placeholder="Qual o seu nome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>SOBRENOME</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                type="text" 
                placeholder="Qual o seu sobrenome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>
                WHATSAPP / TELEGRAM
              </Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder="(xx) - 9xxxx-xxxx"
                data-mask='[-]+55 (00) 0 0000-0000'
                required
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>
                DATA DE NASCIMENTO
              </Label>
              <Input 
                id="birth" 
                name="birth" 
                type="date" 
                required
                maxLength={20}
                min="1930-01-01"
                max="2022-12-31"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                EMAIL
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Digite o seu email"
                required
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Digite o sua senha(Min: 6 | Max: 20)"
                required
                min={6}
                max={20}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                CONFIRME SUA SENHA
              </Label>
              <Input 
                id="password" 
                name="confirmPassword" 
                type="password" 
                placeholder="Confirme sua senha"
                required
                min={6}
                max={20}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>

            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form>
        </Container>
        <Footer />
        <ToastComponent color="bg-danger" isOpen={isToastOpen} message={ToastMessage}/>
      </main>
    </>
  )
}

export default Register