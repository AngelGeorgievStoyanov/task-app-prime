import { createBrowserRouter, LoaderFunctionArgs, Outlet, RouterProvider } from 'react-router-dom';
import CreateTask from './components/CreateTask/CreateTask';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ErrorBoundary from './utils/ErrorBoundary';
import * as taskService from './services/taskService'
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskEdit from './components/TaskEdit/TaskEdit';
import Employees from './components/Employees/Empoyees';
import EmployeesTop from './components/EmployeesTop/EmployeesTop';
import * as userService from './services/userService';
import EmployeeCreate from './components/EmployeeCreate/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit/EmployeeEdit';
import './App.css'
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import GuardedRouteManager from './components/GuardedRouteManager/GuardedRouteManager';

export async function taskLoader() {

  const tasks = await taskService.getAllTask()

  return tasks;

}


export async function taskLoaderById({ params }: LoaderFunctionArgs) {

  if (params.taskId) {
    try {
      const task = await taskService.findTaskById(params.taskId);
      if (task) {
        return task
      }
    } catch (err: any) {

      throw new Error(`${err.message}`)
    }
  } else {
    throw new Error(`Invalid or missing trip ID`);
  }
}

export async function employeeLoader() {

  const employees = await userService.getAllEmployees()

  return employees;

}

export async function employeeLoaderTop() {

  const employees = await userService.getAllEmployeesTop()

  return employees;

}


export async function userLoaderById({ params }: LoaderFunctionArgs) {

  if (params.userId) {
    try {
      const user = await userService.findUserById(params.userId);
      if (user) {
        return user
      }
    } catch (err: any) {

      throw new Error(`${err.message}`)
    }
  } else {
    throw new Error(`Invalid or missing employee ID`);
  }
}

const Layout = () => (
  <>
    <Header />

    <Outlet />

    <Footer />

  </>
)



const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: <GuardedRoute />,
        children: [
          {
            path: '',
            loader: taskLoader,
            element: <Home />
          }
        ]
      },
      {
        path: '/task/create',
        element: <GuardedRouteManager />,
        children: [
          {
            path: '',
            element: <CreateTask />
          }
        ]
      },
      {
        path: '/task/details/:taskId',
        element: <GuardedRoute />,
        children: [
          {
            path: '',
            loader: taskLoaderById,
            element: <TaskDetails />
          }
        ]
      },
      {
        path: '/task/edit/:taskId',
        element: <GuardedRouteManager />,
        children: [
          {
            path: '',
            loader: taskLoaderById,
            element: <TaskEdit />
          }
        ]
      },
      {
        path: '/users',
        element: <GuardedRouteManager />,
        children: [
          {
            path: '',
            loader: employeeLoader,
            element: <Employees />
          }
        ]
      },
      {
        path: '/top',
        element: <GuardedRouteManager />,
        children: [
          {
            path: '',
            loader: employeeLoaderTop,
            element: <EmployeesTop />
          }
        ]
      },
      {
        path: '/user/create',
        element: <GuardedRouteManager />,
        children: [
          {
            path: '',
            element: <EmployeeCreate />
          }
        ]
      },
      {
        path: '/user/edit/:userId',
        element: <GuardedRoute />,
        children: [
          {
            path: '',
            loader: userLoaderById,
            element: <EmployeeEdit />
          }
        ]
      },
      {
        path: '/profile/:userId',
        element: <GuardedRoute />,
        children: [
          {
            path: '',
            loader: userLoaderById,
            element: <Profile />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }


])

function App() {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />

      </ErrorBoundary>
    </>
  );
}

export default App;
