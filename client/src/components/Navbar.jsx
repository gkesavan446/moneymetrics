import { useAuth } from "../context/AuthContext.jsx";


function Navbar(){
    const {user} = useAuth();

    return (
       <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-emerald-700">
            Money Metrics
        </h1>
        <div className="text-sm">
            Welcome, {user?.name}
        </div>
    </header>
    );
}

export default Navbar;