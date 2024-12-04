import React, { useState, useEffect } from "react";

const SuggestedPC = () => {
  const [pcs, setPcs] = useState([]); // 가격대별 PC 목록
  const [selectedPC, setSelectedPC] = useState(null); // 선택된 PC
  const [cart, setCart] = useState([]); // 장바구니
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계

  // 가격 포맷 (원화, 3자리마다 쉼표)
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  // 가격대별 제품을 불러오는 함수
  const fetchPCs = (priceRange) => {
    const examplePCs = {
      "70만원 미만": [
        {
          id: 1,
          name: "PC1",
          price: 600000,
          cpu: "Intel i5",
          motherboard: "ASUS Z390",
          ram: "8GB",
          vga: "NVIDIA GTX 1050",
          ssd: "256GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 2,
          name: "PC2",
          price: 550000,
          cpu: "AMD Ryzen 5",
          motherboard: "MSI B450",
          ram: "8GB",
          vga: "NVIDIA GTX 1050 Ti",
          ssd: "240GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0312/1123409/1123409_600.jpg",
        },
        {
          id: 3,
          name: "PC3",
          price: 680000,
          cpu: "Intel i7",
          motherboard: "Gigabyte B360M",
          ram: "16GB",
          vga: "NVIDIA GTX 1650",
          ssd: "500GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 4,
          name: "PC4",
          price: 700000,
          cpu: "Intel i5",
          motherboard: "ASUS H310M",
          ram: "8GB",
          vga: "NVIDIA GTX 1060",
          ssd: "480GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
      ],
      "70만원 이상 ~ 80만원 미만": [
        {
          id: 5,
          name: "PC5",
          price: 750000,
          cpu: "Intel i5",
          motherboard: "MSI Z390",
          ram: "16GB",
          vga: "NVIDIA GTX 1660",
          ssd: "500GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 6,
          name: "PC6",
          price: 780000,
          cpu: "AMD Ryzen 5",
          motherboard: "Gigabyte B450M",
          ram: "16GB",
          vga: "NVIDIA GTX 1660 Ti",
          ssd: "500GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 7,
          name: "PC7",
          price: 790000,
          cpu: "Intel i7",
          motherboard: "ASUS Z390",
          ram: "16GB",
          vga: "NVIDIA GTX 1660 Super",
          ssd: "512GB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 8,
          name: "PC8",
          price: 800000,
          cpu: "AMD Ryzen 7",
          motherboard: "MSI B550",
          ram: "16GB",
          vga: "NVIDIA GTX 1660 Ti",
          ssd: "1TB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
      ],
      "80만원 이상 ~ 90만원 미만": [
        {
          id: 9,
          name: "PC9",
          price: 850000,
          cpu: "Intel i7",
          motherboard: "Gigabyte Z490",
          ram: "16GB",
          vga: "NVIDIA RTX 2060",
          ssd: "1TB SSD",
          hdd: "1TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 10,
          name: "PC10",
          price: 880000,
          cpu: "AMD Ryzen 7",
          motherboard: "ASUS B550",
          ram: "16GB",
          vga: "NVIDIA RTX 2060 Super",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 11,
          name: "PC11",
          price: 890000,
          cpu: "Intel i9",
          motherboard: "MSI Z590",
          ram: "16GB",
          vga: "NVIDIA RTX 2070",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 12,
          name: "PC12",
          price: 900000,
          cpu: "AMD Ryzen 7",
          motherboard: "Gigabyte X570",
          ram: "32GB",
          vga: "NVIDIA RTX 2070 Super",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
      ],
      "90만원 이상 ~ 100만원 미만": [
        {
          id: 13,
          name: "PC13",
          price: 950000,
          cpu: "Intel i9",
          motherboard: "ASUS ROG",
          ram: "32GB",
          vga: "NVIDIA RTX 2080",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 14,
          name: "PC14",
          price: 980000,
          cpu: "AMD Ryzen 9",
          motherboard: "MSI X570",
          ram: "32GB",
          vga: "NVIDIA RTX 2080 Super",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 15,
          name: "PC15",
          price: 990000,
          cpu: "Intel i9",
          motherboard: "Gigabyte Z590",
          ram: "32GB",
          vga: "NVIDIA RTX 2080 Ti",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 16,
          name: "PC16",
          price: 1000000,
          cpu: "AMD Ryzen 9",
          motherboard: "ASUS ROG Crosshair",
          ram: "64GB",
          vga: "NVIDIA RTX 3090",
          ssd: "1TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
      ],
      "100만원 이상": [
        {
          id: 17,
          name: "PC17",
          price: 1100000,
          cpu: "Intel i9",
          motherboard: "ASUS Z590",
          ram: "64GB",
          vga: "NVIDIA RTX 3090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 18,
          name: "PC18",
          price: 1200000,
          cpu: "AMD Ryzen 9",
          motherboard: "MSI MEG X570",
          ram: "64GB",
          vga: "NVIDIA RTX 3090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 19,
          name: "PC19",
          price: 1300000,
          cpu: "Intel i9",
          motherboard: "Gigabyte Z590",
          ram: "64GB",
          vga: "NVIDIA RTX 4090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
        },
        {
          id: 20,
          name: "PC20",
          price: 1400000,
          cpu: "AMD Ryzen 9",
          motherboard: "ASUS ROG Crosshair",
          ram: "64GB",
          vga: "NVIDIA RTX 4090",
          ssd: "2TB SSD",
          hdd: "2TB HDD",
          image:
            "https://image3.compuzone.co.kr/img/product_img/2024/0513/1144237/1144237_600.jpg",
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
              <img src={pc.image} alt={pc.name} style={styles.pcImage} />{" "}
              <h3>{pc.name}</h3>
              <p>{`가격: ${formatPrice(pc.price)}`}</p>
              <p>{`CPU: ${pc.cpu}`}</p>
              <p>{`RAM: ${pc.ram}`}</p>
              <p>{`VGA: ${pc.vga}`}</p>
              <p>{`SSD: ${pc.ssd}`}</p>
              <p>{`HDD: ${pc.hdd}`}</p>
            </div>
          ))}
        </div>

        <div style={styles.selectedPCContainer}>
          {selectedPC && (
            <div style={styles.selectedPC}>
              <h2>선택된 PC: {selectedPC.name}</h2>
              <img
                src={selectedPC.image}
                alt={selectedPC.name}
                style={styles.selectedPCImage}
              />
              <p>{`가격: ${formatPrice(selectedPC.price)}`}</p>
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
      </div>

      {/* 장바구니 출력 */}
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h2>장바구니</h2>
          {cart.map((pc, index) => (
            <div key={index} style={styles.cartItem}>
              <h3>{pc.name}</h3>
              <img src={pc.image} alt={pc.name} style={styles.cartItemImage} />
              <p>{`가격: ${formatPrice(pc.price)}`}</p>
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
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  stepButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  stepButton: {
    padding: "10px 20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  pcList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexBasis: "65%",
  },
  selectedPCContainer: {
    flexBasis: "30%",
  },
  pcCard: {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    cursor: "pointer",
  },
  pcImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  selectedPC: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  selectedPCImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cart: {
    marginTop: "30px",
  },
  cartItem: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  cartItemImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginRight: "10px",
  },
  removeButton: {
    padding: "5px 10px",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "auto",
  },
};

export default SuggestedPC;
