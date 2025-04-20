
function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-screen-xl pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-4">
          <div className="text-center lg:text-left">
            <div className="flex h-10 items-center justify-center lg:justify-start text-foreground rounded-lg font-extrabold text-2xl">
              Prep <span className="text-foreground">.</span>
            </div>
            <p className="mt-4 text-center text-muted lg:text-left lg:text-lg">
              Prep is a one-stop platform for all your exam preparation needs –
              notes, syllabus, PYQs, and results in one place.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-8 text-center lg:text-centerlg:text-left">
          <p className="text-muted mx-auto lg:mx-0">
            © Prep {getCurrentYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
