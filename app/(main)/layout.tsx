const MainLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <div className="h-full w-[72px] z-30 flex-col fixed inset-y-0 hidden md:flex">

      </div>
      <main className="h-full md: pl-[72px]">
      {children}
      </main>
    </div>
  )
}

export default MainLayout