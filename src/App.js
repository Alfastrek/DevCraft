import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Editorpage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              theme: {
                primary: "00aaff",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<Editorpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
