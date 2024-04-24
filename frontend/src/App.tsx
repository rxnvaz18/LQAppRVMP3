import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NovelsPage from "./pages/NovelsPage"
import NotFoundPage from "./pages/NotFoundPage"
import PrivacyPage from "./pages/PrivacyPage"
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'
import SignUpModal from './components/SignUpModal'
import { User } from './models/user'
import * as NovelsApi from "./network/novels_api"
import 'bootstrap/dist/css/bootstrap.min.css' // Assuming you're using Bootstrap for styling
import { Navbar, Nav, Col, Container, Row } from 'react-bootstrap'
import './styles/utils.module.css';
import BookSearch from "./components/BookSearch"
import BookshelfDisplay from "./components/BookShelf"
import StartPage from "./components/LandingPage"


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

	const [showSignUpModal, setShowSignUpModal] = useState(false)
	const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await NovelsApi.getLoggedInUser()
				setLoggedInUser(user)
			} catch (error) {
				console.error(error)
			}
		}
		fetchLoggedInUser()
	}, [])

	return (
		<BrowserRouter>
			<div>
				<NavBar 
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onSignUpClicked={() => setShowSignUpModal(true)}
					onLogoutSuccessful={() => setLoggedInUser(null)}
				/>
				<Container>
					<Routes>
					<Route
							path='/'
							element={<StartPage />}
						/>
						<Route
							path='/reviews'
							element={<NovelsPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/search'
							element={<BookSearch />}
						/>
						<Route
							path='/bookshelf'
							element={<BookshelfDisplay />}
						/>
						<Route
							path='/privacy'
							element={<PrivacyPage />}
						/>
						<Route
							path='/*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</Container>
				{showSignUpModal &&
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccessful={(user) => {
							setLoggedInUser(user)
							setShowSignUpModal(false)
						}}
					/>
				}
				{showLoginModal &&
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onLoginSuccessful={(user) => {
							setLoggedInUser(user)
							setShowLoginModal(false)
						}}
					/>
				}
			</div>
		</BrowserRouter>
	)
}

export default App
