import { AppProvider } from "../src/components";
import "../src/styles/common.css";

// eslint-disable-next-line react/prop-types
const FrameComponent = ({ children }) => (
  <AppProvider embedded={false}>{children}</AppProvider>
);

export default FrameComponent;
