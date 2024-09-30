import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./features/user/userSlice";
const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.chatId);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(fetchUserInfo(user?.uid));
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
