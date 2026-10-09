import "./App.css";
import useWindowWidth from "./useWindowWidth";

function App() {
  const width = useWindowWidth();

  return (
    <div className="App">
      <header className="App-header">
        <p>Ширина вікна: {width}px</p>
      </header>
    </div>
  );
}

export default App;

// З лекції:

// -----

// приклади як звернутись:

// const obj = {
//   name: "diana",
//   car: "toyota",
// };

// console.log(obj.name);

// const { name: firstName, car } = obj;

// console.log(firstName);
// console.log(car);

// -----

// const [list, setList] = useState([1, 2, 3, 4, 5]);

// const handleUseCallbackExample = useCallback(() => {
//   setList([...list, 6]);
// }, [])

// useEffect(() => {
//   handleUseCallbackExample; ()
//   console.log('render ')
// }, []);

// const handleClick = () => setList([])

// <button onClick={handleClick}>Click me</button>

// -----

// -----

// const [list, setList] = useState([1, 2, 3, 4, 5]);

// const memolizedList = useMemo(() => {
//   return list;
// }, [list]);

// const handleListChange = () => {
//   setList([...list, 6]);
// };

// console.log("render");

// {memolizedList.map((item, index) => <p key={index}>{item}</p>)}
// <button onClick={handleListChange}>Click me</button>;

// ------

// const inputRef = useRef();

// const handleFocus = () => {
//   inputRef.current.focus();
//   console.log(inputRef.current.value); // при зміні ref компонент не оновлюється !!
// };

// useEffect(() => {
//   console.log("componentDidMount useEffect");
// }, []);

// useEffect(() => {
//   console.log("componentDidUpdate useEffect");
// }, [value]);

// const handleClick = () => {
//   // setValue(value + 1);
//   setIsMounted(!isMounted);
// };

// {<input ref={inputRef} />;}
// {<button onClick={handleFocus}>Focus me</button>;}

// -----

// const [isShowTimer, setIsShowTimer] = useState(false); // бульове значення варто починати з "is...""
