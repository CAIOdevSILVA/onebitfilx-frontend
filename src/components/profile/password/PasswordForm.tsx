import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useState, FormEvent } from "react";
import profileService from "@/src/services/profileService";
import ToastComponent from "../../common/toast";

import styles from "../../../../styles/profile.module.scss";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setCurrentPassword(password?.currentPassword);
      setNewPassword(password?.newPassword);
    });
  }, [])

  const handlePasswordUpdate = async(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    if(newPassword !== confirmNewPassword){
      setToastIsOpen(true);
      setErrorMessage("Senha e Confirmação de Senha diferentes!");
      setColor("bg-danger");

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      return;
    };

    if(currentPassword === newPassword){
      setToastIsOpen(true);
      setErrorMessage("Não coloque a nova senha igual a antiga!");
      setColor("bg-danger");

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      return;
    };

    const res = await profileService.passwordUpdate({ currentPassword, newPassword });

    if(res === 204){
      setToastIsOpen(true);
      setErrorMessage("Senha alterada com sucesso!");
      setColor("bg-success");

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    };

    if(res === 400){
      setToastIsOpen(true);
      setErrorMessage("Senha atual incorreta!");
      setColor("bg-danger");

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
    };
  }

  return (
    <>
      <Form onSubmit={handlePasswordUpdate} className={styles.form}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label 
              for='currentPassword'
              className={styles.label}
            >
              SENHA ATUAL
            </Label>
            <Input 
              name ={'currentPassword'}
              type="password"
              id="currentPassword"
              placeholder="*******"
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label for="newPassword">NOVA SENHA</Label>
            <Input 
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="*******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmNewPassword">NOVA SENHA</Label>
            <Input 
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="*******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              value={confirmNewPassword}
              onChange={(event) => {
                setConfirmNewPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>

        </div>
        <Button
            className={styles.formBtn}
            outline
            type="submit"
          >
            Salvar Alterações
          </Button>
      </Form>
      <ToastComponent 
        color={color} 
        isOpen={toastIsOpen} 
        message={errorMessage}
      />
    </>
  )
}

export default PasswordForm