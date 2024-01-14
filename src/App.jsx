import { useState } from 'react'
import './App.css'
import styles from './app.module.css';

import { Form } from './components/Form'
import { ReactHookForm } from './components/ReactHookForm'
function App() {
	const [form, setForm] = useState(true)

	const getReactHookForm = ()=>{
		setForm(false)
	}

	const getBasicForm = ()=>{
		setForm(true)
	}

  return (

    <main>
		<nav>
			<p onClick={getReactHookForm} className={form ? null : styles.border}>React Hook Form</p>
			<p onClick={getBasicForm} className={form ? styles.border : null}>Basic Form</p>
		</nav>
		<div>
			{form ? <Form /> : <ReactHookForm /> }
		</div>

    </main>
  )
}

export default App
