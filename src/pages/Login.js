import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgLogo from "../images/kakaoLion.png";
import Button from "../components/ButtonComponent";
import Input from "../components/InputComponent";
import { Container, Items } from "../components/SignupComponent";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal";
const Img = styled.img`
  width: 180px;
  object-fit: cover;
`;

const Login = () => {
  // State for inputs
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  // 모달 창을 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  // 모달 창을 닫는 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  // 모달창에 대한 문구
  const [modalContent, setModalContent] = useState("");
  // State for validation
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  // 모달창 confirm 동작 함수
  const confirmModal = () => {
    console.log("Confirm 버튼이 눌러 졌습니다.");
  };
  // Email and Password change handlers
  const handleInputChange = (e, setState, setValidState) => {
    setState(e.target.value);
    setValidState(e.target.value.length >= 5);
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputEmail, inputPw);
      localStorage.setItem("email", inputEmail);
      localStorage.setItem("isLogin", "TRUE");
      console.log(rsp.data);
      if (rsp.data) {
        navigate("/home");
      } else {
        setModalOpen(true);
        setModalContent("아이디 또는 패스워드가 일치하지 않습니다.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalContent("서버가 응답하지 않습니다.");
    }
  };

  return (
    <Container>
      <Items variant="sign">
        <Img src={imgLogo} alt="Logo" />
      </Items>

      <Items margin="10px">
        <Input
          placeholder="이메일"
          value={inputEmail}
          onChange={(e) => handleInputChange(e, setInputEmail, setIsId)}
        />
      </Items>

      <Items margin="10px">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={(e) => handleInputChange(e, setInputPw, setIsPw)}
        />
      </Items>

      <Items margin="10px">
        {isId && isPw ? (
          <Button enabled onClick={onClickLogin}>
            SIGN IN
          </Button>
        ) : (
          <Button disabled>SIGN IN</Button>
        )}
      </Items>

      <Items variant="signup">
        <Link to="/Signup" className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>
      <Modal
        open={modalOpen}
        cloase={closeModal}
        header="오류"
        type={true}
        confirm={confirmModal}
      >
        {modalContent}
      </Modal>
    </Container>
  );
};

export default Login;
