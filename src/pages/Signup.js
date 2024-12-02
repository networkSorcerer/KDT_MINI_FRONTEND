import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/InputComponent";
import Button from "../components/ButtonComponent";
import { Container, Items } from "../components/SignupComponent";
import AxiosApi from "../api/AxiosApi";
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>;

const Signup = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  // 오류 메시지
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  //주소 입력
  const [postcode, setPostcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  //전화 번호 입력
  const [hpFst, setHpFst] = useState("010"); // 초기값 010
  const [hpMid, setHpMid] = useState("");
  const [hpLst, setHpLst] = useState("");
  // 유효성 검사
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);

  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsDaumLoaded(true); // Daum API가 로드되었을 때 상태 업데이트
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setDetailAddress("");

    // setUserInfo(prevState => ({
    //     ...prevState,
    //     zipCode: Number(data.zonecode),
    //     addr: fullAddress,
    //     addrDetail: '' // 기본값으로 설정
    //   }));
  };

  const handleClick1 = () => {
    if (isDaumLoaded) {
      const { daum } = window; // TypeScript에서의 'any' 없이 사용
      new daum.Postcode({
        oncomplete: handleComplete,
      }).open();
    } else {
      console.log("Daum Postcode API is not loaded yet.");
    }
  };

  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      setMailMessage("올바른 형식 입니다.");
      setIsMail(true);
      memberRegCheck(e.target.value);
    }
  };
  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };
  const onChangeAddress = (e) => {
    setInputAddress(e.target.value);
  };
  const onChangePhone = (e) => {
    setInputPhone(e.target.value);
  };
  // 회원 가입 여부 확인
  const memberRegCheck = async (email) => {
    try {
      const resp = await AxiosApi.regCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);
      if (resp.data === true) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsMail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsMail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickLogin = async () => {
    try {
      const memberReg = await AxiosApi.signup(inputEmail, inputPw, inputName);
      console.log(memberReg.data);
      if (memberReg.data) {
        navigate("/");
      } else {
        // setModalOpen(true);
        // setModelText("회원 가입에 실패 했습니다.");
        alert("회원 가입에 실패 했습니다.");
      }
    } catch (e) {
      alert("서버가 응답하지 않습니다.");
    }
  };

  return (
    <Container>
      <Items className="sign">
        <span>Sign Up</span>
      </Items>

      <Items variant="item2">
        <Input
          type="email"
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeMail}
        />
      </Items>
      <Items variant="hint">
        {inputEmail.length > 0 && (
          <span className={`message ${isMail ? "success" : "error"}`}>
            {mailMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={onChangePw}
        />
      </Items>
      <Items variant="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isPw ? "success" : "error"}`}>
            {pwMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="password"
          placeholder="패스워드 확인"
          value={inputConPw}
          onChange={onChangeConPw}
        />
      </Items>
      <Items variant="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isConPw ? "success" : "error"}`}>
            {conPwMessage}
          </span>
        )}
      </Items>
      <Items variant="item2">
        <Input
          type="text"
          placeholder="이름"
          value={inputName}
          onChange={onChangeName}
        />
      </Items>
      <Items varient="addres">
        <div>
          <Input
            type="text"
            placeholder="주소"
            value={inputAddress}
            onChange={onChangeAddress}
          />
          {/* 상세 주소를 추가로 입력받을 Input 필드 */}
          <Input
            type="text"
            placeholder="상세 주소"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
        <Button onClick={handleClick1}>주소찾기</Button>
      </Items>
      <Items variant="phone">
        <Input
          type="text"
          placeholder="전화번호"
          value={inputPhone}
          onChange={onChangePhone}
        />
      </Items>
      <Items variant="item2">
        {isMail && isPw && isConPw && isName ? (
          <Button enabled onClick={onClickLogin}>
            NEXT
          </Button>
        ) : (
          <Button disabled>NEXT</Button>
        )}
      </Items>
    </Container>
  );
};
export default Signup;
