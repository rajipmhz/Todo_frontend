function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 px-6 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Welcome to <span className="text-yellow-300">Todo App</span>
          </h1>

          <p className="text-gray-200 text-base md:text-lg max-w-xl">
            Organize your daily tasks, manage subtasks, and boost your productivity
            with a clean and powerful task manager.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-xl font-semibold 
              hover:bg-yellow-300 transition duration-300 shadow-lg">
              Get Started
            </button>

            <button className="px-6 py-3 border border-white/40 text-white rounded-xl font-semibold 
              hover:bg-white/10 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

  
        <div className="flex justify-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 
            rounded-3xl p-6 shadow-2xl">
            <img
              src="/todo.webp"
              alt="Todo image"
              className="rounded-2xl h-[300px] md:h-[400px] lg:h-[450px] w-auto object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
