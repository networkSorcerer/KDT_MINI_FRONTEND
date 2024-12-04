import React, { useState, useEffect } from "react";

const SuggestedPC = () => {
  const [pcs, setPcs] = useState([]); // 가격대별 PC 목록
  const [selectedPC, setSelectedPC] = useState(null); // 선택된 PC
  const [cart, setCart] = useState([]); // 장바구니
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계

  // 가격대별 제품을 불러오는 함수
  const fetchPCs = (priceRange) => {
    const examplePCs = {
      "70만원 미만": [
        {
          id: 1,
          name: "PC1",
          price: "600,000",
          cpu: "Intel i5",
          motherboard: "ASUS Z390",
          ram: "8GB",
          vga: "NVIDIA GTX 1050",
          ssd: "256GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 2,
          name: "PC2",
          price: "650,000",
          cpu: "AMD Ryzen 5",
          motherboard: "MSI B450",
          ram: "8GB",
          vga: "AMD RX 580",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 3,
          name: "PC3",
          price: "550,000",
          cpu: "Intel i3",
          motherboard: "Gigabyte H310",
          ram: "4GB",
          vga: "NVIDIA GTX 750",
          ssd: "120GB SSD",
          hdd: "500GB HDD",
        },
        {
          id: 4,
          name: "PC4",
          price: "680,000",
          cpu: "Intel i5",
          motherboard: "MSI B460",
          ram: "8GB",
          vga: "AMD RX 570",
          ssd: "256GB SSD",
          hdd: "1TB HDD",
        },
      ],
      "70만원 이상 ~ 80만원 미만": [
        {
          id: 5,
          name: "PC5",
          price: "750,000",
          cpu: "Intel i5",
          motherboard: "ASRock B460",
          ram: "8GB",
          vga: "NVIDIA GTX 1060",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 6,
          name: "PC6",
          price: "770,000",
          cpu: "AMD Ryzen 5",
          motherboard: "Gigabyte B550",
          ram: "8GB",
          vga: "AMD RX 5700",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 7,
          name: "PC7",
          price: "780,000",
          cpu: "Intel i5",
          motherboard: "MSI Z490",
          ram: "16GB",
          vga: "NVIDIA GTX 1660 Super",
          ssd: "256GB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 8,
          name: "PC8",
          price: "790,000",
          cpu: "AMD Ryzen 7",
          motherboard: "ASUS B550",
          ram: "16GB",
          vga: "NVIDIA RTX 2060",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
      ],
      "80만원 이상 ~ 90만원 미만": [
        {
          id: 9,
          name: "PC9",
          price: "850,000",
          cpu: "Intel i7",
          motherboard: "Gigabyte B560",
          ram: "16GB",
          vga: "NVIDIA GTX 1660 Super",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 10,
          name: "PC10",
          price: "880,000",
          cpu: "AMD Ryzen 7",
          motherboard: "MSI B550",
          ram: "16GB",
          vga: "NVIDIA RTX 2060",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
        },
        {
          id: 11,
          name: "PC11",
          price: "890,000",
          cpu: "Intel i9",
          motherboard: "ASRock Z490",
          ram: "32GB",
          vga: "NVIDIA RTX 2070",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 12,
          name: "PC12",
          price: "890,000",
          cpu: "AMD Ryzen 9",
          motherboard: "Gigabyte B550",
          ram: "32GB",
          vga: "NVIDIA RTX 2070",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
      ],
      "90만원 이상 ~ 100만원 미만": [
        {
          id: 13,
          name: "PC13",
          price: "950,000",
          cpu: "Intel i9",
          motherboard: "MSI Z490",
          ram: "32GB",
          vga: "NVIDIA RTX 3070",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 14,
          name: "PC14",
          price: "980,000",
          cpu: "AMD Ryzen 9",
          motherboard: "ASUS ROG Strix",
          ram: "32GB",
          vga: "NVIDIA RTX 3070",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 15,
          name: "PC15",
          price: "990,000",
          cpu: "Intel i9",
          motherboard: "Gigabyte Z490",
          ram: "32GB",
          vga: "NVIDIA RTX 3080",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 16,
          name: "PC16",
          price: "999,000",
          cpu: "AMD Ryzen 9",
          motherboard: "MSI MEG X570",
          ram: "32GB",
          vga: "NVIDIA RTX 3080",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
        },
      ],
      "100만원 이상": [
        {
          id: 17,
          name: "PC17",
          price: "1,100,000",
          cpu: "Intel i9",
          motherboard: "ASUS ROG Strix",
          ram: "64GB",
          vga: "NVIDIA RTX 4090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 18,
          name: "PC18",
          price: "1,200,000",
          cpu: "AMD Ryzen 9",
          motherboard: "MSI MEG X570",
          ram: "64GB",
          vga: "NVIDIA RTX 4090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
        },
        {
          id: 19,
          name: "PC19",
          price: "1,300,000",
          cpu: "Intel Xeon",
          motherboard: "Supermicro X11",
          ram: "128GB",
          vga: "NVIDIA RTX A5000",
          ssd: "2TB SSD",
          hdd: "4TB HDD",
        },
        {
          id: 20,
          name: "PC20",
          price: "1,400,000",
          cpu: "AMD Ryzen Threadripper",
          motherboard: "ASUS ROG Zenith II",
          ram: "128GB",
          vga: "NVIDIA RTX A5000",
          ssd: "2TB SSD",
          hdd: "4TB HDD",
        },
      ],
    };

    setPcs(examplePCs[priceRange] || []); // 해당 가격대의 제품을 로드
  };

  // 제품을 선택하는 함수
  const handleSelectPC = (pc) => {
    setSelectedPC(pc); // 선택된 PC 설정
  };

  // 장바구니에 추가하는 함수
  const addToCart = () => {
    if (selectedPC) {
      setCart((prevCart) => [...prevCart, selectedPC]); // 기존 장바구니에 선택된 PC 추가
      alert(`${selectedPC.name}가 장바구니에 추가되었습니다!`);
    }
  };

  // 장바구니에서 삭제하는 함수
  const removeFromCart = (pcId) => {
    setCart(cart.filter((pc) => pc.id !== pcId)); // 해당 PC를 장바구니에서 삭제
  };

  // 가격대 버튼을 클릭했을 때 PC 목록을 불러오는 useEffect
  useEffect(() => {
    fetchPCs("70만원 미만"); // 초기값으로 70만원 미만 범위 불러오기
  }, []);

  return (
    <div style={styles.container}>
      <h1>추천 PC</h1>

      <div style={styles.stepButtons}>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 0 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(0);
            fetchPCs("70만원 미만");
          }}
        >
          70만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 1 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(1);
            fetchPCs("70만원 이상 ~ 80만원 미만");
          }}
        >
          70만원 이상 ~ 80만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 2 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(2);
            fetchPCs("80만원 이상 ~ 90만원 미만");
          }}
        >
          80만원 이상 ~ 90만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 3 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(3);
            fetchPCs("90만원 이상 ~ 100만원 미만");
          }}
        >
          90만원 이상 ~ 100만원 미만
        </button>
        <button
          style={{
            ...styles.stepButton,
            backgroundColor: currentStep === 4 ? "#ddd" : "#f4f4f4",
          }}
          onClick={() => {
            setCurrentStep(4);
            fetchPCs("100만원 이상");
          }}
        >
          100만원 이상
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.pcList}>
          {pcs.map((pc) => (
            <div
              key={pc.id}
              style={styles.pcCard}
              onClick={() => handleSelectPC(pc)}
            >
              <h3>{pc.name}</h3>
              <p>{`가격: ${pc.price}`}</p>
              <p>{`CPU: ${pc.cpu}`}</p>
              <p>{`RAM: ${pc.ram}`}</p>
              <p>{`VGA: ${pc.vga}`}</p>
              <p>{`SSD: ${pc.ssd}`}</p>
              <p>{`HDD: ${pc.hdd}`}</p>
            </div>
          ))}
        </div>

        {selectedPC && (
          <div style={styles.selectedPC}>
            <h2>선택된 PC: {selectedPC.name}</h2>
            <p>{`가격: ${selectedPC.price}`}</p>
            <p>{`CPU: ${selectedPC.cpu}`}</p>
            <p>{`RAM: ${selectedPC.ram}`}</p>
            <p>{`VGA: ${selectedPC.vga}`}</p>
            <p>{`SSD: ${selectedPC.ssd}`}</p>
            <p>{`HDD: ${selectedPC.hdd}`}</p>
            <button style={styles.button} onClick={addToCart}>
              장바구니에 추가
            </button>
          </div>
        )}
      </div>

      {/* 장바구니 출력 */}
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h2>장바구니</h2>
          {cart.map((pc, index) => (
            <div key={index} style={styles.cartItem}>
              <h3>{pc.name}</h3>
              <p>{`가격: ${pc.price}`}</p>
              <p>{`CPU: ${pc.cpu}`}</p>
              <p>{`RAM: ${pc.ram}`}</p>
              <p>{`VGA: ${pc.vga}`}</p>
              <p>{`SSD: ${pc.ssd}`}</p>
              <p>{`HDD: ${pc.hdd}`}</p>
              <button
                style={styles.removeButton}
                onClick={() => removeFromCart(pc.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  stepButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  stepButton: {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    cursor: "pointer",
    width: "19%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pcList: {
    width: "60%",
    paddingRight: "20px",
  },
  pcCard: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  selectedPC: {
    width: "35%",
    padding: "15px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  cart: {
    marginTop: "40px",
  },
  cartItem: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default SuggestedPC;
