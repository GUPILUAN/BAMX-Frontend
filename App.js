import Navigation from "./navigation";
import { NativeWindStyleSheet } from "nativewind";

export default function App() {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return <Navigation />;
}
