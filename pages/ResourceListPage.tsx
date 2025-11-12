import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Resource, ResourceType } from '../types';
import { Search, FileText, Presentation, Lightbulb, Notebook, Video, Download, Eye } from '../components/icons';
import Modal from '../components/Modal';

const getResourceTypeIcon = (type: ResourceType) => {
  const props = { className: "w-6 h-6" };
  switch (type) {
    case ResourceType.LECTURE: return <FileText {...props} />;
    case ResourceType.SLIDE: return <Presentation {...props} />;
    case ResourceType.SUGGESTION: return <Lightbulb {...props} />;
    case ResourceType.NOTE: return <Notebook {...props} />;
    case ResourceType.VIDEO: return <Video {...props} />;
    default: return <FileText {...props} />;
  }
};

const ResourceCard: React.FC<{ resource: Resource, onView: () => void }> = ({ resource, onView }) => {
  const { users } = useData();
  const uploader = users.find(u => u.id === resource.uploadedBy);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md transition-shadow duration-200 flex flex-col space-y-3">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-primary dark:text-accent">
                    {getResourceTypeIcon(resource.type)}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{resource.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type}</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 flex-shrink-0">{new Date(resource.uploadedAt).toLocaleDateString()}</p>
        </div>
        {resource.description && <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
             <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded by {uploader?.name || 'Unknown'}</p>
             <div className="flex space-x-2">
                <button onClick={() => alert('Downloading...')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition">
                    <Download className="w-5 h-5"/>
                </button>
                <button onClick={onView} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition">
                    <Eye className="w-5 h-5"/>
                </button>
             </div>
        </div>
    </div>
  );
};

const ResourceListPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { subjects, resources, addResourceToCache } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ResourceType | 'All'>('All');
  const [viewingFile, setViewingFile] = useState<string | null>(null);

  const subject = subjects.find(s => s.id === subjectId);

  const filteredResources = useMemo(() => {
    return resources
      .filter(r => r.subjectId === subjectId)
      .filter(r => filterType === 'All' || r.type === filterType)
      .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [resources, subjectId, filterType, searchTerm]);

  const handleViewResource = (resource: Resource) => {
    addResourceToCache(resource);
    setViewingFile(resource.fileUrl);
  };

  if (!subject) {
    return <div className="p-4 text-center">Subject not found. <Link to="/subjects" className="text-primary">Go back</Link></div>;
  }

  return (
    <div className="p-4">
      <header className="mb-6">
        <Link to="/subjects" className="text-sm text-primary dark:text-accent mb-2 block">&larr; Back to Subjects</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">{subject.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">All available resources.</p>
      </header>
      
      <div className="sticky top-0 bg-bkg dark:bg-bkg-dark py-2 z-10">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {(['All', ...Object.values(ResourceType)] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition whitespace-nowrap ${filterType === type ? 'bg-primary text-white dark:bg-accent' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 mt-4">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} onView={() => handleViewResource(resource)} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No resources found.</p>
        )}
      </div>

      <Modal isOpen={!!viewingFile} onClose={() => setViewingFile(null)} title="File Viewer">
        {viewingFile && (
          <div className="w-full h-[70vh]">
             {/* In a real app, you'd use a proper PDF/Video viewer. For this demo, an iframe is sufficient. */}
            <iframe src={viewingFile} width="100%" height="100%" title="File viewer" allow="autoplay"></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResourceListPage;