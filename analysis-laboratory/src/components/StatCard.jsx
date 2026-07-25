function StatCard({
  title,
  value,
  info,
  icon,
  color,
}) {
  return (
    <div className="
      bg-white dark:bg-gray-800
      rounded-2xl
      border border-gray-200 dark:border-gray-700
      p-5
      hover:shadow-md
      transition-all duration-300
    ">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="
            text-2xl
            font-bold
            text-gray-900 dark:text-white
            mt-2
          ">
            {value}
          </h2>
        </div>


        <div
          className={`
          w-11 h-11
          rounded-xl
          flex items-center justify-center
          text-xl
          ${color}
          `}
        >
          {icon}
        </div>

      </div>


      {info && (
        <div className="mt-4">
          <span className="
            inline-flex items-center
            text-xs
            font-semibold
            text-green-600
            bg-green-100
            px-2 py-1
            rounded-full
          ">
            {info}
          </span>
        </div>
      )}

    </div>
  );
}

export default StatCard;