
import React from 'react';
import { MoreHorizontalIcon, LayoutGridIcon, ListIcon, ChevronDownIcon } from './icons/UiIcons';

interface ProjectListProps {
  activeFilter: string;
}

const projects = [
  { id: 1, title: 'Different UI & UX', template: 'AI Blog Writer', createdAt: 'Apr 10, 2023, 4:30pm', status: 'Active' },
  { id: 2, title: 'Dribbble shot', template: 'Social Media AI Caption', createdAt: 'Apr 9, 2023, 3:30pm', status: 'Draft' },
  { id: 3, title: 'Elux Marketing', template: 'Business AI Tagline', createdAt: 'Apr 8, 2023, 2:30pm', status: 'Completed' },
  { id: 4, title: 'Nike Campaign 2025', template: 'Content Strategy', createdAt: 'Mar 15, 2023, 1:15pm', status: 'Active' },
  { id: 5, title: 'Starbucks Seasonal', template: 'Product Descriptions', createdAt: 'Mar 12, 2023, 11:45am', status: 'Completed' },
];

const ProjectList: React.FC<ProjectListProps> = ({ activeFilter }) => {
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.status === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-50 text-blue-500';
      case 'Draft': return 'bg-amber-50 text-amber-500';
      case 'Completed': return 'bg-emerald-50 text-emerald-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-50">
        <div className="flex gap-4">
          <button className="p-2 text-slate-400 hover:text-mapkats-pink transition-colors"><LayoutGridIcon className="w-5 h-5"/></button>
          <button className="p-2 text-mapkats-pink bg-pink-50 rounded-lg transition-colors"><ListIcon className="w-5 h-5"/></button>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-mapkats-navy transition-colors">
          Last Modified <ChevronDownIcon className="w-4 h-4"/>
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Template</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="group hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-mapkats-navy group-hover:text-mapkats-pink transition-colors">
                    {project.title}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-500">{project.template}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-500">{project.createdAt}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
                    <MoreHorizontalIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center text-slate-400 italic">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default ProjectList;