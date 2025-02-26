export default function Overlay({ children }) {
  return <div style={overlayStyle}>{children}</div>;
}

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 40,
};
