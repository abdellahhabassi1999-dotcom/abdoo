import { Clock, CheckCircle, Award } from "lucide-react";
import { Certification } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card hover className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={certification.image}
          alt={certification.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute right-4 top-4">
          <Badge variant="primary">{certification.level}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {certification.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-gray-600 dark:text-gray-300">
          {certification.description}
        </p>

        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary-600" />
            <span>{certification.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Award className="h-4 w-4 flex-shrink-0 text-secondary-600" />
            <span>{certification.requiredCourses.length} required courses</span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            Key Benefits:
          </div>
          <ul className="space-y-2">
            {certification.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-600" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Button variant="primary" size="sm" fullWidth>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
