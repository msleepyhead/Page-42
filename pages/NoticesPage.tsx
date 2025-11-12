
import React from 'react';
import { useData } from '../context/DataContext';
import { Notice } from '../types';

const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => {
  const { users } = useData();
  const author = users.find(u => u.id === notice.authorId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{notice.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{notice.content}</p>
      <div className="text-xs text-gray-400 flex justify-between items-center">
        <span>By {author?.name || 'Admin'}</span>
        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const NoticesPage = () => {
  const { notices } = useData();

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">Notices</h1>
        <p className="text-gray-500 dark:text-gray-400">Important announcements and updates.</p>
      </header>
      <div className="space-y-4">
        {notices.length > 0 ? (
          notices
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(notice => <NoticeCard key={notice.id} notice={notice} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No notices yet.</p>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
