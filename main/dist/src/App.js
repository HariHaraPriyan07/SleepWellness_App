"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const ThemeContext_1 = require("./contexts/ThemeContext");
const ThemeToggle_1 = require("./components/ThemeToggle");
const Home_1 = require("./pages/Home");
const QuizPage_1 = require("./pages/QuizPage");
const ResultPage_1 = require("./pages/ResultPage");
function App() {
    return (<ThemeContext_1.ThemeProvider>
      <react_router_dom_1.BrowserRouter>
        <div className="min-h-screen">
          <ThemeToggle_1.default />
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
            <react_router_dom_1.Route path="/quiz" element={<QuizPage_1.default />}/>
            <react_router_dom_1.Route path="/result" element={<ResultPage_1.default />}/>
          </react_router_dom_1.Routes>
        </div>
      </react_router_dom_1.BrowserRouter>
    </ThemeContext_1.ThemeProvider>);
}
exports.default = App;
//# sourceMappingURL=App.js.map