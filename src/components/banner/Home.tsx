import { Motion } from "@/components/framer-motion";
import Link from "next/link";
import images from "@/data/homepage-image.json";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative bg-background text-foreground sm:pb-0 select-none overflow-hidden">
      <div className="pt-16 sm:pt-10 sm:pb-0 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <section className="sm:max-w-[19.5rem] md:max-w-[24.5rem] tab:max-w-[28rem] lg:max-w-[30rem] text-center md:text-left">
            <Motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 110,
                delay: 0,
              }}
              className="text-3xl font-bold sm:text-[5vw] md:text-5xl lg:leading-[5.5rem] lg:text-[5rem] text-foreground"
            >
              Explore. Learn. Ace.
            </Motion.div>

            <Motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.1,
              }}
              className="mt-4 text-xl text-muted tracking-wide "
            >
              Your one-stop portal for academic resources
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                delay: 0.2,
              }}
              className="mt-14 my-3"
            >
              <Link
                href="#learn"
                className="p-3 rounded-md border border-border bg-background text-muted hover:bg-foreground hover:text-background ease-in duration-200"
                type="button"
                aria-label="link to projects section"
              >
                Start Learning
              </Link>
            </Motion.div>
          </section>
          {/* Images */}
          <div className="hidden md:block py-8 xsm:px-0 md:px-4 absolute transform left-2 xs:left-1/4 xsm:-translate-x-1/5 xs:-translate-x-1/4 sm:left-1/2 sm:top-0 sm:translate-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8 ">
            <div className="flex justify-center flex-grow items-center space-x-6 lg:space-x-8">
              <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                {images.slice(0, 2).map((image, index) => (
                  <Motion.div
                    initial={{ opacity: 0, y: -640 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 110,
                      delay: Math.random(),
                    }}
                    key={index}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </Motion.div>
                ))}
              </div>
              <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-5">
                {images.slice(2, 5).map((image, index) => (
                  <Motion.div
                    initial={{ opacity: 0, y: -640 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 110,
                      delay: Math.random(),
                    }}
                    key={index}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg "
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center "
                      width={500}
                      height={500}
                    />
                  </Motion.div>
                ))}
              </div>
              <div className="hidden xl:grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                {images.slice(5).map((image, i) => (
                  <Motion.div
                    initial={{ opacity: 0, y: -640 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 110,
                      delay: Math.random(),
                    }}
                    key={i}
                    className="floating-image h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  </Motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
