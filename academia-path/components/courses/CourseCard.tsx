import { Clock, Users, Star } from "lucide-react";
import { Course } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card hover className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute right-4 top-4">
          <Badge variant="primary">{course.level}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-secondary-600 dark:text-secondary-400">
            {course.category}
          </span>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
            <span className="font-medium">{course.rating}</span>
            <span>({course.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{course.title}</h3>

        <p className="mt-2 line-clamp-3 flex-1 text-gray-600 dark:text-gray-300">
          {course.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Instructor:</span>
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrolledCount.toLocaleString()} enrolled</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${course.price}
            </div>
          </div>
          <Button variant="primary" size="sm">
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
