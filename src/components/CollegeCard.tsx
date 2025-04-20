import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface CollegeProps{
  IconComponent: any;
  title: string;
  description: string;
  link: string;
}

const CollegeCard = ({IconComponent, title, description, link}:CollegeProps) => {
  return (
    <Link href={link}>
      <div className="shadow-custom dark:bg-bg2 rounded-lg p-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-bg2 dark:bg-zinc-800 border border-border rounded-lg group-hover:bg-gray-700 transition-colors">
              <IconComponent className={`w-6 h-6`} />
            </div>
            <div>
              <h3 className="md:text-xl font-semibold sm:text-2xl text-foreground mb-1">
                {title}
              </h3>
              <p className="text-muted text-sm">{description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted transform group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}

export default CollegeCard