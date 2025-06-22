function App() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Coming soon! For now, email admin@bigbraintime.tv');
  };

  return (
    <div className="App">
      <h1>BIGBRAINTIME</h1>
      <h2>Launching August 1, 2024</h2>
      <p>Learning in public. New skill every 30 days.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Get notified at launch" />
        <button type="submit">Notify Me</button>
      </form>
    </div>
  );
}

export default App;