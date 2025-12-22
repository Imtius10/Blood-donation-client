const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="relative">
              
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>

                
                <div className="relative bg-red-600 h-16 w-16 rounded-full rounded-tr-none rotate-45 animate-bounce flex items-center justify-center shadow-2xl border-4 border-white">
                   
                    <div className="absolute top-2 left-2 w-3 h-5 bg-white opacity-30 rounded-full -rotate-45"></div>
                </div>
            </div>

            
            <div className="mt-8 text-center">
                <h2 className="text-xl font-black text-gray-800 tracking-widest uppercase">
                    Blood<span className="text-red-600">Share</span>
                </h2>
                <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="h-1 w-1 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-1 w-1 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-1 w-1 bg-red-600 rounded-full animate-bounce"></div>
                </div>
                <p className="text-gray-400 text-xs font-medium mt-2 tracking-widest uppercase">
                    Connecting Life
                </p>
            </div>
        </div>
    );
};

export default Loading;