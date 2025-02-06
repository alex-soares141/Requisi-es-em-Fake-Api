
import Home from './components/home/home'
import Modal from './components/modal/modal'

function App() {


  return (
    <>
      <Home />
      <Modal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.')
      } } selectedPost={undefined} />

    </>
  )
}

export default App
