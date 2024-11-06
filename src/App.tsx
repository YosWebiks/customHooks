import UserList from './components/UserList';
import UserListUgly from './components/UserListUgly';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Random Users Directory</h1>
      </header>
      <main>
        {/* <UserList /> */}
        <UserListUgly />
      </main>
    </div>
  );
}

export default App;