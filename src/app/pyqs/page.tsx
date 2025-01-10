import CollegeCard from '@/components/CollegeCard';
import Header from '@/components/files/Header';
import { colleges } from '@/data/branch';
import { icons } from 'lucide-react';

const page = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Header heading={"Select your College"} />
        <div className="flex flex-col gap-5">
          {colleges.map((college) => {
            const IconComponent = icons[college.icon as keyof typeof icons];
            return (
              <CollegeCard
                key={college.link}
                IconComponent={IconComponent}
                description={college.description}
                link={college.link}
                title={college.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default page