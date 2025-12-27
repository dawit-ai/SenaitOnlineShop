export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center text-gray-100">

      <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-6 text-center tracking-wide">
        መርጃ / መምሪያ ቪዲዮ
      </h1>

      <p className="text-gray-200 mb-6 text-center max-w-lg leading-relaxed">
        ይህ ድህረገፅ እንዴት እንደሚሰራ እና እንዴት እንደሚጥይቅ ለተጠቃሚዎቻችን እንዲቀርበዋቸው ቪዲዮ ነው።
      </p>

      {/* Tutorial Video */}
      <div className="w-full max-w-lg aspect-video mb-6 shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Tutorial Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-gray-300 text-center max-w-md leading-relaxed">
        የጥያቄዎች ከሆነ እባክዎ ከስልክ ቁጥር ወይም መርጃ ገጽ ይገናኙ።
      </p>

    </div>
  );
}
