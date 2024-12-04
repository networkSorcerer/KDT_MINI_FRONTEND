import React, { useState } from "react";

const StepwisePCCustomizing = () => {
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계
  const [selectedParts, setSelectedParts] = useState({}); // 선택된 부품
  const [cart, setCart] = useState([]); // 장바구니 상태

  // 각 부품에 대한 선택지와 가격
  const partsOptions = [
    {
      category: "cpu",
      options: [
        { name: "RYZEN 5600G", price: 200000 },
        { name: "RYZEN 5600X", price: 250000 },
        { name: "Intel i5 11600K", price: 270000 },
        { name: "Intel i7 12700", price: 400000 },
      ],
    },
    {
      category: "motherboard",
      options: [
        { name: "MSI 550M", price: 120000 },
        { name: "ASUS B550", price: 140000 },
        { name: "Gigabyte Z590", price: 200000 },
        { name: "MSI Z690", price: 300000 },
      ],
    },
    {
      category: "ram",
      options: [
        { name: "SAMSUNG 8GB", price: 50000 },
        { name: "Corsair 16GB", price: 100000 },
        { name: "Kingston 32GB", price: 150000 },
        { name: "G.SKILL 8GB", price: 60000 },
      ],
    },
    {
      category: "vga",
      options: [
        { name: "NVIDIA 1060GTX", price: 300000 },
        { name: "NVIDIA 3070", price: 600000 },
        { name: "AMD RX 580", price: 350000 },
        { name: "AMD RX 6900", price: 1000000 },
      ],
    },
    {
      category: "ssd",
      options: [
        { name: "EVO 512GB", price: 80000 },
        { name: "Crucial 1TB", price: 120000 },
        { name: "Samsung 980 500GB", price: 100000 },
        { name: "ADATA 1TB", price: 90000 },
      ],
    },
    {
      category: "hdd",
      options: [
        { name: "WD 2TB", price: 70000 },
        { name: "Seagate 4TB", price: 150000 },
        { name: "Toshiba 1TB", price: 50000 },
        { name: "WD 6TB", price: 250000 },
      ],
    },
  ];

  // 부품 선택 처리
  const handleSelectPart = (category, part) => {
    setSelectedParts({
      ...selectedParts,
      [category]: part,
    });
    setCurrentStep((prevStep) => prevStep + 1); // 다음 단계로 이동
  };

  // 장바구니에 추가
  const addToCart = () => {
    if (Object.keys(selectedParts).length === partsOptions.length) {
      setCart((prevCart) => [...prevCart, selectedParts]);
      alert("구성이 장바구니에 추가되었습니다!");
      setSelectedParts({});
      setCurrentStep(0); // 초기화
    } else {
      alert("모든 항목을 선택해 주세요.");
    }
  };

  // 총 가격 계산
  const calculateTotalPrice = (config) => {
    return Object.values(config).reduce((sum, part) => sum + part.price, 0);
  };

  // 가격 포맷 (원화, 3자리마다 쉼표)
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  // 선택된 부품 순서
  const selectedPartOrder = ["cpu", "motherboard", "ram", "vga", "ssd", "hdd"];

  return (
    <div style={styles.container}>
      <h1>단계별 커스텀 PC</h1>

      {/* 부품 선택 버튼 위치 변경 */}
      <div style={styles.stepButtons}>
        {partsOptions.map((part, index) => (
          <button
            key={part.category}
            onClick={() => setCurrentStep(index)}
            style={{
              ...styles.stepButton,
              backgroundColor: currentStep === index ? "#ddd" : "#f4f4f4",
            }}
          >
            {part.category.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {/* 부품 선택 */}
        <div style={styles.stepContainer}>
          <h2>부품 선택</h2>

          {/* 현재 단계 표시 */}
          {currentStep < partsOptions.length && (
            <div style={styles.optionList}>
              {partsOptions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSelectPart(partsOptions[currentStep].category, option)
                  }
                  style={styles.optionButton}
                >
                  {option.name} ({formatPrice(option.price)})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 선택된 구성 */}
        <div style={styles.summaryContainer}>
          <h2>선택된 구성</h2>
          <div style={styles.selectedParts}>
            {selectedPartOrder.map(
              (category) =>
                selectedParts[category] && (
                  <div key={category} style={styles.selectedItem}>
                    <strong>{category.toUpperCase()}:</strong>{" "}
                    {selectedParts[category].name} (
                    {formatPrice(selectedParts[category].price)})
                  </div>
                )
            )}
          </div>
          <h3>총 가격: {formatPrice(calculateTotalPrice(selectedParts))}</h3>
        </div>
      </div>

      {/* 장바구니 추가 버튼 */}
      <div style={styles.cartButtonContainer}>
        <button onClick={addToCart} style={styles.cartButton}>
          장바구니에 추가
        </button>
      </div>

      {/* 장바구니 보기 */}
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h3>장바구니</h3>
          <ul>
            {cart.map((pc, index) => (
              <li key={index}>
                <h4>구성 {index + 1}:</h4>
                <ul>
                  {Object.keys(pc).map((category) => (
                    <li key={category}>
                      <strong>{category.toUpperCase()}:</strong>{" "}
                      {pc[category].name} ({formatPrice(pc[category].price)})
                    </li>
                  ))}
                </ul>
                <h4>총 가격: {formatPrice(calculateTotalPrice(pc))}</h4>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  stepButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px", // 버튼 사이 여백
  },
  stepButton: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
  },
  stepContainer: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    marginRight: "20px",
  },
  optionList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  optionButton: {
    padding: "12px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "5px",
    textAlign: "center",
  },
  summaryContainer: {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#e9e9e9",
  },
  selectedParts: {
    marginBottom: "20px",
  },
  selectedItem: {
    marginBottom: "10px",
  },
  cartButtonContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  cartButton: {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  cart: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};

export default StepwisePCCustomizing;
