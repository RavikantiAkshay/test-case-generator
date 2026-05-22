import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi2';
import useProjectStore from '../store/projectStore';
import ProjectCard from '../components/dashboard/ProjectCard';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { projects, isLoading, fetchProjects, createProject, deleteProject } = useProjectStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ projectName: '', description: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.projectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    setCreating(true);
    try {
      const project = await createProject(formData);
      toast.success('Project created');
      setShowModal(false);
      setFormData({ projectName: '', description: '' });
      navigate(`/projects/${project._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <div>
          <h1 style={{
            fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '2px',
          }}>
            Projects
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <HiOutlinePlus size={16} />
          New project
        </Button>
      </div>

      {/* Loading */}
      {isLoading && projects.length === 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              padding: '1.25rem', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <Skeleton width="60%" height="0.9rem" />
              <Skeleton width="90%" height="0.75rem" />
              <Skeleton width="40%" height="0.65rem" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects.length === 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '4rem 2rem',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem' }}>
            No projects yet
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', marginBottom: '1rem' }}>
            Create your first project to start generating test cases.
          </p>
          <Button onClick={() => setShowModal(true)}>
            <HiOutlinePlus size={16} />
            New project
          </Button>
        </div>
      )}

      {/* Project Grid */}
      {projects.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => navigate(`/projects/${project._id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New project">
        <form onSubmit={handleCreate}>
          <Input
            id="project-name"
            label="Project name"
            placeholder="My API tests"
            value={formData.projectName}
            onChange={(e) => setFormData((f) => ({ ...f, projectName: e.target.value }))}
            required
          />
          <Input
            id="project-description"
            label="Description"
            placeholder="Optional description"
            value={formData.description}
            onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" disabled={creating}>
              {creating ? 'Creating…' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
