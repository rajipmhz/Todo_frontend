const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">

      <div className="bg-blue-600  py-16 px-6 text-center md:text-left md:px-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          About Todo App
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0">
          Manage your daily tasks efficiently. Add tasks, subtasks, set start/end times, track your productivity, and never miss a thing!
        </p>
      </div>

      <div className="px-6 md:px-20 py-12 grid gap-12 md:grid-cols-3">

        <div className="bg-white  rounded-xl shadow p-6 flex flex-col items-center text-center md:text-left md:items-start">
          <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl font-bold">
            📝
          </div>
          <h2 className="font-bold text-xl mb-2">Organize Tasks</h2>
          <p className="text-gray-600  text-sm">
            Keep all your tasks and subtasks in one place. Organize them by category and day.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center md:text-left md:items-start">
          <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl font-bold">
            ⏰
          </div>
          <h2 className="font-bold text-xl mb-2">Track Time</h2>
          <p className="text-gray-600  text-sm">
            Set start and end times for each task. Know exactly when to start and finish.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center md:text-left md:items-start">
          <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl font-bold">
            ✅
          </div>
          <h2 className="font-bold text-xl mb-2">Track Progress</h2>
          <p className="text-gray-600  text-sm">
            Mark tasks as completed, track subtasks, and measure your daily productivity easily.
          </p>
        </div>
      </div>

      <div className="bg-gray-100  py-12 px-6 md:px-20 text-center rounded-t-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start Organizing Your Life Today!
        </h2>
        <p className="text-gray-700  mb-6 max-w-xl mx-auto">
          Todo App is designed to help you stay on top of your tasks and manage your day efficiently. Get started now!
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
