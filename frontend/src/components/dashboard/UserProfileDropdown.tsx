import { useState, useRef, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { User, BookOpen, Settings, LogOut ,Pencil } from "lucide-react";
import { AuthService } from "../../services/auth";

export function UserProfileDropdown({
  currentVideoInfo,
  handleVideoProgress,
}: {
  currentVideoInfo: any;
  handleVideoProgress: (progress: number, timeStamp: number) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

<<<<<<< Updated upstream
  const user = JSON.parse(localStorage.getItem('user') || '{}');
=======
  const handleOpen = () => {
    console.log(pathname)
    if(pathname.startsWith('/course')){
      const percent = currentVideoInfo.currentTime / currentVideoInfo.duration;
      handleVideoProgress(percent, currentVideoInfo.currentTime);
  
      console.log("Back e gesi", percent, currentVideoInfo.currentTime);
    }
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
>>>>>>> Stashed changes

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <User className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
<<<<<<< Updated upstream
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
=======
>>>>>>> Stashed changes
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <button
<<<<<<< Updated upstream
              onClick={() => handleNavigation('/my-learning')}
=======
              onClick={() => handleNavigation("/my-learning")}
>>>>>>> Stashed changes
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              My Learning
            </button>
            <button
<<<<<<< Updated upstream
              onClick={() => handleNavigation('/settings')}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
=======
              onClick={() => handleNavigation('/inventory')}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Whiteboard Inventory
>>>>>>> Stashed changes
            </button>
            
          </div>

          <div className="py-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
