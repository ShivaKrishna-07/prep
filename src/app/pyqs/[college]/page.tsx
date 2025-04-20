import Header from "@/components/files/Header";
import YearCard from "@/components/YearCard";
import { years } from "@/data/branch";
import { icons } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Header heading={"Select your Academic Year"} />
        <div className="flex flex-col gap-5">
          {years.map((year) => {
            const IconComponent = icons[year.icon as keyof typeof icons];
            return (
              <YearCard
                key={year.year}
                IconComponent={IconComponent}
                year={year.year}
                link={year.link}
                title={year.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default page 