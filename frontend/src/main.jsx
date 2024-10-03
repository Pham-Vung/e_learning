import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx';

export const server = "http://localhost:5000";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* UserContextProvider bao bên ngoài App để cung cấp và
     chia sẻ dữ liệu user, giúp dễ dàng quản lý
      trạng thái user mà không cần truyền props qua 
      nhiều lớp. */}
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
