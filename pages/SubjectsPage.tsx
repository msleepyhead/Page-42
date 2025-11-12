import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Subject, Resource } from '../types';
import { BookOpen, FileText } from '../components/icons';

const CachedResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
    const { subjects } = useData();
    const subject = subjects.find(s => s.id === resource.subjectId);

    return (
        <Link to={`/subjects/${resource.subjectId}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-green-600 dark:text-green-300"/>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{resource.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{subject?.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};


const SubjectCard: React.FC<{ subject: Subject }> = ({ subject }) => (
  <Link to={`/subjects/${subject.id}`} className="block transform transition-transform duration-200 hover:scale-105">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-primary dark:text-blue-300"/>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{subject.name}</h3>
        </div>
      </div>
    </div>
  </Link>
);


const SubjectsPage = () => {
  const { subjects, cachedResources } = useData();

  return (
    <div className="p-4">
      {cachedResources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 font-poppins">Offline Access</h2>
            <div className="space-y-2">
              {cachedResources.map(res => <CachedResourceItem key={`cache-${res.id}`} resource={res} />)}
            </div>
          </div>
      )}

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">Subjects</h1>
        <p className="text-gray-500 dark:text-gray-400">Select a subject to view resources.</p>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;