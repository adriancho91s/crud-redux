import './App.css'
import ListOfUsers from './components/ListOfUsers';
import { CreateNewUser } from './components/CreateNewUser';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
    <Toaster position="top-right" />
    <ListOfUsers />
    <CreateNewUser />
    </>
    
  )
}

export default App
