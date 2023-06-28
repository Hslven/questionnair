import { useNavigate } from 'react-router-dom'

const List = () => {
  const nav = useNavigate()
  function back() {
    nav(-1)
  }
  return (
    <>
      <h1>
        List
      </h1>
      <button onClick={back}>-1</button>
    </>
  )
}
export default List