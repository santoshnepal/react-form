import { FormComponent } from './components/index'
const valueSaver = <T,>(data: T): {} => {
  console.log(data)
  return {}
}
function App() {
  return (
    <>
      <FormComponent callback={valueSaver} />
    </>
  )
}

export default App
