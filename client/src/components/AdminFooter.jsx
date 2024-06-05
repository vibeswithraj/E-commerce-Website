const AdminFooter = () => {
  return (
    <div className="w-full h-16 px-5 border-none flex justify-between items-center border-t border-gray-400 outline-none">
      <p>© 2023 - pulstron Dashboard</p>
      <ul className="flex gap-6 text-base font-semibold">
        <li><a className="hover:opacity-80" href="/">About</a></li>
        <li><a className="hover:opacity-80" href="/">Careers</a></li>
        <li><a className="hover:opacity-80" href="/">Policy</a></li>
        <li><a className="hover:opacity-80" href="/">Contact</a></li>
      </ul>
    </div>
  )
}

export default AdminFooter
