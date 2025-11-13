import ListCard from './components/organisms/listCard/listCard';

function App() {
  return <>
    <header>
      <h1>List of Ads</h1>
    </header>
    <main>
      <div className="container">
        <ListCard />
      </div>
    </main>
    <footer>
      <p>Footer</p>
    </footer>
  </>
}

export default App;
