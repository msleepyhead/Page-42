
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Post } from '../types';

const PostBubble: React.FC<{ post: Post, isCurrentUser: boolean }> = ({ post, isCurrentUser }) => {
    const { users } = useData();
    const author = users.find(u => u.id === post.authorId);

    return (
        <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            {!isCurrentUser && (
                <img src={author?.profilePhoto} alt={author?.name} className="w-8 h-8 rounded-full"/>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-primary text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'}`}>
                {!isCurrentUser && <p className="text-xs font-semibold text-primary dark:text-accent mb-1">{author?.name}</p>}
                <p className="text-sm">{post.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        </div>
    );
};


const DiscussionPage = () => {
    const { posts } = useData();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            // In a real app, this would send the message to Firestore
            console.log('Sending:', newMessage);
            alert('Sending message (mock)...');
            setNewMessage('');
        }
    };

  return (
    <div className="p-4 h-full flex flex-col">
       <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">Discussion</h1>
        <p className="text-gray-500 dark:text-gray-400">Ask questions and share updates.</p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {posts.map(post => (
              <PostBubble key={post.id} post={post} isCurrentUser={post.authorId === user?.id} />
          ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-4 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center gap-2">
        <input 
            type="text" 
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent focus:outline-none px-2 py-1"
        />
        <button type="submit" className="bg-primary dark:bg-accent text-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </form>
    </div>
  );
};

export default DiscussionPage;
