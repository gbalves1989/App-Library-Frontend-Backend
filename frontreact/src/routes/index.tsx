import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { AuthorProvider } from '../contexts/author/AuthorProvider'
import { PublisherProvider } from '../contexts/publisher/PublisherProvider'
import { BookProvider } from '../contexts/book/BookProvider'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Dashboard } from '../pages/Dashboard'
import { Profile } from '../pages/Profile'
import { Author } from '../pages/Authors'
import { AuthorCreate } from '../pages/Authors/Create'
import { AuthorEdit } from '../pages/Authors/Edit'
import { Publisher } from '../pages/Publishers'
import { PublisherCreate } from '../pages/Publishers/Create'
import { PublisherEdit } from '../pages/Publishers/Edit'
import { Book } from '../pages/Book'
import { BookCreate } from '../pages/Book/Create'
import { BookEdit } from '../pages/Book/Edit'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/authors"
        element={
          <PrivateRoute>
            <AuthorProvider>
              <Author />
            </AuthorProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/authors/create"
        element={
          <PrivateRoute>
            <AuthorProvider>
              <AuthorCreate />
            </AuthorProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/authors/edit/:id"
        element={
          <PrivateRoute>
            <AuthorProvider>
              <AuthorEdit />
            </AuthorProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/publishers"
        element={
          <PrivateRoute>
            <PublisherProvider>
              <Publisher />
            </PublisherProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/publishers/create"
        element={
          <PrivateRoute>
            <PublisherProvider>
              <PublisherCreate />
            </PublisherProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/publishers/edit/:id"
        element={
          <PrivateRoute>
            <PublisherProvider>
              <PublisherEdit />
            </PublisherProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/books"
        element={
          <PrivateRoute>
            <BookProvider>
              <Book />
            </BookProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <PrivateRoute>
            <BookProvider>
              <BookCreate />
            </BookProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/books/edit/:id"
        element={
          <PrivateRoute>
            <BookProvider>
              <BookEdit />
            </BookProvider>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
