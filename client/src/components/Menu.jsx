export default function Menu() {
  return (
    <div
      className="w-[100vw] sm:w-[16vw] bg-gray-200 h-screen left-0  absolute p-3
    border-r border-gray-600 flex pl-8"
    >
      <ul className="pt-3 space-y-5">
        <li className="hover:text-gray-600 cursor-pointer">Quran</li>
        <li className="hover:text-gray-600 cursor-pointer">Hadith</li>
        <li className="hover:text-gray-600 cursor-pointer">Seerah</li>
        <li className="hover:text-gray-600 cursor-pointer">Lectures</li>
        <li className="hover:text-gray-600 cursor-pointer">Today in Islam</li>
      </ul>
    </div>
  );
}
