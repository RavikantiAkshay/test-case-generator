import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowUpTray,
  HiOutlineLink,
  HiOutlineFolder,
  HiOutlineTrash,
} from 'react-icons/hi2';
import useProjectStore from '../store/projectStore';
import { uploadZipAPI, importGithubAPI } from '../api/repositoryApi';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import toast from 'react-hot-toast';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeProject, fetchProject, deleteProject, isLoading } = useProjectStore();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [githubUrl, setGithubUrl] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchProject(id).catch(() => {
      toast.error('Project not found');
      navigate('/dashboard');
    });
  }, [id, fetchProject, navigate]);

  const handleZipUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.zip')) {
      toast.error('Only .zip files are allowed');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    try {
      await uploadZipAPI(id, file, (progress) => setUploadProgress(progress));
      await fetchProject(id);
      toast.success('Repository uploaded');
      setShowUploadModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleGithubImport = async (e) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;
    setImporting(true);
    try {
      await importGithubAPI(id, githubUrl);
      await fetchProject(id);
      toast.success('Repository imported');
      setShowGithubModal(false);
      setGithubUrl('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading && !activeProject) {
    return (
      <div className="animate-in" style={{ maxWidth: '700px' }}>
        <Skeleton width="30%" height="1.2rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="50%" height="0.85rem" style={{ marginBottom: '2rem' }} />
        <Skeleton width="100%" height="120px" />
      </div>
    );
  }

  if (!activeProject) return null;

  const hasRepo = activeProject.sourceType !== 'none' && activeProject.repositoryPath;

  return (
    <div className="animate-in">
      {/* Breadcrumb */}
      <Link to="/dashboard" style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '0.82rem', color: 'var(--color-text-muted)',
        marginBottom: '1.25rem', transition: 'color var(--transition)',
      }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
      >
        <HiOutlineArrowLeft size={14} />
        Projects
      </Link>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '2rem',
      }}>
        <div>
          <h1 style={{
            fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '4px',
          }}>
            {activeProject.projectName}
          </h1>
          {activeProject.description && (
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              {activeProject.description}
            </p>
          )}
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <HiOutlineTrash size={14} />
          Delete
        </Button>
      </div>

      {/* Repository Section */}
      <div style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.88rem',
          fontWeight: 600,
        }}>
          Repository
        </div>

        {hasRepo ? (
          <div style={{ padding: '1.25rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.85rem',
            }}>
              <HiOutlineFolder size={16} style={{ color: 'var(--color-text-muted)' }} />
              <span>Source: <strong>{activeProject.sourceType === 'github' ? 'GitHub' : 'ZIP upload'}</strong></span>
            </div>
            {activeProject.repositoryUrl && (
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                {activeProject.repositoryUrl}
              </p>
            )}
            <p style={{
              fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.5rem',
              padding: '6px 10px', background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-sm)', display: 'inline-block',
            }}>
              Status: {activeProject.status}
            </p>
          </div>
        ) : (
          <div style={{
            padding: '2rem 1.25rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.75rem', textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              No repository attached. Upload a ZIP or import from GitHub.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setShowUploadModal(true)}>
                <HiOutlineArrowUpTray size={15} />
                Upload ZIP
              </Button>
              <Button variant="secondary" onClick={() => setShowGithubModal(true)}>
                <HiOutlineLink size={15} />
                Import GitHub
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload repository">
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          Upload a .zip file of your project (max 50 MB).
        </p>
        <label
          htmlFor="zip-upload"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'border-color var(--transition)',
            fontSize: '0.85rem', color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={(e) => { if (!uploading) e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          {uploading ? (
            <span>Uploading… {uploadProgress}%</span>
          ) : (
            <>
              <HiOutlineArrowUpTray size={20} style={{ marginBottom: '0.35rem', color: 'var(--color-text-muted)' }} />
              <span>Click to select a .zip file</span>
            </>
          )}
          <input
            id="zip-upload"
            type="file"
            accept=".zip"
            onChange={handleZipUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </Modal>

      {/* GitHub Modal */}
      <Modal isOpen={showGithubModal} onClose={() => setShowGithubModal(false)} title="Import from GitHub">
        <form onSubmit={handleGithubImport}>
          <Input
            id="github-url"
            label="Repository URL"
            placeholder="https://github.com/user/repo"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setShowGithubModal(false)}>Cancel</Button>
            <Button type="submit" disabled={importing}>
              {importing ? 'Importing…' : 'Import'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectPage;
