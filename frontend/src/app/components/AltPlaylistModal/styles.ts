export const modalOverlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

export const modalContentStyles: React.CSSProperties = {
  position: "relative",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "20px",
  maxWidth: "500px",
  width: "100%",
};

export const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export const formContainerStyles: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

export const imageUploadContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "100px",
  border: "1px dashed #ddd",
  borderRadius: "8px",
  cursor: "pointer",
};

export const formStyles: React.CSSProperties = {
  flex: 1,
};

export const inputContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginBottom: "15px",
};

export const inputLabelStyles: React.CSSProperties = {
  fontWeight: "bold",
};

export const inputStyles: React.CSSProperties = {
  padding: "10px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ddd",
};

export const textAreaStyles: React.CSSProperties = {
  padding: "10px",
  width: "100%",
  height: "80px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  resize: "none",
};

export const buttonContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
};

export const buttonStyles: React.CSSProperties = {
  backgroundColor: "#bbd8e2",
  color: "#000000",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  cursor: "pointer",
};
