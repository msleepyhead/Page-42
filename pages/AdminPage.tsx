import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { User, Role, Resource, ResourceType } from '../types';
import Modal from '../components/Modal';

const ManageUsers = () => {
    const { users, addUser } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: Role.MEMBER });

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        addUser({
            name: newUser.name,
            email: newUser.email,
            passwordHash: `hashed_${newUser.password}`, // Mock hashing
            role: newUser.role,
        });
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', password: '', role: Role.MEMBER });
        alert('User added successfully (mock)!');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary dark:bg-accent text-white px-4 py-2 rounded-lg font-medium">Add User</button>
            </div>
            <div className="space-y-2">
                {users.map(user => (
                    <div key={user.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                        <span className="text-xs font-semibold capitalize bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">{user.role}</span>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <form onSubmit={handleAddUser} className="space-y-4">
                    <input type="text" placeholder="Full Name" value={newUser.name} onChange={e => setNewUser(p => ({...p, name: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser(p => ({...p, email: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser(p => ({...p, password: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    <select value={newUser.role} onChange={e => setNewUser(p => ({...p, role: e.target.value as Role}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                        <option value={Role.MEMBER}>Member</option>
                        <option value={Role.ADMIN}>Admin</option>
                    </select>
                    <button type="submit" className="w-full bg-primary dark:bg-accent text-white py-2 rounded-lg">Save User</button>
                </form>
            </Modal>
        </div>
    );
};

const ManageResources = () => {
    const { resources, subjects, addResource } = useData();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newResource, setNewResource] = useState({
        title: '',
        description: '',
        subjectId: subjects[0]?.id || '',
        type: ResourceType.LECTURE
    });

    const handleAddResource = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        addResource({
            ...newResource,
            uploadedBy: user.id,
            fileUrl: '/sample.pdf', // Mock file URL
        });
        setIsModalOpen(false);
        setNewResource({ title: '', description: '', subjectId: subjects[0]?.id || '', type: ResourceType.LECTURE });
        alert('Resource added successfully (mock)!');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Resources</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary dark:bg-accent text-white px-4 py-2 rounded-lg font-medium">Upload New</button>
            </div>
            <div className="space-y-2">
                {resources.map(res => (
                     <div key={res.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <p className="font-medium">{res.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{res.type}</p>
                     </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload New Resource">
                <form onSubmit={handleAddResource} className="space-y-4">
                    <input type="text" placeholder="Resource Title" value={newResource.title} onChange={e => setNewResource(p => ({...p, title: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                    <textarea placeholder="Description (optional)" value={newResource.description} onChange={e => setNewResource(p => ({...p, description: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <select value={newResource.subjectId} onChange={e => setNewResource(p => ({...p, subjectId: e.target.value}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <select value={newResource.type} onChange={e => setNewResource(p => ({...p, type: e.target.value as ResourceType}))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                        {Object.values(ResourceType).map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-accent/20 dark:file:text-accent dark:hover:file:bg-accent/30" />
                        <p className="text-xs text-gray-400 mt-1">File upload is for demonstration only.</p>
                    </div>
                    <button type="submit" className="w-full bg-primary dark:bg-accent text-white py-2 rounded-lg">Save Resource</button>
                </form>
            </Modal>
        </div>
    );
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'resources'>('users');

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">Admin Panel</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage application data.</p>
      </header>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-primary dark:border-accent text-primary dark:text-accent' : 'text-gray-500'}`}>
          Manage Users
        </button>
        <button onClick={() => setActiveTab('resources')} className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'border-b-2 border-primary dark:border-accent text-primary dark:text-accent' : 'text-gray-500'}`}>
          Manage Resources
        </button>
      </div>

      <div>
        {activeTab === 'users' && <ManageUsers />}
        {activeTab === 'resources' && <ManageResources />}
      </div>
    </div>
  );
};

export default AdminPage;