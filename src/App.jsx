import MessageInput from "./My chat/MessageInput";

const App = () => {
  return (
    <div className="App">
      <h1 style={{
        textAlign:'center',
        color:'violet',
        fontFamily:'sans-serif'
      }}>Telegram Bot Message Sender</h1>
      <MessageInput/>
    </div>
  );
}

export default App;
