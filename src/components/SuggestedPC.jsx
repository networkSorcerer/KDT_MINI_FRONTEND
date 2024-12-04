import React, { useState, useEffect } from "react";

const SuggestedPC = () => {
  const [pcs, setPcs] = useState([]); // 가격대별 PC 목록
  const [selectedPC, setSelectedPC] = useState(null); // 선택된 PC
  const [cart, setCart] = useState([]); // 장바구니

  // 가격대별 제품을 불러오는 함수 (예시로 정의된 제품 목록)
  const fetchPCs = (priceRange) => {
    const examplePCs = {
      "70만원 이하": [
        {
          id: 1,
          name: "PC1",
          price: "600,000",
          specs: "Intel i5, 8GB RAM, 256GB SSD",
        },
        {
          id: 2,
          name: "PC2",
          price: "650,000",
          specs: "AMD Ryzen 5, 8GB RAM, 512GB SSD",
        },
      ],
      "70만원 ~ 80만원": [
        {
          id: 3,
          name: "PC3",
          price: "750,000",
          specs: "Intel i7, 16GB RAM, 512GB SSD",
        },
        {
          id: 4,
          name: "PC4",
          price: "780,000",
          specs: "AMD Ryzen 7, 16GB RAM, 1TB SSD",
        },
      ],
      "80만원 ~ 90만원": [
        {
          id: 5,
          name: "PC5",
          price: "850,000",
          specs: "Intel i7, 16GB RAM, 1TB SSD",
        },
        {
          id: 6,
          name: "PC6",
          price: "880,000",
          specs: "AMD Ryzen 9, 32GB RAM, 1TB SSD",
        },
      ],
      "100만원 이상": [
        {
          id: 7,
          name: "PC7",
          price: "1,200,000",
          specs: "Intel i9, 32GB RAM, 2TB SSD",
        },
        {
          id: 8,
          name: "PC8",
          price: "1,500,000",
          specs: "AMD Ryzen 9, 64GB RAM, 2TB SSD",
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

  // 기본적으로 70만원 이하 제품을 로드
  useEffect(() => {
    fetchPCs("70만원 이하");
  }, []);

  return (
    <div style={styles.container}>
      <h1>추천 완본체</h1>

      {/* 가격대 선택 버튼 */}
      <div style={styles.priceRangeContainer}>
        <button onClick={() => fetchPCs("70만원 이하")} style={styles.button}>
          ~ 70만원
        </button>
        <button
          onClick={() => fetchPCs("70만원 ~ 80만원")}
          style={styles.button}
        >
          70만원 ~ 80만원
        </button>
        <button
          onClick={() => fetchPCs("80만원 ~ 90만원")}
          style={styles.button}
        >
          80만원 ~ 90만원
        </button>
        <button onClick={() => fetchPCs("100만원 이상")} style={styles.button}>
          100만원 ~
        </button>
      </div>

      {/* 가격대별 PC 목록 */}
      <div style={styles.pcsList}>
        {pcs.length === 0 ? (
          <p>해당 가격대에 제품이 없습니다.</p>
        ) : (
          pcs.map((pc) => (
            <div
              key={pc.id}
              style={styles.pcCard}
              onClick={() => handleSelectPC(pc)}
            >
              <h3>{pc.name}</h3>
              <p>{pc.price}원</p>
            </div>
          ))
        )}
      </div>

      {/* 선택된 PC 상세 보기 */}
      {selectedPC && (
        <div style={styles.selectedPC}>
          <h2>{selectedPC.name}</h2>
          <p>가격: {selectedPC.price}원</p>
          <p>사양: {selectedPC.specs}</p>
          <button onClick={addToCart} style={styles.addToCartButton}>
            장바구니에 추가
          </button>
        </div>
      )}

      {/* 장바구니 보기 */}
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h2>장바구니</h2>
          <ul>
            {cart.map((pc, index) => (
              <li key={index}>
                {pc.name} - {pc.price}원
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
  },
  priceRangeContainer: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "0 5px",
  },
  pcsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },
  pcCard: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  selectedPC: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f4f4f4",
  },
  addToCartButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  cart: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
};

export default SuggestedPC;
