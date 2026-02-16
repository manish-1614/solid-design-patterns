import SolidPrinciples from "@/components/SolidPrinciples";
import DesignPatterns from "@/components/DesignPatterns";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen max-w-[100vw] mx-auto flex flex-col gap-4 justify-center items-center bg-linear-to-br from-zinc-50 via-white to-zinc-400 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="w-11/12 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 max-w-[100vw]">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12 md:mb-16 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-50 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
            Software Design Mastery
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto px-2 sm:px-4">
            Master the fundamental principles and patterns of object-oriented design
          </p>
        </header>

        {/* SOLID Principles Section */}
        <section className="mb-12 sm:mb-16 md:mb-20 w-full">
          <SolidPrinciples />
          <br />
          
        </section>

        {/* Design Patterns Section */}
        <section className="mb-12 sm:mb-16 md:mb-20 w-full">
          <DesignPatterns />
        </section>

        {/* Interview Questions Link */}
        <section className="mb-12 sm:mb-16 md:mb-20 w-full">
          <div className="text-center">
            <Link 
              href="/interviews"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 text-base sm:text-lg md:text-xl"
            >
              Interview Questions →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
