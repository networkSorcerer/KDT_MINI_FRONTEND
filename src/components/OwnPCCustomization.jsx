import React, { useState } from "react";

const OwnPCCustomizing = () => {
  // 부품 목록을 상태로 관리
  const [selectedParts, setSelectedParts] = useState({});
  const [cart, setCart] = useState([]); // 장바구니 상태
  const [isPartSelected, setIsPartSelected] = useState(false); // 부품이 선택되었는지 여부

  // 각 부품에 대한 선택지
  const partsOptions = {
    cpu: ["RYZEN 5600G", "RYZEN 5600X", "Intel i5 11600K", "Intel i7 12700"],
    motherboard: ["MSI 550M", "ASUS B550", "Gigabyte Z590", "MSI Z690"],
    ram: ["SAMSUNG 8GB", "Corsair 16GB", "Kingston 32GB", "G.SKILL 8GB"],
    vga: ["NVIDIA 1060GTX", "NVIDIA 3070", "AMD RX 580", "AMD RX 6900"],
    ssd: ["EVO 512GB", "Crucial 1TB", "Samsung 980 500GB", "ADATA 1TB"],
    hdd: ["WD 2TB", "Seagate 4TB", "Toshiba 1TB", "WD 6TB"],
  };

  // 부품을 선택했을 때 처리하는 함수
  const handleSelectPart = (partCategory, part) => {
    setSelectedParts({
      ...selectedParts,
      [partCategory]: part,
    });
    setIsPartSelected(true);
  };

  // 장바구니에 선택된 모든 부품을 추가하는 함수
  const addToCart = () => {
    if (
      Object.keys(selectedParts).length === Object.keys(partsOptions).length
    ) {
      setCart((prevCart) => [...prevCart, selectedParts]); // 모든 부품을 장바구니에 추가
      alert("선택된 부품들이 장바구니에 추가되었습니다!");
    } else {
      alert("모든 부품을 선택해 주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>개인 커스텀PC</h1>

      <div style={styles.partsList}>
        {Object.keys(partsOptions).map((partCategory) => (
          <div key={partCategory} style={styles.partCategory}>
            <h3>{partCategory.toUpperCase()}</h3>
            <div style={styles.optionList}>
              {partsOptions[partCategory].map((part, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPart(partCategory, part)}
                  style={styles.optionButton}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 부품 리스트 */}
      {isPartSelected && (
        <div style={styles.selectedParts}>
          <h3>선택된 부품</h3>
          <ul>
            {Object.keys(selectedParts).map((category) => (
              <li key={category}>
                <strong>{category.toUpperCase()}:</strong>{" "}
                {selectedParts[category]}
              </li>
            ))}
          </ul>
          <button onClick={addToCart} style={styles.cartButton}>
            장바구니에 추가
          </button>
        </div>
      )}

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
                      <strong>{category.toUpperCase()}:</strong> {pc[category]}
                    </li>
                  ))}
                </ul>
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
  partsList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  partCategory: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
  },
  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  optionButton: {
    padding: "8px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "5px",
    textAlign: "center",
  },
  selectedParts: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#e9e9e9",
  },
  cartButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cart: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};

export default OwnPCCustomizing;
